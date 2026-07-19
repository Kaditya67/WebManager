require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const existing = await User.findOne({ email: 'admin@admin.com' });
  if (!existing) {
    const admin = new User({
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    });
    await admin.save();
    console.log("Admin user created!");
  } else {
    console.log("Admin user already exists.");
  }
  process.exit(0);
}

seed();
