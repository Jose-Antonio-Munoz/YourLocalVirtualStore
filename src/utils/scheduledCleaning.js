const schedule = require("node-schedule");
const RecoveryToken = require("../models/tokenModel");

function tokenCleaning() {
  schedule.scheduleJob("0 * * * *", async () => {
    try {
      // Delete tokens that have expired
      const result = await RecoveryToken.deleteMany({
        expiresAt: { $lt: new Date() },
      });

      console.log(
        `Removed ${result.deletedCount} expired tokens from the database`
      );
    } catch (error) {
      console.error("Error during token cleanup:", error);
    }
  });
}
module.exports = { tokenCleaning };
