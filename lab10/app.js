// Setup server, session and middleware here.

/*
You will have the following middleware functions:

This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following:
This middleware will log to your console for every request made to the server, with the following information:
Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Route: req.originalUrl
Some string/boolean stating if a user is authenticated
If logged in, the users status (administrator or user)
    There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

     An example would be:

    [Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated)

     [Sun, 14 Apr 2019 23:56:14 GMT]: POST /signin (Non-Authenticated)

     [Sun, 14 Apr 2019 23:56:19 GMT]: GET /userProfile (Authenticated Administrator User)

     [Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)

2. After you log the request info in step A,  if the request path is the root "/" and the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /administrator route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will redirect them to the GET /signinuser route. If the path is not the root, then call next.

3. This middleware will only be used for the GET /signinuser route and will do one of the following:    
     A. If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /administrator route,
     B. If the user is authenticated AND they have a role of user, you will redirect them to the /user route.
     C. If the user is NOT authenticated, you will allow them to get through to the GET /signinuser route. A logged in user should never be able to access the sign in form.

4. This middleware will only be used for the GET /signupuser route and will do one of the following:
     A. If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /administrator route,
     B. If the user is authenticated AND they have a role of user, you will redirect them to the /user route.
     C. If the user is NOT authenticated, you will allow them to get through to the GET /signupuser route. A logged in user should never be able to access the registration form.

5. This middleware will only be used for the GET /user route and will do one of the following:
     A. If a user is not logged in, you will redirect to the GET /signinuser route.
     B. If the user is logged in, the middleware will "fall through" to the next route calling the next() callback. (Users with both roles administrator or user should be able to access the /user route, so you simply need to make sure they are authenticated in this middleware.)

6. This middleware will only be used for the GET /administrator route and will do one of the following: 
    A. If a user is not logged in, you will redirect to the GET /signinuser route.
    B. If a user is logged in, but they are not an administrator user, you end the response right in the middleware function and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403. (provide a link to the /user page, since they are logged in, just not an admin)
   C. If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
 ONLY USERS WITH A ROLE of administratorSHOULD BE ABLE TO ACCESS THE /administrator ROUTE!

7. This middleware will only be used for the GET /signoutuser route and will do one of the following:   
     A. If a user is not logged in, you will redirect to the GET /signinuser route.
     B. If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

*/

import express from "express";
import session from "express-session";
import path from "path";
import exphbs from "express-handlebars";
import { fileURLToPath } from "url";
import router from "./routes/auth_routes.js";
import * as middleware from "./middleware.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  session({
    name: "AuthenticationState",
    secret: "paradimethylaminobenzaldehyde",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

router.use((req, res) => {
  res.status(404).render("error", {
    error: "The page you are looking for does not exist.",
  });
});


app.use("/", (req, res, next) => {
  let timestamp = new Date().toUTCString();
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
});

app.use("/", (req, res, next) => {
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
});

app.use("/signinuser", (req, res, next) => {
  if (req.session?.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/administrator");
    } else {
      return res.redirect("/user");
    }
  }
  next();
});

app.use("/signupuser", (req, res, next) => {
  if (req.session?.user) {
    if (req.session.user.role === "admin") {
      return res.redirect("/administrator");
    } else {
      return res.redirect("/user");
    }
  }
  next();
});

app.use("/user", (req, res, next) => {
  if (req.session?.user) {
    next();
  } else {
    res.redirect("/signinuser");
  }
});

app.use("/administrator", (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect("/signinuser");
  }
  if (req.session.user.role !== "admin") {
    return res.status(403).render("error", {
      title: "Error",
      error: "You do not have permission to access this page.",
    });
  }
  next();
});

app.use("/signoutuser", (req, res, next) => {
  if (!req.session || !req.session.user) {
    res.redirect("/signinuser");
  }
  if (req.session?.user) {
    req.session.destroy((err)=>
    {
      if(err)
      {
        return res.status(500).send("Could not log out. Please try again.");
      }
      res.render("signoutuser", {title: "Sign Out", themePreference: { backgroundColor: "#ffffff", fontColor: "#000000" } });
      res.clearCookie("AuthenticationState");
    })
  } else {
    res.redirect("/signinuser");
    next();
  }
});

app.use('/', router);

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Error",
    error: "The page you are looking for does not exist.",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
