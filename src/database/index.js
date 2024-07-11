const { sequelize } = require('./models');
const logger = require('../../logs/configs');

const dbCon = async () => {
  try {
    await sequelize.authenticate();

    logger.info('DB connected successfully', { showPath: false });
  } catch (error) {
    logger.error(new Error(`db: ${error.message}`));
    throw error;
  }
};

module.exports = { dbCon };
