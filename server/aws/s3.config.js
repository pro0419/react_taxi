import uuid from 'node-uuid';

// Amazon Web Service S3
// Body parser for restful API routes.
const dataUriToBuffer = require('data-uri-to-buffer');
const AWS = require('aws-sdk');

AWS.config.credentials = new AWS.Config({
  accessKeyId: 'AKIAJNG22KFRVUAICSEA', secretAccessKey: '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'
});

AWS.config.update({
  accessKeyId: "AKIAJNG22KFRVUAICSEA",
  secretAccessKey: "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"
});
// console.log(AWS.config.credentials);

// Create an S3 client
var s3 = new AWS.S3();

export default function s3Config(app) {
  // Create a bucket and upload something into it
  app.post('/admin/s3', function (req, res) {
    var awsURL = 'https://s3.amazonaws.com/';
    var bucketName = 'parkezly-images';
    var keyName = 'township_image-' + uuid.v4() + '.png';
    let decoded = dataUriToBuffer(req.body.croppedImage);

    s3.createBucket({ Bucket: bucketName }, function () {
      var params = { Bucket: bucketName, Key: keyName, Body: decoded, ACL: 'public-read' };
      s3.putObject(params, function (err, data) {
        if (err) {
          console.log(err)
          res.status(500).json({ 'message': err });
        }
        else {
          console.log("Successfully uploaded data to " + awsURL + bucketName + "/" + keyName);
          res.status(200).json({
            'message': awsURL + bucketName + "/" + keyName,
          });
        }
      });
    });
  });
}