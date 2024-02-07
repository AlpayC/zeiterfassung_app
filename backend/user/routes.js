import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";
import { createResetToken, validateResetToken } from "./ResetTokenModel.js";

export const userRouter = Router();

const multerMiddleware = multer();

const hoursInMillisec = (hours) => {
  return 1000 * 60 * 60 * hours;
};

userRouter.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

userRouter.post("/resetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    console.log("reset passwort für ", email);
    await createResetToken(email);
    return res.sendStatus(200);
  } catch (e) {
    if (e?.message === "Kein User mit dieser Email vorhanden") {
      return res.status(404).send({ error: "User nicht gefunden" });
    }

    return res.status(500).send({ error: "Unknown Error occurred" });
  }
});

userRouter.post("/resetPassword-confirm", async (req, res) => {
  const { id, token, password } = req.body;
  const isValidResetProcess = validateResetToken(id, token);
  try {
    if (!isValidResetProcess) {
      throw new Error("NonValidResetProcess");
    }

    const user = await User.findById(id);
    user.setPassword(password);

    await user.save();
    return res.send({
      data: { message: "Neues Passwort bestätigt" },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong" });
  }
});

userRouter.post("/signup", multerMiddleware.none(), async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(404).send({
      message: "Registrierung fehlgeschlagen",
      error: {
        message: "Bitte fülle das Formular aus",
      },
    });
  }
  const newUser = new User({ name, email });
  newUser.setPassword(req.body.password);
  try {
    await newUser.save();
    return res.send({
      message: "Registrierung erfolgreich",
      user: { name, email },
      success: { message: "Du wirst nun weitergeleitet" },
    });
  } catch (e) {
    console.log(e);
    if (e.name === "ValidationError") {
      // return res.status(400).send({ error: e });
      return res.status(404).send({
        message: "Registrierung fehlgeschlagen",
        error: e.errors.email,
      });
    }

    if (e.name === "MongoServerError" && e.code === 11000) {
      console.log("Account existiert bereits");
      return res.status(400).send({
        message: "Registrierung fehlgeschlagen",
        error: { message: "Ein Account mit diesen Daten existiert bereits!" },
      });
    }

    return res.status(500).send({ error: { message: "Unknown Server error" } });
  }
});

userRouter.post("/login", multerMiddleware.none(), async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  if (!email || !password) {
    return res.status(404).send({
      message: "Login fehlgeschlagen",
      error: {
        message: "Keine Benutzerdaten eingegeben",
      },
    });
  }
  try {
    const user = await User.findOne({ email }).select("+hash").select("+salt");

    if (user) {
      const passwordIsValid = user.verifyPassword(password);

      if (passwordIsValid) {
        const token = generateAccessToken({ email });
        console.log(token);

        res.cookie("auth", token, {
          httpOnly: true,
          maxAge: hoursInMillisec(4),
        });

        return res.send({
          message: "Login erfolgreich",
          data: user,
          success: { message: "Du wirst nun weitergeleitet" },
        });
      } else {
        return res.status(404).send({
          message: "Login fehlgeschlagen",
          error: {
            message: "Username und Passwort Kombination ist falsch.",
          },
        });
      }
    } else {
      return res.status(404).send({
        message: "Login fehlgeschlagen",
        error: {
          message: "Benutzer nicht gefunden.",
        },
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: {
        message: "Es ist ein Fehler aufgetreten.",
      },
    });
  }
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  return res.send({
    message: "Logout erfolgreich",
    success: { message: "Bis zum nächsten Mal" },
  });
});

userRouter.get("/secure", authenticateToken, async (req, res) => {
  console.log(req.userEmail);
  res.send({ email: req.userEmail });
});
