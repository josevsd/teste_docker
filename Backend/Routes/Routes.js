const express = require('express')
const router = express.Router();
const Controller = require('../Controllers/Controller');
const UserController = require('../Controllers/UserController');
const PatrimonyController = require('../Controllers/PatrimonyController');
const RoomDepartmentController = require('../Controllers/RoomDepartmentController');
const upload = require('../middlewares/upload');
const jwtVerifier = require('../middlewares/verifyJWT');
const jwtadminverifier = require("../middlewares/verifyAdminJWT")
const RequestController = require("../Controllers/RequestController")
// Migração:
router.get('/migration', Controller.CreateTable);

// Usuário:
router.get('/users', UserController.read);
router.post('/user/login',UserController.index);
router.put("/user/refresh",UserController.RefreshPassword);
router.post('/user/register', UserController.create);
router.put('/user/update',upload.single('image'), jwtVerifier, UserController.update);
router.put('/user/dep', jwtVerifier, UserController.depUpdate)
router.delete('/user/del', jwtVerifier, UserController.delete);
router.post('/user/email/:Email',UserController.email);

//Solicitações
router.get('/requests', RequestController.read);
router.post('/request/create', RequestController.create);
router.delete('/request/delete', RequestController.delete);



// Patrimônio:
router.get('/:department/patrimony/:room', PatrimonyController.index);
router.post('/insertPatrimony/:id',jwtadminverifier,PatrimonyController.create);
router.get("/patrimony/images/:nPatrimony",PatrimonyController.indexImage)
router.post('/byexcel', upload.fields([
    {name:'excel', maxCount:1},
    {name:'image', maxCount:1}
]), PatrimonyController.createByExcel);
router.put('/updatePatrimony/:patrimony',PatrimonyController.update);
router.delete('/deletePatrimony/:numpatrimony', PatrimonyController.delete);
router.post('/:room/filterPatrimony/:department/:type',PatrimonyController.Filter);

// Salas e Departamentos:
router.get('/room', RoomDepartmentController.indexRoom);
router.get('/department',RoomDepartmentController.indexDepartment);
router.post('/room/insert',RoomDepartmentController.createRoom);
router.post('/department', RoomDepartmentController.createDepartment);
router.put('/room', jwtVerifier, RoomDepartmentController.updateRoom);
router.put('/department', jwtVerifier, RoomDepartmentController.updateDepartment);
router.delete('/room', jwtVerifier, RoomDepartmentController.deleteRoom);
router.delete('/department', jwtVerifier, RoomDepartmentController.deleteDepartment);

module.exports = router;