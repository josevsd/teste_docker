const UserTable = require('../../Models/UserTable');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const { response } = require('express');
require('dotenv-safe').config();
class UserController {
    static async index(req, res) {
        /* 
            #swagger.tags = ['Users controll']
            #swagger.description = "Autenticação de usuário"
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
        const { email, password } = req.body;
        if (!email || !password) return res.status(422).json({ msg: 'Email n password is mandatory!' });
        const resFind = await UserTable.findOne({ where: { email } });
        if (!resFind) return res.status(422).json({ msg: "Can't find this user!" });
        if (await bcrypt.compare(password, resFind.password)) {
            try {
                const { id, office } = resFind;
                var token =""
                office == "admin"?  token = jwt.sign({ id, office }, process.env.SECRETADMIN, { expiresIn: (60 * 60) }):token = jwt.sign({ id, office }, process.env.SECRET, { expiresIn: (60 * 60) })
                return res.status(200).json({ office, token })
            } catch (error) {
                if (error) console.log(error);
                return res.status(401).json({ msg: "[ERROR] User has not permission!" });
            }
        } else {
            return res.status(422).json({ msg: "Email ou Senha incorretos!" });
        }
    }

    static async create(req, res) {
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Criação de usuário"  
            #swagger.parameters['name']={
                description:'Nome do usuário',
                type:'string',
                required:true,
                in:'body',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }        
            #swagger.parameters['image']={
                description:'Imagem do usuário, enviado por um input type file',
                type:'object',
                required:false,
                in:'body',
            }
            
            #swagger.parameters['office']={
                description:'Cargo do usuário, admin ou docente',
                type:'string',
                required:true,
                in:'body',
                example:'docente',
            }
            
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
        */
        const { name, email, password, office, dep, room, confirmPass,cpf } = req.body
        console.log(req.body)
        // const image = String(req.file.path).replace('\\', '/');
        // if (!email || !password || !office || !confirmPass) return res.status(422).json({ msg: "[ERROR] Data is missing" });
        // if (password !== confirmPass) return res.status(422).json({ msg: "The passwords are different" });
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const resFind = await UserTable.findOne({ where: { email } });
         
            if (resFind) {
                console.log(resFind)
            res.send("User created failed")
            }
           else{
            await UserTable.create({
                name,
                email,
                office,
                cpf,
                password: passwordHash,
                image: "teste.png"
            
            });
            res.status(201).send('User created successfully')
        }
           
        } catch (err) {
            if (err) console.log(err);
            return res.status(501).send("[ERROR] Can't create user!");
        }
    }

    static async update(req, res) {
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Atualização de usuário"
            #swagger.parameters['token']={
                description:'Token do usuário',
                type:'string',
                required:true,
                in:'header',
                example:'X-Access-Token: <token>',
            }
            #swagger.parameters['name']={
                description:'Nome do usuário (principal dado)',
                type:'string',
                required:true,
                in:'body',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }        
            #swagger.parameters['image']={
                description:'Imagem do usuário, enviado por um input type file',
                type:'object',
                required:true,
                in:'body',
            }
            
            #swagger.parameters['office']={
                description:'Cargo do usuário, admin ou docente',
                type:'string',
                required:true,
                in:'body',
                example:'docente',
            }
            
            #swagger.parameters['email']={
                description:'Email cadastrado pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'fulaninho.sobrenome@senaisp.xxx.com',
            }
            
            #swagger.parameters['password']={
                description:'Senha cadastrada pelo usuário',
                type:'string',
                required:true,
                in:'body',
                example:'123456#senha',    
            }
            
        */
        const { email, name, confirmPassword, newPassword } = req.body
        const image = String(req.file.path).replace('\\', '/');
        const resFind = await UserTable.findOne({ where: { email } })
        if (!resFind) {
            return res.status(404).json({ msg: "User not found" })
        }
        try {
            const checkPassword = await bcrypt.compare(confirmPassword, resFind.password)
            if (!checkPassword) {
                return res.status(422).json({ msg: "Incorrect password" })
            }
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            await UserTable.update({
                name,
                image,
                password: passwordHash
            },
                {
                    where: {
                        email
                    }
                })
            res.status(200).json({ msg: "Update data sucessfully" })
        } catch (err) {
            res.status(400).json({ msg: "[ERROR]: Can't update data" })
        }
    }

    static async depUpdate(req, res) {
        const { email, dep, room } = req.body
        try {
            await UserTable.update({
                dep,
                room
            },
                {
                    where: {
                        email
                    }
            })
            res.status(200).json({msg: "Updated data"})
        } catch (err) {
            res.status(400).json({msg: "[ERROR] can't update departament"})
        }
    }

    static async delete(req, res) {
        /*
            #swagger.tags = ['Users controll']
            #swagger.description = "Remoção de usuário"
        */
        /*
            #swagger.parameters['token']={
                description:'Token do usuário',
                type:'string',
                required:true,
                in:'header',
                example:'X-Access-Token: <token>',
            }
            #swagger.parameters['name']={
                description:'Nome do usuário',
                type:'string',
                required:true,
                in:'query',
                example:'Fulaninho (nome) da Silva (Sobrenome)',
            }
        */
        const { email } = req.body
        const resFind = await UserTable.findOne({
            where: {
                email
            }
        })
        try {
            resFind.destroy()
            res.status(200).json({ msg: "User deleted" })
        } catch (err) {
            res.status(404).json({ msg: "User not found" })
        }
    }

    static async read(req, res) {
        try {
            const resFind = await UserTable.findAll({
                attributes: { exclude: ['password'] }
            })
            res.status(200).json(resFind)
        } catch (err) {
            res.status(404).json({ msg: "[ERROR] Can't find users or they don't exists" })
        }
    }
    static async RefreshPassword(req,res){
        const {currentPassword,newPassword} = req.body;
        const salt = await bcrypt.genSalt(12);
        const password = await bcrypt.hash(newPassword,salt)
        console.log(password)
        const User = await UserTable.findOne({where:{
            password:currentPassword
        }})
        if(User){
            UserTable.update({password:password},{where:{
                password:User.password
            }})
            console.log("senha atualizada")
            return res.status(201).send("senha atualizada")
        }
        else{
            console.log("senha não atualizada")
            return res.status(402).send("a senha está incorreta!")
        }
        
    }
    static async email(req,res){
        console.log(req.body)
        const {Email} = await req.params

        const User = await UserTable.findOne({where:{
            email:Email
        }})
        
        if(User){
            res.json({emailExists:true})
            const {cpf} = User
            console.log(cpf)
            const newUser = await UserTable.update({password:cpf},{ where:{
                email:Email
            }
        
        })
            
            const transport = nodemailer.createTransport({
                service:"outlook",
                host:"smtp-mail.outlook.com",
                port:587,
                secure:false,
                auth:{
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
    
                },
                tls:{
                    rejectUnauthorized:false,
                    ciphers:'SSLv3'
                }
            });
            var mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `${Email}`,
                subject: 'Recuperação De Senha',
                text:`Foi solicitado uma recuperação de senha! sua nova senha é o seu cpf que é: ${cpf} `,
                html:""
              };
              
            const email = transport.sendMail(mailOptions,(err,response)=>{
                if(err) throw err;
                console.log("email enviado", response)
            })
        }
        else{
            res.json({emailExists:false})
        }


    
    }
}
module.exports = UserController