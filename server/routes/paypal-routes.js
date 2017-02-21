"use strict";

var paypal = require('paypal-rest-sdk');
var querystring = require('querystring');
var http = require('http');
var config = {};
import { routes } from '../config/routes.config.js';

exports.addFunds = function (req, res) {

    var paypalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {},
      "transactions": [{
        "amount": {
          "currency": "USD"
        }
      }]
    };

    paypalPayment.transactions[0].amount.total = req.body.amount;
    paypalPayment.transactions[0].description = "Add funds to ParkEzly Wallet";
    paypalPayment.redirect_urls.return_url = routes.addFundsSuccess; // + (config.port ? config.port : 3000) + "/finalize-payment";
    paypalPayment.redirect_urls.cancel_url = routes.addFundsFail; // + (config.port ? config.port : 3000) + "/payment-failure";

    paypal.payment.create(paypalPayment, {}, function (err, resp) {
      if (err) {
        res.redirect('/payment-failure?errorcode=1010');
      } else {
        if(resp.payer.payment_method === 'paypal') {
          req.session[resp.id] = {
            amount: req.body.amount,
            userId: req.body.userId,
            currentBalance: req.body.currentBalance
          };
          console.log(req.session[resp.id]);
          var redirectUrl;
          for(var i=0; i < resp.links.length; i++) {
            var link = resp.links[i];
            if (link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          }
          res.redirect(redirectUrl);
        }
      }
    });
};

exports.saveTransaction = function(req, res) {
  var paymentId = req.body.paymentId;
  if(req.session[paymentId]) {
    var dateTime = (new Date()).toISOString().replace(/\.[\d]{3}Z$/, 'Z ');
    var ip = req.connection.remoteAddress;
    var userId = req.session[paymentId].userId;
    var amt = req.session[paymentId].amount;
    var currentBalance = req.session[paymentId].currentBalance;
    var newBalance = parseFloat(req.session[paymentId].currentBalance) + parseFloat(amt);

    var postData = JSON.stringify({
      resource : {
        date_time: dateTime,
        paid_date: dateTime,
        user_id: userId,
        add_amt: amt,
        current_balance: currentBalance,
        new_balance: newBalance,
        ip: ip
      }
    });

    var options = {
      hostname: '108.30.248.212',
      port: '8006',
      path: '/api/v2/pzly01live7/_table/user_wallet',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'X-DreamFactory-Application-Name': 'parkezly',
        'X-DreamFactory-Api-Key': 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5'
      }
    };

    var post_req = http.request(options, function(resp) {
      resp.setEncoding('utf8');
      resp.on('data', function (chunk) {
        delete req.session[paymentId];
        res.redirect('/my-wallet');
      });
    });

    post_req.on('error', function(e) {
      res.redirect('/payment-failure?errorcode=1011&paymentId='+paymentId);
      console.log('Could not save transaction : ' + e.message);
    });

    post_req.write(postData);
    post_req.end();
  }
};

exports.payForParking = function(req, res) {
  var paypalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {},
      "transactions": [{
        "amount": {
          "currency": "USD"
        }
      }]
    };

    paypalPayment.transactions[0].amount.total = req.body.amount;
    paypalPayment.transactions[0].description = "Pay for Parking";
    paypalPayment.redirect_urls.return_url = routes.parkingPaymentSuccess;
    paypalPayment.redirect_urls.cancel_url = routes.parkingPaymentFail;

    paypal.payment.create(paypalPayment, {}, function (err, resp) {
      if (err) {
        res.redirect('/payment-failure?errorcode=1010');
      } else {
        if(resp.payer.payment_method === 'paypal') {
          req.session[resp.id] = {
            amount: req.body.amount,
            paymentData: req.body.parkingData
          };
          console.log(req.session[resp.id]);
          var redirectUrl;
          for(var i=0; i < resp.links.length; i++) {
            var link = resp.links[i];
            if (link.method === 'REDIRECT') {
              redirectUrl = link.href;
            }
          }
          res.redirect(redirectUrl);
        }
      }
    });
};

exports.confirmParking = function(req, res) {
  var paymentId = req.body.paymentId;
  if(req.session[paymentId]) {
    //var dateTime = (new Date()).toISOString().replace(/\.[\d]{3}Z$/, 'Z ');
    //var ip = req.connection.remoteAddress;

    var paymentData = JSON.parse(req.session[paymentId].paymentData);

    var postData = JSON.stringify(paymentData);

    var options = {
      hostname: '108.30.248.212',
      port: '8006',
      path: '/api/v2/pzly01live7/_table/parked_cars',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
        'X-DreamFactory-Application-Name': 'parkezly',
        'X-DreamFactory-Api-Key': 'dbed451c5e4e1518d301c118ffe078ca16a2c287d5efff98515b938538abb5b5'
      }
    };

    var post_req = http.request(options, function(resp) {
      resp.setEncoding('utf8');
      resp.on('data', function (chunk) {
        var data = JSON.parse(chunk);
        delete req.session[paymentId];
        res.redirect('/find-vehicle/'+data.resource[0].id);
      });
    });

    post_req.on('error', function(e) {
      res.redirect('/payment-failure?errorcode=1011&paymentId='+paymentId);
      console.log('Could not save transaction : ' + e.message);
    });

    post_req.write(postData);
    post_req.end();
  }
};

/* Bursar Panel Routes */

exports.createBursarSavedCardPayment = function(req, res) {
    var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
              "credit_card": {
                  "type": "visa",
                  "number": "4417119669820331",
                  "expire_month": "11",
                  "expire_year": "2018",
                  "cvv2": "874",
                  "first_name": "Joe",
                  "last_name": "Shopper",
                  "billing_address": {
                      "line1": "52 N Main ST",
                      "city": "Johnstown",
                      "state": "OH",
                      "postal_code": "43210",
                      "country_code": "US"
                  }
              }
          }]
      },
      "transactions": [{
          "amount": {
              "total": "7",
              "currency": "USD",
              "details": {
                  "subtotal": "5",
                  "tax": "1",
                  "shipping": "1"
              }
          },
          "description": "This is the payment transaction description."
      }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("Create Payment Response");
          console.log(payment);
      }
  });
}

exports.createBursarPayment = function(req, res) {
  const paymentData = req.body;
  
  let paypalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
              "credit_card": {}
          }]
      },
      "transactions": [{
          "amount": {
              "currency": "USD",
          },
          "description": "This is the payment transaction description."
      }]
  };

  
  paypalPayment.payer.funding_instruments[0].credit_card.type = paymentData.type;
  paypalPayment.payer.funding_instruments[0].credit_card.number = paymentData.number;
  paypalPayment.payer.funding_instruments[0].credit_card.expire_month = paymentData.expire_month;
  paypalPayment.payer.funding_instruments[0].credit_card.expire_year = paymentData.expire_year;
  paypalPayment.payer.funding_instruments[0].credit_card.cvv2 = paymentData.cvv2;
  paypalPayment.payer.funding_instruments[0].credit_card.first_name = paymentData.first_name;
  paypalPayment.payer.funding_instruments[0].credit_card.last_name = paymentData.last_name;
  paypalPayment.transactions[0].amount.total =  paymentData.total;

  paypal.payment.create(paypalPayment, function (error, payment) {
      if (error) {
        console.log(JSON.stringify(error, null, 2));
        res.send(error);
      } else {
          console.log("Create Payment Response");
          console.log(JSON.stringify(payment, null, 2));
          res.json(payment)
      }
  });
  
};

exports.getBursarPayment = function(req, res) {
  var paymentId = "PAY-0XL713371A312273YKE2GCNI";

  paypal.payment.get(paymentId, function (error, payment) {
      if (error) {
          console.log(error);
          throw error;
      } else {
          console.log("Get Payment Response");
          console.log(JSON.stringify(payment));
      }
  }); 
}

exports.getBursarPaymentList = function(req, res) {
  var listPayment = {
    'count': '1',
    'start_index': '1'
  };

  paypal.payment.list(listPayment, function (error, payment) {
      if (error) {
          throw error;
      } else {
          console.log("List Payments Response");
          console.log(JSON.stringify(payment));
      }
  });
}

exports.init = function (c) {
  config = c;
  paypal.configure(c.api);
};

/*

  let payPalPayment = {
      "intent": "sale",
      "payer": {
          "payment_method": "credit_card",
          "funding_instruments": [{
              "credit_card": {
                  "type": "visa",
                  "number": "4417119669820331",
                  "expire_month": "11",
                  "expire_year": "2018",
                  "cvv2": "874",
                  "first_name": "Joe",
                  "last_name": "Shopper",
                  "billing_address": {
                      "line1": "52 N Main ST",
                      "city": "Johnstown",
                      "state": "OH",
                      "postal_code": "43210",
                      "country_code": "US"
                  }
              }
          }]
      },
      "transactions": [{
          "amount": {
              "total": "7",
              "currency": "USD",
              "details": {
                  "subtotal": "5",
                  "tax": "1",
                  "shipping": "1"
              }
          },
          "description": "This is the payment transaction description."
      }]
  };
*/



