// backend/scripts/initDatabase.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const init = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany(); // clear for dev
  console.log('✅ DB ready');
  process.exit(0);
};

init();