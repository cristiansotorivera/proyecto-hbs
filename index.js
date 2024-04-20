import express from 'express'
import { engine } from 'express-handlebars';
import path from 'path'

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
      res.status(404).render('404');
    }
  });
  

const products = [
    { id: 1, title: "ZTE", img: "https://www.pcfactory.cl/public/foto/50037/1_200.jpg?t=1713542184599" },
    { id: 2, title: "Motorola", img: "https://www.pcfactory.cl/public/foto/48183/1_200.jpg?t=1712348209323" },
    { id: 3, title: "Motorola", img: "https://www.pcfactory.cl/public/foto/44473/1_200.jpg?t=1709222667989" },
    { id: 4, title: "Xiaomi", img: "https://www.pcfactory.cl/public/foto/50697/1_200.jpg?t=1712349941174" },
]

const fruts = ['🍉', '🍓', '🍌']

app.get('/products', (req, res) => {
    res.render('products', { products: products, fruts })
})



// Error Handling Middleware for 404
// Route to handle undefined routes
app.get('*', (req, res) => {
    res.send('<h2>Sorry, page not found, 💀 error 404 💀</h2>');
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`)
})