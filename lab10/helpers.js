//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
/*
CAs that helped:
Gautum Ahuja
*/

export const signUpVerify = (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
  if (
    !firstName ||
    typeof firstName !== "string" ||
    firstName.trim().length < 2 ||
    firstName.trim().length > 25 ||
    /\d/.test(firstName)
  ) {
    throw "Error first name must be a valid string with 2-25 characters and should not contain numbers.";
  }

  if (
    !lastName ||
    typeof lastName !== "string" ||
    lastName.trim().length < 2 ||
    lastName.trim().length > 25 ||
    /\d/.test(lastName)
  ) {
    throw "Error last name must be a valid string with 2-25 characters and should not contain numbers.";
  }

  if (
    !userId ||
    typeof userId !== "string" ||
    userId.trim().length < 5 ||
    userId.trim().length > 10 ||
    /\d/.test(userId)
  ) {
    throw "Error userID must be a valid string with 5-10 characters and should not contain numbers.";
  }

  if (
    !password ||
    typeof password !== "string" ||
    password.trim().length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password) ||
    /\s/.test(password)
  ) {
    throw "Error password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character, and must not contain spaces.";
  }

  if (
    !favoriteQuote ||
    typeof favoriteQuote !== "string" ||
    favoriteQuote.trim().length < 20 ||
    favoriteQuote.trim().length > 255
  ) {
    throw "Error favorite quote must be a valid string with 20-255 characters.";
  }

  if (
    !themePreference ||
    typeof themePreference !== "object" ||
    Object.keys(themePreference).length !== 2 ||
    !themePreference.backgroundColor ||
    !themePreference.fontColor ||
    !/^#[0-9A-Fa-f]{6}$/.test(themePreference.backgroundColor) ||
    !/^#[0-9A-Fa-f]{6}$/.test(themePreference.fontColor)
  ) {
    throw "Error, theme preference must be an object containing valid hex color codes for backgroundColor and fontColor.";
  }

  if (
    themePreference.backgroundColor.toLowerCase() ===
    themePreference.fontColor.toLowerCase()
  ) {
    throw "Error, background color and font color cannot be the same.";
  }

  if (
    !role ||
    (role.toLowerCase() !== "admin" && role.toLowerCase() !== "user")
  ) {
    throw "ErrorRole must be either 'admin' or 'user'.";
  }
};

export const signInVerify=(userId, password) =>
{
  if (
    !userId ||
    typeof userId !== "string" ||
    userId.trim().length < 5 ||
    userId.trim().length > 10 ||
    /\d/.test(userId)
  ) {
    throw "Error, user ID must be a valid string with 5-10 characters and should not contain numbers.";
  }

  if (
    !password ||
    typeof password !== "string" ||
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(password) ||
    /\s/.test(password)
  ) {
   throw "Error, password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character, and must not contain spaces.";
  }
}