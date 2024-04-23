const recordRepository = require("../repository/recordRepository");
const { cachingData } = require("../cache/toCache");

exports.getRecordByUserId = async (req, res) => {
  try {
    const user_Id = req.id;
    const userRecord = await recordRepository.getRecord({
      user_Id,
      paymentCompletedStatus: true,
    });
    if (!userRecord) {
      return res.status(404).json({ message: "records not found" });
    }
    res.status(200).json({ userRecord });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.getRecordToDeliver = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const records = await recordRepository.getRecord(
      { paymentCompletedStatus: true, deliveryStatus: "pending" },
      page,
      limit
    );
    res.status(200).json({ records });
    await cachingData(req.originalUrl, records, 60000 * 10);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.getRecordById = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const record = await recordRepository.getRecordById(recordId);
    if (!record) {
      return res.status(400).json({ message: "error, record not found" });
    }
    res.status(200).json({ record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.updateDelivery = async (req, res) => {
  try {
    const recordId = req.params.recordId;
    const record = await recordRepository.getRecordById(recordId);
    if (!record) {
      return res.status(400).json({ message: "error, record not found" });
    }
    record.deliveryStatus = "delivered";
    await recordRepository.updateRecord(record);
    res.status(200).json({ message: `record update succesfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
exports.pendingDelivery = async (req, res) => {
  try {
    const recordId = req.params.deliveryId;
    const record = await recordRepository.getRecordById(recordId);
    if (!record) {
      return res.status(400).json({ message: "error, record not found" });
    }
    record.deliveryStatus = "pending";
    recordRepository.updateRecord(record);
    res.status(200).json({ message: `record update succesfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};
