const { v4: uuidv4 } = require("uuid");

module.exports.paymentServer = async (method, code, amount) => {
  const status = await new Promise((resolve) =>
    setTimeout(() => {
      resolve(1);
    }, 3000)
  );
  // const status = await setTimeout(() => {
  //   return 1;
  // }, 3000);

  return [uuidv4(), status];
};
