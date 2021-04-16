import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../config/db';

const Gig = db.define('gig', {
  title: {
    type: DataTypes.STRING,
  },
  technologies: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  budget: {
    type: DataTypes.STRING
  },
  contact_email: {
    type: DataTypes.STRING
  }
});

db.sync({ force: false, logging: console.log }).then(() => {
  // Gig.create({
  //   title : "dasdasd",
  //   technologies: "Node, PHP",
  //   description: "sdada",
  //   budget: "5464",
  //   contact_email: "Abc@gmail.com",
  // }).then(()=>{
  //   console.log("Data successfully inserted");
  // }).catch((err)=> console.log(err));
  console.log('Sync Successful');
  
});

export { Gig };