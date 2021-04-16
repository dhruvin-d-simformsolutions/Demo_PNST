import express from 'express';
const router = express.Router();
import { Gig } from '../models/Gig';
import Sequelize from 'sequelize';
import { type } from 'node:os';
const Op = Sequelize.Op;
// Get gig list
router.get('/', (req, res) =>
Gig.findAll()
.then(gigs => {
      res.render('gigs', { Data : gigs })
    })
    .catch(err => res.render('error', { error: err })));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!title) {
    errors.push({ text: 'Please add a title' });
  }
  if (!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if (!description) {
    errors.push({ text: 'Please add a description' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => res.render('error', { error: err.message }))
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', { error: err }));
});

module.exports = router;