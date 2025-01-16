//Here is where you'll set up your server as shown in lecture code

/*
CAs that helped
Jack Gibson
Bernard Vitale
Jesal Gandhi
Gautam Ahuja
*/

import express from 'express';
const app = express();
import configRoutesFunction from './routes/index.js';
import exphbs from 'express-handlebars';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
configRoutesFunction(app);


app.listen(3000, () => 
{
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
