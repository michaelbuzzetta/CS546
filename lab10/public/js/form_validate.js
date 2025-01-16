$(document).ready(() => {
  // Login Form Validation
  let $signIn = $("#signin-form");
  if ($signIn.length) {
    $signIn.on("submit", (event) => {
      event.preventDefault();
      let $errorContainer = $(".error");
      $errorContainer.text(""); // Clear previous errors

      let userId = $("#user_id").val().trim();
      let password = $("#password").val();

      let errors = [];

      if (!userId || userId.length < 5 || userId.length > 10 || /\d/.test(userId)) {
        errors.push("User ID must be 5-10 characters long and cannot contain numbers.");
      }

      if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push(
          "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
        );
      }

      if (errors.length > 0) {
        $errorContainer.text(errors.join(" "));
        $errorContainer.show();
      } else {
        $signIn.off("submit").submit();
      }
    });
  }

  let $signUp = $("#signup-form");
  if ($signUp.length) {
    $signUp.on("submit", (event) => {
      event.preventDefault();
      let $errorContainer = $(".error");
      $errorContainer.text("");

      let firstName = $("#firstName").val().trim();
      let lastName = $("#lastName").val().trim();
      let userId = $("#userId").val().trim();
      let password = $("#password").val();
      let confirmPassword = $("#confirmPassword").val();
      let favoriteQuote = $("#favoriteQuote").val().trim();
      let backgroundColor = $("#backgroundColor").val();
      let fontColor = $("#fontColor").val();
      let role = $("#role").val();

      let errors = [];

      if (!firstName || firstName.length < 2 || firstName.length > 25 || /\d/.test(firstName)) {
        errors.push("First name must be 2-25 characters long and cannot contain numbers.");
      }

      if (!lastName || lastName.length < 2 || lastName.length > 25 || /\d/.test(lastName)) {
        errors.push("Last name must be 2-25 characters long and cannot contain numbers.");
      }

      if (!userId || userId.length < 5 || userId.length > 10 || /\d/.test(userId)) {
        errors.push("User ID must be 5-10 characters long and cannot contain numbers.");
      }

      if (!password || password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push(
          "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
        );
      }

      if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
      }

      if (!favoriteQuote || favoriteQuote.length < 20 || favoriteQuote.length > 255) {
        errors.push("Favorite quote must be 20-255 characters long.");
      }

      if (!backgroundColor || !/^#[0-9A-Fa-f]{6}$/.test(backgroundColor)) {
        errors.push("Background color must be a valid hex color.");
      }

      if (!fontColor || !/^#[0-9A-Fa-f]{6}$/.test(fontColor)) {
        errors.push("Font color must be a valid hex color.");
      }

      if (backgroundColor.toLowerCase() === fontColor.toLowerCase()) {
        errors.push("Background and font colors cannot be the same.");
      }

      if (!role || (role !== "admin" && role !== "user")) {
        errors.push("Role must be either 'admin' or 'user'.");
      }

      if (errors.length > 0) {
        $errorContainer.text(errors.join(" "));
        $errorContainer.show();
      } else {
        $signUp.off("submit").submit();
      }
    });
  }
});
