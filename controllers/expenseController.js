const Expense = require('../models/expense');

const createExpense = async (req, res) => {
  const { userId } = req; // from auth middleware
  const { categoryId, amount, description, date, receiptUrl } = req.body;

  try {
    const expense = await Expense.create({
      userId,
      categoryId,
      amount,
      description,
      date,
      receiptUrl,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create expense', error: error.message });
  }
};

const getExpenses = async (req, res) => {
  const { userId } = req;

  try {
    const expenses = await Expense.findAll({ where: { userId } });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const { categoryId, amount, description, date, receiptUrl } = req.body;

  try {
    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.update({ categoryId, amount, description, date, receiptUrl });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update expense', error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const expense = await Expense.findOne({ where: { id, userId } });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    await expense.destroy();
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
