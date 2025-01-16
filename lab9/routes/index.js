//Here you will require route files and export them as used in previous labs.
import fibonacciRoutes from "./fibonacci_prime.js"

const constructorMethod = (app) => {
    app.use('/', fibonacciRoutes);
  
    app.use('*', (req, res) => {
      return res.redirect("/");
    });
  };
  
  export default constructorMethod;