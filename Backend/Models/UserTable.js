const dbConn = require('../Config/dbConfig')
const Sequelize = require('sequelize');
const sequelize = require('sequelize');

const Table = dbConn.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf:{
    type:Sequelize.CHAR(14),
    allowNull:false,
    unique:true
  },
  image: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique:true
  },
  office: {
    type: Sequelize.ENUM("admin", "docente"),
    allowNull: false,
  }
});
module.exports = Table;
