require('dotenv').config();
const mongoose = require('mongoose');

async function wipe() {
  await mongoose.connect(process.env.MONGODB_URI);
  await mongoose.connection.db.dropDatabase();
  console.log("Database wiped!");
  process.exit(0);
}

wipe();
