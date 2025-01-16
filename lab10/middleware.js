/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

export const loggingMidlleware = (req, res, next) => {
  let timestamp = new Date().toString();
  let method = req.method;
  let route = req.originalUrl;
  let authStatus;
  if (req.session?.user) {
    authStatus = `Authenticated (${req.session.user.role})`;
  } else {
    authStatus = "Non-Authenticated";
  }
  console.log(`[${timestamp}]: ${method} ${route} (${authStatus})`);
  next();
};

export const redirect = (req, res, next) => {
  if (req.originalUrl === "/") {
    if (req.session?.user) {
      if (req.session.user.role === "admin") {
        return res.redirect("/administrator");
      } else {
        return res.redirect("/user");
      }
    } else {
      return res.redirect("/signinuser");
    }
  }
  next();
};

export const signIn = (req, res, next) => {
  if (req.session?.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/administrator");
    } else {
      return res.redirect("/user");
    }
  }
  next();
};

export const signUp = (req, res, next) => {
  if (req.session?.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/administrator");
    } else {
      return res.redirect("/user");
    }
  }
  next();
};

export const authenticate = (req, res, next) => {
  if (req.session?.user) {
    next();
  } else {
    res.redirect("/signinuser");
  }
};

export const adminMiddle = (req, res, next) => {
  if (req.session?.user?.role === "admin") {
    next();
  } else if (req.session?.user) {
    res.status(403).render("403", {
      error: "You do not have permission to access this page.",
    });
  } else {
    res.redirect("/signinuser");
  }
};

export const signoutMiddleware = (req, res, next) => {
    if (req.session?.user) {
      next();
    } else {
      res.redirect('/signoutuser');
    }
};