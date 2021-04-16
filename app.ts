import express from 'express';
import exphbs from 'express-handlebars';
import * as path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
// Database
import {db} from './config/db';

// Test DB
console.log("dsdad");
dotenv.config()

db.authenticate()
  .then(() => {
    console.log("Conection Established ....");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT : Number = parseInt(process.env.PORT as string,10) || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));