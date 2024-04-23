const Stock=require('../models/stockModel')

exports.getAllSotck=async(data)=>{
    return await Stock.find(data)
}
exports.getStockById=async(itemId)=>{
    return await Stock.findById(itemId)
}
exports.updateStockItem=async(item)=>{
    return await item.save()
}
exports.createStockItem=async(stockItem)=>{
    const newStockItem=new Stock(stockItem)
    return await newStockItem.save()
}
exports.deleteStockItem=async(itemId)=>{
    return await Stock.findByIdAndDelete(itemId);
}