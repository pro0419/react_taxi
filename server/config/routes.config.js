const isProduction = process.env.NODE_ENV === 'production';

const routesConfigDev = {
  addFundsSuccess: "http://localhost:3000/finalize-payment",
  addFundsFail: "http://localhost:3000/payment-failure",
  parkingPaymentSuccess: "http://localhost:3000/finalize-parking",
  parkingPaymentFail: "http://localhost:3000/payment-failure"
};

const routesConfigProd = {
  addFundsSuccess: "http://52.91.29.108/finalize-payment",
  addFundsFail: "http://52.91.29.108/payment-failure",
  parkingPaymentSuccess: "http://52.91.29.108/finalize-parking",
  parkingPaymentFail: "http://52.91.29.108/payment-failure"
};

export const routes = isProduction ? routesConfigProd : routesConfigDev;
