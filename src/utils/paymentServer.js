const { v4: uuidv4 } = require("uuid");

module.exports.paymentServer = async (method, code, amount) => {
  let status = await setTimeout(() => {
    return 1;
  }, 3000);

  return [uuidv4(), status];
};
