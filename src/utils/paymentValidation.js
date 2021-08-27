module.exports.upi = (paymentCode) => { //vvalidation of payment method based on code
  if (paymentCode.length === 11) {
    return true;
  }
  return false;
};

module.exports.paytm = (paymentCode) => {
  if (paymentCode.length === 10) {
    return true;
  }
  return false;
};

module.exports.netBank = (paymentCode) => {
  if (paymentCode.length === 14) {
    return true;
  }
  return false;
};

module.exports.creditCard = (paymentCode) => {
  if (paymentCode.length === 15) {
    return true;
  }
  return false;
};

module.exports.debitCard = (paymentCode) => {
  if (paymentCode.length === 16) {
    return true;
  }
  return false;
};
