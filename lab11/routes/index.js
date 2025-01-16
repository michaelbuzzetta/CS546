//Here you will require route files and export the constructor method as shown in lecture code and worked in previous labs.

import routes from "./routesApi.js"

const configRoutesFunction = (app) => {
    app.use('/', routes);
  
    app.use('*', (req, res) => {
      return res.redirect("/");
    });
  };
  
  export default configRoutesFunction;