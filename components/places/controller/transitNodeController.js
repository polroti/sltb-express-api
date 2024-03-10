const mongoose = require("mongoose");
const TransiteNode = require("../models/transitnode");

exports.createTransiteNode = (req, res, next) => {
  const { name_en, name_ta, name_si, type, address, isStartOrEndNode, province } =
    req.body;

  const newTransitNode = new TransiteNode({
    _id: mongoose.Types.ObjectId(),
    place_id: req.place_id,
    name_en: name_en,
    name_ta: name_ta,
    name_si: name_si,
    type: type,
    address: address,
    isStartOrEndNode: isStartOrEndNode,
    province: province
  });

  newTransitNode.save().then((savedTransitNode) => {
    return res.status(201).json({
      data: savedTransitNode,
      message: "Transit Node Created",
      code: "TRANSIT_NODE_CREATED",
    });
  });
};

exports.checkIfTransitNodeExistsByNameEn = (req, res, next) => {
  TransiteNode.findOne({
    name_en: req.name_en,
  })
    .exec()
    .then((foundTrNode) => {
      if (foundTrNode) {
        res.status(409).json({
          error: "Transit Node already exists by name",
          code: "TRANSIT_NODE_EXISTS",
        });
      } else {
        next();
      }
    });
};

exports.generatePlaceId = (req, res, next) => {
  // Remove spaces and convert to uppercase
  inputStr = req.body.name_en.replace(/\s/g, "").toUpperCase();

  // Take the first three characters of the input string
  const firstThreeChars = inputStr.substring(0, 3);

  // Count the number of characters in the input string
  const numChars = inputStr.length;

  // Generate the numeric part of the ID with leading zeros
  const randomNumericPart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');

  // Concatenate the prefix, first three characters, and numeric part
  const generatedId = req.body.province + firstThreeChars + randomNumericPart;

  req.place_id = generatedId.toUpperCase() + "454545454";

  next();
};

exports.checkIfTransitNodeExistsByPlaceId = (req, res, next) => {
  TransiteNode.findOne({
    place_id: req.place_id,
  })
    .exec()
    .then((foundTrNode) => {
      if (foundTrNode) {
        console.log(req.place_id);
        res.status(409).json({
          error: "Transit Node already exists",
          code: "TRANSIT_NODE_EXISTS",
        });
      } else {
        next();
      }
    });
};
