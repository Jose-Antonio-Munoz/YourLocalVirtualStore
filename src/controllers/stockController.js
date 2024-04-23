const { cachingData } = require("../cache/toCache");
const sotckRepository = require("../repository/stockRepository");
const { duplicateError } = require("../utils/duplicateError");

exports.getItemsByNameAndPrice = async (req, res) => {
  try {
    const itemName = new RegExp(req.query.itemName, "i") || new RegExp(".*");
    const itemPrice = req.query.itemPrice || null;
    const query = { name: itemName, availability: true };
    if (itemPrice != null) {
      query.price = itemPrice;
    }
    const items = await sotckRepository.getAllSotck(query);
    res.status(200).json({ items });
    await cachingData(req.originalUrl, items, 60000 * 60);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.getOneSotckItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const stockItem = await sotckRepository.getStockById(itemId);
    res.status(200).json(stockItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.modifyStockItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    let itemToModify = await sotckRepository.getStockById(itemId);
    if (!itemToModify) {
      return res.status(404).json({ message: "error, item not found" });
    }
    const pojoItem = itemToModify.toObject();
    for (const key in req.body) {
      if (pojoItem.hasOwnProperty(key)) {
        itemToModify[key] = req.body[key];
      }
    }
    await sotckRepository.updateStockItem(itemToModify);
    res.status(200).json({
      message: "the element has been modified successfully",
      itemModificado: itemToModify,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.createNewStockItem = async (req, res) => {
  try {
    const { name, price, description, productId, availability } = req.body;
    const imageName = req.file.filename;
    const newStockItem = {
      name,
      productId,
      availability,
      description,
      price,
      imageName,
    };
    await sotckRepository.createStockItem(newStockItem);
    res.status(200).json({ message: "producto agregado exitosamente" });
  } catch (err) {
    const status = duplicateError(err);
    res.status(status.code).json(status.message);
  }
};
exports.deleteStock = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const stockItem = sotckRepository.deleteStockItem(itemId);
    if (!stockItem) {
      return res.status(404).json({ message: "element no found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.modifyAvailability = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const availability = req.body.availability;
    let item = await sotckRepository.getStockById(itemId);
    if (!item) {
      return res.status(404).json({ message: "that element dosnt exists" });
    }
    item.availability = availability;
    item = await sotckRepository.updateStockItem(item);
    res.status(200).json({
      message: `the availability of ${item.name} has been satisfactorily modified`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
