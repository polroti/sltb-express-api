const mongoose = require("mongoose");
const TransiteNode = require("../models/transitnode");

exports.createTransiteNode = (req, res, next) => {
  const { name_en, name_ta, name_si, type, address, isStartOrEndNode } =
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
          error: "Transit Node already exists",
          code: "TRANSIT_NODE_EXISTS",
        });
      } else {
        next();
      }
    });
};

exports.generatePlaceId = (req, res, next) => {
  const randomChars = name_en
    .split("")
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join("");
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
  const id = randomChars + timestamp; // Combine random characters and timestamp

  req.place_id = id.slice(0, 10);

  next();
};

exports.checkIfTransitNodeExistsByPlaceId = (req, res, next) => {
  TransiteNode.findOne({
    place_id: req.place_id,
  })
    .exec()
    .then((foundTrNode) => {
      if (foundTrNode) {
        res.status(409).json({
          error: "Transit Node already exists",
          code: "TRANSIT_NODE_EXISTS",
        });
      } else {
        next();
      }
    });
};
