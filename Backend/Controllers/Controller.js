const UserTable = require('../Models/UserTable');
const DepartmentTable = require('../Models/DepTable');
const PatrimonyTable = require('../Models/PatriTable').Table;
const RoomsTable = require('../Models/RoomTable');
const UsersRooms = require('../Models/UsersRooms');
const QrCodeTable = require('../Models/QrCodeTable');
const ImagesPatrimonyTable = require('../Models/ImagesPatrimonyTable');
const UserRequest = require('../Models/UserRequest');

class Controller{
    static async CreateTable(req,res){
        /*
            #swagger.description = "Migração da estrutura do banco de dados do projeto"
        */
        await Controller.DepartmentsRooms();
        await Controller.ResponsiblesTable();
        await Controller.PatrimonyRoom();
        await Controller.PatrimonyQrCode();
        await Controller.PatrimonyImages();
        await DepartmentTable.sync({force:true});
        await UserTable.sync({force:true});
        await RoomsTable.sync({force:true});
        await UsersRooms.sync({force:true});
        await PatrimonyTable.sync({force:true});
        await QrCodeTable.sync({force:true});
        await ImagesPatrimonyTable.sync({force:true});
        await UserRequest.sync({force:true})
    res.send("Banco Criado com sucesso ")
    }

    static async DepartmentsRooms(){
        DepartmentTable.hasMany(RoomsTable,{foreignKey:{allowNull:false}});
        RoomsTable.belongsTo(DepartmentTable,{foreignKey:{allowNull:false}});
    }

    static async ResponsiblesTable(){
        UserTable.belongsToMany(RoomsTable,{through:UsersRooms});
        RoomsTable.belongsToMany(UserTable,{through:UsersRooms});
    }

    static async PatrimonyRoom(){
        RoomsTable.hasMany(PatrimonyTable,{foreignKey:{allowNull:false}});
        PatrimonyTable.belongsTo(RoomsTable,{foreignKey:{allowNull:false}});
    }

    static async PatrimonyQrCode(){
        PatrimonyTable.hasOne(QrCodeTable,{foreignKey:{allowNull:false}});
        QrCodeTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false}});
    }

    static async PatrimonyImages(){
        PatrimonyTable.hasOne(ImagesPatrimonyTable,{foreignKey:{allowNull:false, as:"roomId"}});
        ImagesPatrimonyTable.belongsTo(PatrimonyTable,{foreignKey:{allowNull:false, as:"roomId"}});
        // PatrimonyTable.sync({force:true});
    }
}

module.exports = Controller;