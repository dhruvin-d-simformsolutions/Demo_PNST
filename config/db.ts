// db
import { Sequelize } from "sequelize";

export const db: Sequelize = new Sequelize("postgres://postgres:Simform@123@localhost:5432/sedb", {
    host: "localhost",
    dialect: "postgres",    
    pool : {
        max :5,
        min : 0,
        acquire : 30000,
        idle : 10000,
    },
    define : {
        freezeTableName : true
    }
});