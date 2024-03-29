const HttpException = require("../../utils/HttpException.utils");
// const status = require('../../utils/status.utils')
const directModel = require("../../models/direct.model");
const { validationResult } = require("express-validator");
const filialModel = require("../../models/filial.model");

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class directController {
  filialDirect = async (req, res, next) => {
    const model = await directModel.findAll({
      where: {
        filial_id: req.body.filial_id,
      },
      include: [{ model: filialModel, as: "filial" }],
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };


  getAll = async (req, res, next) => {
    const model = await directModel.findAll({
      include: [{ model: filialModel, as: "filial" }],
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar chiqdi",
      data: model,
    });
  };

  search = async (req, res, next) => {
    const { Op } = require('sequelize'); // Make sure to import Sequelize operators

    let body = req.body;
    let query = {};

    if (body.name) {
        query.name = { [Op.like]: `%${body.name}%` };
    }
    if(body.filial_id){
        query.filial_id = body.filial_id;
    }
    try {
        let data = await directModel.findAll({
            include: [{ model: filialModel, as: "filial" }],
            where: query,
            limit: 100,
        });

        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: data
        });
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send('Internal Server Error');
    }

}

  getOne = async (req, res, next) => {
    this.checkValidation(req);
    const model = await directModel.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: filialModel, as: "filial" }],
    });
    if (!model) {
      throw new HttpException(404, "berilgan id bo'yicha malumot yo'q");
    }
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumot chiqdi",
      data: model,
    });
  };



  create = async (req, res, next) => {
    this.checkValidation(req);

    const model = await directModel.create({
      name: req.body.name,
      bonus: req.body.bonus,
      med_id:0,
      filial_id: req.body.filial_id,
    });
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar qo'shildi",
      data: model,
    });
  };


  update = async (req, res, next) => {
    this.checkValidation(req);
    const model = await directModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    model.name = req.body.name;
    model.bonus = req.body.bonus;
    model.filial_id = req.body.filial_id;
    model.save();
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumotlar tahrirlandi",
      data: model,
    });
  };


  delete = async (req, res, next) => {
    const model = await directModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!model) {
      throw new HttpException(404, "bunday id yoq");
    }
    res.status(200).send({
      error: false,
      error_code: 200,
      message: "Malumot o'chirildi",
      data: model,
    });
  };


  checkValidation = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpException(400, "Validation faild", errors);
    }
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new directController();
