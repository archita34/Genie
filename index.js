const express = require('express');
     const { sequelize, User, ShoppingList, Inventory } = require('./models');
     require('dotenv').config();

     const app = express();
     app.use(express.json());

     // Handle unhandled promise rejections
     process.on('unhandledRejection', (reason, promise) => {
       console.error('Unhandled Rejection at:', promise, 'reason:', reason);
       process.exit(1);
     });

     async function startServer() {
       try {
         // Test database connection
         await sequelize.authenticate();
         console.log('Database connected successfully');

         // Sync models
         await sequelize.sync({ force: true });
         console.log('Database tables synced successfully');

         // Health check endpoint
         app.get('/health', (req, res) => res.json({ status: 'Server running' }));

         // User registration
         app.post('/users', async (req, res) => {
           const { email } = req.body;
           try {
             const user = await User.create({ email });
             res.json({ message: 'User created', user });
           } catch (err) {
             res.status(400).json({ error: err.message });
           }
         });

         // Add item to shopping list
         app.post('/list', async (req, res) => {
           const { userId, item } = req.body;
           try {
             let list = await ShoppingList.findOne({ where: { userId } });
             if (list) {
               list.items.push(item);
               await list.save();
             } else {
               list = await ShoppingList.create({ userId, items: [item] });
             }
             res.json({ message: 'Item added', items: list.items });
           } catch (err) {
             res.status(400).json({ error: err.message });
           }
         });

         // Check inventory
         app.get('/inventory/:item', async (req, res) => {
           const { item } = req.params;
           try {
             let inventory = await Inventory.findOne({ where: { item } });
             if (!inventory) {
               inventory = await Inventory.create({ item, stock: 10 });
             }
             res.json({ item, stock: inventory.stock });
           } catch (err) {
             res.status(400).json({ error: err.message });
           }
         });

         const PORT = process.env.PORT || 3000;
         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
       } catch (err) {
         console.error('Failed to start server:', err);
         process.exit(1);
       }
     }

     startServer();