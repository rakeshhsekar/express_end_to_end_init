const Trade = require('../models/trades');



function isValidTrade(trade) {
  if (!trade || typeof trade !== 'object') {
    return false;
  }

  // Validate shares and type properties
  const { shares, type } = trade;
  if (
    typeof shares !== 'number' ||
    shares < 1 ||
    shares > 100 ||
    (type !== 'buy' && type !== 'sell')
  ) {
    return false;
  }

  return true;
}

exports.listTrades = async (req, res) => {
  try {
    const query = {};

    if (req.query.type) {
      query.type = req.query.type;
    }
    if (req.query.user_id) {
      query.user_id = req.query.user_id;
    }

    const trades = await Trade.find(query).sort({ id: 1 });

    res.status(200).json(trades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTradesById = async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    res.status(200).json(trade);
  }
  catch (error) {
    console.error(error);
    res.status(404).json({ message: 'ID not found' });
  }
};

exports.createTrade = async (req, res) => {
  try {
    let lastRecord = await Trade.findOne({}).sort({ id: -1 });
    const nextId = lastRecord ? lastRecord.id + 1 : 1;

    // Create the new trade record
    if (isValidTrade(req.body)) {
      const newTrade = new Trade({
        ...req.body,
        "id": nextId
      });

      const saveTrade = await newTrade.save();
      res.status(201).json(saveTrade);
    }
    else
    {
      res.status(400).json()
    }
  }
  catch (error) {
    res.status(400).json()
  }
};
