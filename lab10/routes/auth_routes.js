//import express, express router as shown in lecture code
import * as helper from "../helpers.js";
import express from "express";
import { signUpUser, signInUser } from "../data/users.js";
import { Router } from "express";
import { users } from "../config/mongoCollections.js";
let router = Router();

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/signupuser")
  .get(async (req, res) => {
    //code here for GET
    res.render("signupuser", {
      title: "Sign Up",
      error: null,
      themePreference: { backgroundColor: "#ffffff", fontColor: "#000000" },
    });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let {
        firstName,
        lastName,
        userId,
        password,
        confirmPassword,
        favoriteQuote,
        backgroundColor,
        fontColor,
        role,
      } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).render("signupuser", {
          title: "Sign Up",
          error: "Passwords do not match.",
        });
      }

      let themePreference = { backgroundColor, fontColor };

      let result = await signUpUser(
        firstName,
        lastName,
        userId,
        password,
        favoriteQuote,
        themePreference,
        role
      );

      if (result.registrationCompleted) {
        return res.redirect("/signinuser");
      }

      return res.status(500).render("signupuser", {
        title: "Sign up",
        error: "Internal server error. Please try again later.",
      });
    } catch (error) {
      res
        .status(400)
        .render("signupuser", { title: "User sign Up", error: error.message });
    }
  });

router
  .route("/signinuser")
  .get(async (req, res) => {
    //code here for GET
    res.render("signinuser", {
      title: "Sign in",
      themePreference: { backgroundColor: "#ffffff", fontColor: "#000000" },
    });
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      let { userId, password } = req.body;
      let user = await signInUser(userId, password);

      req.session.user = user;
      if (user.role === "admin") {
        return res.redirect("/administrator");
      } else {
        return res.redirect("/user");
      }
    } catch (error) {
      res
        .status(400)
        .render("signinuser", { title: "User sign In", error: error.message });
    }
  });

router.route("/user").get(async (req, res) => {
  //code here for GET
  try {
    let userCollection = await users();
    let user = await userCollection.findOne({
      userId: req.session.user.userId,
    });

    if (!user) {
      throw new Error("User not found");
    }

    let { themePreference } = user;

    let now = new Date();
    let currentTime = now.toLocaleTimeString();
    let currentDate = now.toLocaleDateString();

    res.render("user", {
      title: "User Dashboard",
      user: req.session.user,
      themePreference,
      currentTime,
      currentDate,
      isAdmin: req.session.user.role === "admin",
    });
  } catch (e) {
    res.status(500).render("error", { error: "Unable to retrieve user data." });
  }
});

router.route("/administrator").get(async (req, res) => {
  //code here for GET
  if (!req.session || !req.session.user) {
    res.redirect("/signinuser");
  }
  try {
    if (req.session.user.role !== "admin") {
      return res.status(403).render("error", {
        title: "Forbidden",
        error: "You do not have permission to access this page.",
      });
    }

    let userCollection = await users();
    let user = await userCollection.findOne({
      userId: req.session.user.userId,
    });

    if (!user) {
      throw new Error("User not found.");
    }

    let { themePreference } = user;

    let now = new Date();
    let currentTime = now.toLocaleTimeString();
    let currentDate = now.toLocaleDateString();

    res.render("administrator", {
      title: "Administrator Dashboard",
      user: req.session.user,
      themePreference,
      currentTime,
      currentDate,
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Error",
      error: "Unable to retrieve admin data.",
    });
  }
});

router.route("/signoutuser").get(async (req, res) => {
  if (!req.session || !req.session.user) {
    res.redirect("/signinuser");
  }
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render("error", {
          title: "Error",
          error: "Unable to log out. Please try again.",
        });
      }

      res.clearCookie("AuthenticationState");

      return res.redirect("/signoutuser");
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Error",
      error: "An unexpected error occurred during signout.",
    });
  }
});

export default router;
