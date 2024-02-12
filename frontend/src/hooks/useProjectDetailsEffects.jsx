import { useEffect, useContext } from "react";
import { AlertContext } from "../context/AlertContext";
export function useProjectDetailsEffects(
  projectTitle,
  projectDescription,
  tags,
  startDate,
  endDate,
  projectDescriptionInput,
  uploadPictureInput,
  setProjectTitle,
  setProjectDescription,
  setShowProjectDescriptionInput,
  setStartDate,
  setEndDate,
  setTags
) {
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    if (projectDescription === "") {
      setShowProjectDescriptionInput(false);
    }
  }, [projectDescription]);

  // useEffect(() => {
  //   tags.forEach((tag) => {
  //     if (projectTitle.includes(`#${tag}`)) {
  //       setProjectTitle((prevTitle) => prevTitle.replace(`#${tag} `, ""));
  //     }
  //   });

  //   if (projectTitle.includes("//")) {
  //     setShowProjectDescriptionInput(true);
  //     if (projectDescriptionInput.current) {
  //       projectDescriptionInput.current.focus();
  //     }
  //     setProjectTitle(projectTitle.replace(`//`, ""));
  //   }
  //   if (projectTitle.includes(`/start ${startDate}`)) {
  //     setProjectTitle(projectTitle.replace(`/start ${startDate}`, ""));
  //   }
  //   if (projectTitle.includes(`/end ${endDate}`)) {
  //     setProjectTitle(projectTitle.replace(`/end ${endDate}`, ""));
  //   }
  //   if (projectTitle.includes(`/end `)) {
  //     const startIndex = projectTitle.indexOf("/end ");
  //     const spaceIndex = projectTitle.indexOf(" ", startIndex + 5);
  //     if (spaceIndex !== -1) {
  //       const dateStr = projectTitle
  //         .substring(startIndex + 5, spaceIndex)
  //         .trim();

  //       setEndDate(dateStr);

  //       setProjectTitle(
  //         projectTitle.substring(0, startIndex).trim() +
  //           projectTitle.substring(spaceIndex).trim()
  //       );
  //     }
  //   }

  //   if (projectTitle.includes(`/start `)) {
  //     const startIndex = projectTitle.indexOf("/start ");
  //     const spaceIndex = projectTitle.indexOf(" ", startIndex + 7);
  //     if (spaceIndex !== -1) {
  //       const dateStr = projectTitle
  //         .substring(startIndex + 7, spaceIndex)
  //         .trim();
  //       if (dateStr && dateStr.length === 10) {
  //         const parts = dateStr.split(".");
  //         if (parts.length === 3 && parts.every((part) => !isNaN(part))) {
  //           console.log("Datum formatiert");
  //           setStartDate(dateStr);
  //         } else {
  //           setStartDate(null);
  //           console.log("Ungültiges Datumsformat");
  //         }
  //       } else {
  //         setStartDate(null);
  //         console.log("Falsche Länge");
  //       }

  //       setProjectTitle(
  //         projectTitle.substring(0, startIndex).trim() +
  //           projectTitle.substring(spaceIndex).trim()
  //       );
  //     }
  //   }
  //   if (projectTitle.includes(`/bild`)) {
  //     if (uploadPictureInput.current) {
  //       uploadPictureInput.current.click();
  //     }
  //     setProjectTitle(projectTitle.replace(`/bild`, ""));
  //   }
  // }, [
  //   projectTitle,
  //   tags,
  //   startDate,
  //   endDate,
  //   projectDescriptionInput,
  //   uploadPictureInput,
  //   setProjectTitle,
  //   setStartDate,
  //   setEndDate,
  //   setShowProjectDescriptionInput,
  // ]);

  useEffect(() => {
    tags.forEach((tag) => {
      if (projectTitle.includes(`#${tag}`)) {
        setProjectTitle((prevTitle) => prevTitle.replace(`#${tag} `, ""));
      }
    });
  }, [projectTitle, tags, setProjectTitle]);

  useEffect(() => {
    if (projectTitle.includes("//")) {
      setShowProjectDescriptionInput(true);
      if (projectDescriptionInput.current) {
        projectDescriptionInput.current.focus();
      }
      setProjectTitle(projectTitle.replace(`//`, ""));
    }
  }, [projectTitle, setShowProjectDescriptionInput, projectDescriptionInput]);

  useEffect(() => {
    if (projectTitle.includes(`/end ${endDate}`)) {
      setProjectTitle(projectTitle.replace(`/end ${endDate}`, ""));
    }
    if (projectTitle.includes(`/end `)) {
      const startIndex = projectTitle.indexOf("/end ");
      const spaceIndex = projectTitle.indexOf(" ", startIndex + 5);
      if (spaceIndex !== -1) {
        const dateStr = projectTitle
          .substring(startIndex + 5, spaceIndex)
          .trim();

        if (dateStr && dateStr.length === 10) {
          const parts = dateStr.split(".");
          if (parts.length === 3 && parts.every((part) => !isNaN(part))) {
            console.log("Datum formatiert");
            setEndDate(dateStr);
            showAlert(
              `Enddatum gespeichert`,
              `Dein Projekt endet am ${dateStr}`,
              "alert-success",
              3000
            );
          } else {
            setEndDate(null);
            console.log("Ungültiges Datumsformat");
            showAlert(
              `Enddatum fehlerhaft`,
              `Bitte gebe ein gültiges Datum ein`,
              "alert-error",
              3000
            );
          }
        } else {
          setEndDate(null);
          showAlert(
            `Enddatum fehlerhaft`,
            `Bitte gebe ein gültiges Datum ein`,
            "alert-error",
            3000
          );

          console.log("Falsche Länge");
        }

        setProjectTitle(
          projectTitle.substring(0, startIndex).trim() +
            projectTitle.substring(spaceIndex).trim()
        );
      }
    }
  }, [projectTitle, endDate, setEndDate, setProjectTitle]);

  useEffect(() => {
    if (projectTitle.includes(`/start ${startDate}`)) {
      setProjectTitle(projectTitle.replace(`/start ${startDate}`, ""));
    }
    if (projectTitle.includes(`/start `)) {
      const startIndex = projectTitle.indexOf("/start ");
      const spaceIndex = projectTitle.indexOf(" ", startIndex + 7);
      if (spaceIndex !== -1) {
        const dateStr = projectTitle
          .substring(startIndex + 7, spaceIndex)
          .trim();
        if (dateStr && dateStr.length === 10) {
          const parts = dateStr.split(".");
          if (parts.length === 3 && parts.every((part) => !isNaN(part))) {
            console.log("Datum formatiert");
            setStartDate(dateStr);
            showAlert(
              `Startdatum gespeichert`,
              `Dein Projekt startet am ${dateStr}`,
              "alert-success",
              3000
            );
          } else {
            setStartDate(null);
            console.log("Ungültiges Datumsformat");
            showAlert(
              `Startdatum fehlerhaft`,
              `Bitte gebe ein gültiges Datum ein`,
              "alert-error",
              3000
            );
          }
        } else {
          setStartDate(null);
          showAlert(
            `Startdatum fehlerhaft`,
            `Bitte gebe ein gültiges Datum ein`,
            "alert-error",
            3000
          );

          console.log("Falsche Länge");
        }

        setProjectTitle(
          projectTitle.substring(0, startIndex).trim() +
            projectTitle.substring(spaceIndex).trim()
        );
      }
    }
  }, [projectTitle, startDate, setStartDate, setProjectTitle]);

  useEffect(() => {
    if (projectTitle.includes(`/bild`)) {
      if (uploadPictureInput.current) {
        uploadPictureInput.current.click();
      }
      setProjectTitle(projectTitle.replace(`/bild`, ""));
    }
  }, [projectTitle, uploadPictureInput, setProjectTitle]);

  useEffect(() => {
    if (projectTitle.includes("/#")) {
      const tagPart = projectTitle.split("/#")[1].trim();
      if (tagPart) {
        const updatedValue = projectTitle.replace("/#", "#");
        setProjectTitle(updatedValue);
      }
    }
  }, [projectTitle, setProjectTitle]);

  useEffect(() => {
    const words = projectTitle.split(" ");

    const newTags = [];
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.startsWith("#") && i < words.length - 1 && words[i + 1] === "") {
        const tagName = word.substring(1);
        if (!tags.includes(tagName)) {
          newTags.push(tagName);
        }
      }
    }
    if (newTags.length > 0) {
      setTags((prevTags) => [...prevTags, ...newTags]);
      showAlert(
        `Tag:${newTags} hinzugefügt`,
        `Deine Tags ${newTags}`,
        "alert-success",
        3000
      );
    }
  }, [projectTitle, tags, setTags]);
}
