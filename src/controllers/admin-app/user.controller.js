const UserModel = require('../../models/user.model');
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('../../startup/config');
const DoctorModel = require('../../models/doctor.model');
const InspectionModel = require('../../models/inspector_category.model');

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    userLogin = async (req, res, next) => {
        this.checkValidation(req);
        const {  password, login } = req.body;
        const model = await UserModel.findOne({
            include:[
                {model: DoctorModel, as: 'doctor',
            
            attributes: ['id', 'name']
        },
        {
            model: InspectionModel, as: 'inspecton',
            attributes: ['id', 'name']
        }
            ],
            where:{
                user_name: login
            }
        });
        const isMatch = await bcrypt.compare(password, model.password)
        delete model['password'];
        console.log(isMatch);
        if(!isMatch){
            throw new HttpException(200, 
                {
                    "error": false,
                    "message": "password error"
                  }
                )
        }

        const token = jwt.sign({ user_id: model.id.toString() }, secret_jwt, {
            expiresIn: '24h'
        });
        model.token = token
        res.send({
            error_code: true,
            message: 'User info',
            data: model
        });
    };
    getAll = async (req, res, next) =>{
        const model = await UserModel.scope('withoutPassword').findAll(); 
        res.send(model); 
       }
    getOne = async (req, res, next) =>{
        const model = await UserModel.findOne({
            where:{
                id: req.params.id
            }
        })
        res.send(model)
    }
    create = async(req, res, next) => {
        this.checkValidation(req);
        // console.log(req.body);
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
            console.log(req.body.password);
        }
        const modell = await UserModel.create(req.body);
        delete req.body['password']
        res.send(modell);
    }
    update = async (req, res, next) =>{
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt();
        let data = req.body;
            const pasXash = await bcrypt.hash(data.password.toString(), salt);
            delete data['password'];
            data['password_hash'] = pasXash;
            const model = await UserModel.findOne({
                where:{
                    id: req.currentUser.id
                }
            })
        model.user_name = req.body.user_name;
        model.room_id = req.body.room_id;
        model.role = req.body.role;
        model.inspection_category_id = req.body.inspection_category_id;
        model.pay_type = req.body.pay_type;
        model.salary = req.body.salary;
        model.save();
        res.send(model);
    }
    delete = async (req, res, next) =>{
        const model = await UserModel.destroy(req.body);
        res.send(model);
    }
    checkValidation = (req) => { 
        const errors = validationResult(req)
        if (!errors.isEmpty) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
    
}

// console.log(VerifyToken);



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;