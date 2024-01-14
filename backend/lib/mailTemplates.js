export const passwordResetMailTemplate = ({ name, resetLink }) => `
Hi ${name || ""},
Bitte klicke <a href="${
  resetLink || process.env.RENDER_EXTERNAL_URL
}">here</a>, um dein Passwort zu ändern .
`;
export const mailToHrTemplate = ({ user, date, startTime, endTime }) => `
Hi,
der jeweilige Mitarbeiter ${user} hat folgende Zeiten übermittelt:
Datum:${date}.
Gestempelt von ${startTime} bis ${endTime}
`;
