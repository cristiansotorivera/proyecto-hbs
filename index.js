import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path';

import { services } from "./data/services.data.js";

const app = express();

// ruta absoluta
const __dirname = import.meta.dirname;
console.log(__dirname)

// middleware
app.use(express.static('public'));
app.use('/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('home')
})


app.get('/services', (req, res) => {
    res.render('services', { services });
  });

app.get('/services/:service', (req, res) => {   //el :service lo leo de manera dinamica
    const { service } = req.params;              // con el { service }

    const selectedService = services.find(s => s.url === `/services/${service}`);
    if (selectedService) {
      res.render('service', { service: selectedService });
    } else {
      return res.status(404).render('404'), { title: "Service Not Found"};
    }
  });
  

// Error Handling Middleware for 404

app.use("*",(req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
  });



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})