var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "z36j8khm87nfbbvr",
  publicKey: "n3j35xz2tqm654wt",
  privateKey: "63f7aa809eb868f9547b89c4879aa9e0"
});

exports.getToken = (req, res) => {
    console.log("hello")
  gateway.clientToken.generate({}, function(err, response) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true
      }
    },
    function(err, result) {
      if (err) {
        res.status(500).json(error);
      } else {
        res.json(result);
      }
    }
  )
};
