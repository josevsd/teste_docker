const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const cors = require('cors')();
const path = require('path');
const router = require("./Routes/Routes");
const app = express();
app.use(express.json())
app.use(cors);
app.use('/', express.static(path.resolve(__dirname,"public"))); // acesso a pasta public
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile)); // rota para swagger;
app.use(router);
app.use((req,res,next)=>{
    res.header("Access-Controll-Allow-Origin","*");
    res.header("Access-Controll-Allow-Headers","Origin, X-requested-With, Content-Type, Accept");
    res.setHeader("Access-Controll-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
   
});
app.use(bodyParser.urlencoded({extended:false}));
app.listen(3500,()=>{
    console.log("Servidor em operação")
})

module.exports = router;