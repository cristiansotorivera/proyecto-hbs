import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'

import { services } from "./data/services.data.js"

const app = express()

// ruta absoluta
const __dirname = import.meta.dirname

// middleware
app.use(express.static('public'))
app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');



app.get('/about', (req, res) => {
    res.render('about')
})


app.get('/services', (req, res) => {
    res.render('services', { services });
  });

app.get('/services/:service', (req, res) => {
    const { service } = req.params;
    const selectedService = services.find(s => s.url === `/services/${service}`);
    if (selectedService) {
      res.render('service', { service: selectedService });
    } else {
      return res.status(404).render('404');
    }
  });
  




// Error Handling Middleware for 404
// Route to handle undefined routes
/* app.get('*', (req, res) => {
    res.send('<h2>Sorry, page not found, 💀 error 404 💀</h2>');
}); */

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})