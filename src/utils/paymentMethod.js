module.exports.upi=(paymentCode)=>{
    if(paymentCode.length==11)
    {
        return true;
    }
    return false;
}

module.exports.paytm=(paymentCode)=>{
    if(paymentCode.length==10)
    {
        return true;
    }
    return false;
}

module.exports.netbank=(paymentCode)=>{
    if(paymentCode.length==14)
    {
        return true;
    }
    return false;
}

module.exports.creditc=(paymentCode)=>{
    if(paymentCode.length==15)
    {
        return true;
    }
    return false;
}

module.exports.debitc=(paymentCode)=>{
    if(paymentCode.length==16)
    {
        return true;
    }
    return false;
}