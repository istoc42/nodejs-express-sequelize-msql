module.exports = {
  // Parameters for MySQL connection
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '123456',
  DB: 'testdb',
  dialect: 'mysql',

  // Sequelize connection configuration
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
