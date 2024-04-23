const shopingCartReporistory = require("../repository/shopingCartRepository");
const stockRepository = require("../repository/stockRepository");

exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.id;
    let shopingCart = await shopingCartReporistory.getShopingCartByUserId(
      userId
    );

    const { itemId, quantity } = req.body;
    const stockItem = await stockRepository.getStockById(itemId);
    if (!stockItem) {
      return res
        .status(404)
        .json({ message: "error, this item is not available" });
    }
    const payload = { itemId: itemId, quantity: quantity || 1 };
    if (!shopingCart) {
      shopingCart = {
        productList: [payload],
        userId: userId,
      };
      shopingCartReporistory.createShopingCart(shopingCart);
    } else {
      for (let i = 0; i < shopingCart.productList.length; i++) {
        if (shopingCart.productList[i].itemId == itemId) {
          if (shopingCart.productList[i].quantity + quantity <= 10) {
            shopingCart.productList[i].quantity += quantity;
            await shopingCartReporistory.updateItems(shopingCart);
            return res
              .status(200)
              .json({ message: "producto agregado satisfactoriamente" });
          } else {
            return res.status(522).json({
              error: "You cannot add more than 10 items of the same type.",
            });
          }
        }
      }

      shopingCart.productList.push(payload);
      shopingCartReporistory.updateItems(shopingCart);
    }
    res.status(200).json({ message: "producto agregado satisfactoriamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error interno en el servidor" });
  }
};
exports.getAllItems = async (req, res) => {
  try {
    const userId = req.id;
    const shopingCartItems =
      await shopingCartReporistory.getShopingCartAndPopulate(
        userId,
        "productList.itemId"
      );
    if (!shopingCartItems) {
      return res.status(404).json({ message: "shoping cart empty" });
    }
    res.status(200).json({ items: shopingCartItems.productList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.deleteOneItemFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const itemId = req.params.itemId;
    let shopingCartItems = await shopingCartReporistory.getShopingCartByUserId(
      userId
    );
    let resultProductList = [];

    for (let i = 0; i < shopingCartItems.productList; i++) {
      if (shopingCartItems.productList.itemId != itemId) {
        resultProductList.push();
      }
    }
    shopingCartItems.productList = resultProductList;
    await shopingCartReporistory.updateItems(shopingCartItems);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "erro interno en el servidor" });
  }
};
