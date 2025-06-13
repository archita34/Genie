const { Sequelize, DataTypes } = require('sequelize');
     require('dotenv').config();

     const sequelize = new Sequelize(
       process.env.DB_NAME,
       process.env.DB_USER,
       process.env.DB_PASSWORD,
       {
         host: process.env.DB_HOST,
         port: process.env.DB_PORT,
         dialect: 'postgres',
       }
     );

     const db = {};
     db.Sequelize = Sequelize;
     db.sequelize = sequelize;

     // Define models
     db.User = sequelize.define('User', {
       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
       email: { type: DataTypes.STRING, unique: true, allowNull: false },
     });

     db.ShoppingList = sequelize.define('ShoppingList', {
       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
       userId: { type: DataTypes.INTEGER, allowNull: false },
       items: { type: DataTypes.JSON, defaultValue: [] },
     });

     db.Inventory = sequelize.define('Inventory', {
       id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
       item: { type: DataTypes.STRING, unique: true, allowNull: false },
       stock: { type: DataTypes.INTEGER, defaultValue: 0 },
     });

     module.exports = db;