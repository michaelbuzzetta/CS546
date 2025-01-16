//Here you will import route files and export them as used in previous labs

/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/

import movieRoutes from "./movies.js";

const constructorMethod = (app) => {
    app.use('/', movieRoutes);
  
    app.use('*', (req, res) => {
      return res.status(404).json({error: 'Not found'});
    });
  };
  
  export default constructorMethod;