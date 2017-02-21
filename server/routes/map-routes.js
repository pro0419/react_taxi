"use strict";
var http = require('http');
var https = require('https');
var gMapsKey = "AIzaSyDtFlHY3zvCOq72mg6D4RPrw10PnZTTxpw";

exports.getNearbyPlaces = function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var path = "/maps/api/place/nearbysearch/json?location=" + lat + "," + lng + "&radius=500&key="+gMapsKey;
  var options = {
    host: "maps.googleapis.com",
    path: path
  };
  https.get(options, function(resp){
    var responseBody = "";
    resp.on('data', function(chunk){
      responseBody += chunk;
    });
    resp.on('end', function() {
      var placesData = JSON.parse(responseBody);
      res.send(placesData);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};

exports.getLocationDetails = function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;
  var path = "/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
  var options = {
    host: "maps.googleapis.com",
    path: path
  };
  http.get(options, function(resp){
    var responseBody = "";
    resp.on('data', function(chunk){
      responseBody += chunk;
    });
    resp.on('end', function() {
      var locationData = JSON.parse(responseBody);
      res.send(locationData);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};

exports.getLocationCoordinates = function (req, res) {
  console.log(req.body);
  var address = req.body.address;
  var path = "/maps/api/geocode/json?address=" + address + "&key=" + gMapsKey;
  var options = {
    host: "maps.googleapis.com",
    path: path
  };
  https.get(options, function(resp){
    var responseBody = "";
    resp.on('data', function(chunk){
      responseBody += chunk;
    });
    resp.on('end', function() {
      var locationData = JSON.parse(responseBody);
      res.send(locationData);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};

exports.getStreetView = function (req, res) {
  var lat = req.body.lat;
  var lng = req.body.lng;
  console.log(lat);
  console.log(lng);
  var path = "maps/api/streetview?size=600x300&location="+lat+","+lng+"&key="+gMapsKey;
  var options = {
    host: "maps.googleapis.com",
    path: path
  };
  http.get(options, function(resp){
    var responseBody = "";
    resp.on('data', function(chunk){
      responseBody += chunk;
    });
    resp.on('end', function() {
      res.send(responseBody);
    });
  }).on("error", function(e){
    console.log("Got error: " + e.message);
  });
};
