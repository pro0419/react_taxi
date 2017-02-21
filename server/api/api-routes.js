import fs from 'fs';
import path from 'path';
import paypalRoutes from '../routes/paypal-routes.js';
import mapRoutes from '../routes/map-routes.js';

const isProduction = process.env.NODE_ENV === 'production';

export default function apiRoutes(app) {
  // Paypal Configuration
  var paypalConfig = "paypal.dev.config.json";
  if (isProduction) {
    paypalConfig = "paypal.prod.config.json";
  }
  try {
    var configJSON = fs.readFileSync(path.join(__dirname, "../config/" + paypalConfig));
    var config = JSON.parse(configJSON.toString());
  } catch (e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
  }

  paypalRoutes.init(config);

  app.post('/api/logout', function (req, res) {
    res.status(200).json({ 'message': 'User logged out' });
  });

  /*Paypal specific rules */
  app.post('/api/add-funds', paypalRoutes.addFunds);
  app.post('/api/save-transaction', paypalRoutes.saveTransaction);
  app.post('/api/pay-for-parking', paypalRoutes.payForParking);
  app.post('/api/confirm-parking', paypalRoutes.confirmParking);

  app.post('/api/admin/paypal/create-bursar-payment', paypalRoutes.createBursarPayment);
  app.get('/api/admin/paypal/get-bursar-payment', paypalRoutes.getBursarPayment);

  /*Google Places API*/
  app.post('/api/nearby', mapRoutes.getNearbyPlaces);
  app.post('/api/get-location-details', mapRoutes.getLocationDetails);
  app.post('/api/get-location-coordinates', mapRoutes.getLocationCoordinates);
  app.post('/api/get-street-view', mapRoutes.getStreetView);
}
