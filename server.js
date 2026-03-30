require('dotenv').config();
const sequelize = require('./src/config/db');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

// Test connection and start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // In Sprint 1, we sync models here
    await sequelize.sync({ alter: true });
    console.log('📂 Database models synced.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1);
  }
}

startServer();