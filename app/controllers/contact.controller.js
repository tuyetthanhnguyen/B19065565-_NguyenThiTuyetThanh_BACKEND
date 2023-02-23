// exports.create = (req, res) => {
//   res.send({ message: "create handle" });
// };
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }

}

// exports.findAll = (req, res) => {
//   res.send({ message: "findAll handle" });
// };
exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    }
    else {
      documents = await contactService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving the contact")
    );
  }
  return res.send(documents);

}

exports.findOne = (req, res) => {
  res.send({ message: "findOne handle" });
};

exports.update = (req, res) => {
  res.send({ message: "update handle" });
};

exports.delete = (req, res) => {
  res.send({ message: "delete handle" });
};

exports.deleteAll = (req, res) => {
  res.send({ message: "deleteAll handle" });
};

exports.findAllFavorite = (req, res) => {
  res.send({ message: "findAllFavorite handle" });
};
