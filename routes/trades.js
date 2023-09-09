const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/trades.js');



router.get('/', tradesController.listTrades);
router.get('/:id', tradesController.getTradesById);
router.post('/', tradesController.createTrade);
router.delete('/:id', (req, res) => {res.sendStatus(405)});
router.put('/:id', (req, res) => {res.status(405).json({message: 'you idiot dont try'})});
router.patch('/:id', (req, res) => {res.sendStatus(405)});

module.exports = router;