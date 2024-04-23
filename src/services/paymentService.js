const {
  getShopingCartAndPopulate,
  deleteShopingCart,
} = require("../repository/shopingCartRepository");
const recordRepository = require("../repository/recordRepository");
const paypalServices = require("./paypalService");
const userRepository = require("../repository/userRepository");

exports.sellStock = async (req, res) => {
  try {
    const userId = req.id;
    const user = userRepository.getUserById(req.id);
    let total = 0;
    const item_list = { items: [] };

    let shoppingCart = await getShopingCartAndPopulate(
      userId,
      "productList.itemId"
    );
    if (!shoppingCart) {
      return res.status(404).json({ message: "error, shopiing cart empty" });
    }
    const userName = user.name;
    item_list.items = shoppingCart.productList.map((item) => {
      if (item.availability == false) {
        return res
          .status(400)
          .json({
            message: "uno o mas items no se encuentran actualmente disponibles",
          });
      }
      let element = {
        name: item.itemId.name,
        sku: item.itemId.productID,
        price: item.itemId.price,
        currency: "USD",
        quantity: item.quantity,
      };
      total += Number(item.itemId.price) * Number(element.quantity);

      return element;
    });
    const paypal = await paypalServices.paypalPaymentGateway(item_list, total);
    await recordRepository.createRecord(
      userId,
      userName,
      user.phoneNumber,
      user.address,
      item_list,
      paypal.paymentId,
      total
    );
    await res.redirect(paypal.link);
    deleteShopingCart(shoppingCart._id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
