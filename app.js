

const express = require('express');
const bodyParser = require('express').json;
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const { sequelize } = require('./models'); // Import from models/index.js

const app = express();

app.use(bodyParser());

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/budgets', budgetRoutes);

// Global error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }) // Use force: true to recreate tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Failed syncing database:', err));
