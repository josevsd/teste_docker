const Sequelize = require('sequelize')
const dbConn  = new Sequelize("tcc","root","",{
    dialect:"mysql",
    host:"localhost"
})
module.exports = dbConn