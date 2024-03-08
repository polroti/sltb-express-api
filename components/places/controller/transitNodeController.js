const mongoose = require("mongoose");
const TransiteNode = require("../models/transitnode");

exports.createTransiteNode = (req, res, next) => {
  const { name_en, name_ta, name_si, type, address, isStartOrEndNode } =
    req.body;

  const newTransitNode = new TransiteNode({
    _id: mongoose.Types.ObjectId(),
    place_id: generatePlaceId(name_en),
    name_en: name_en,
    name_ta: name_ta,
    name_si: name_si,
    type: type,
    address: address,
    isStartOrEndNode: isStartOrEndNode,
  });

  newTransitNode.save().then((savedTransitNode)=>{
    return res.status(201).json({
      
    })
  })
};

function generatePlaceId(name_en) {
  const randomChars = name_en
    .split("")
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .join("");
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
  const id = randomChars + timestamp; // Combine random characters and timestamp

  //TransiteNode.
  return id.slice(0, 10); // Return ID with maximum 10 characters
}
