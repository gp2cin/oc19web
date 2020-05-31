// AWS
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'AKIAVNKEV7NOSHKQGJ46',
  secretAccessKey: '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'
});

const uploadFile = (file, filename) =>
  new Promise(resolve => {
    // Setting up S3 upload parameters
    console.log(file);
    const params = {
      // Bucket
      Bucket: 'general-observation-images',
      Key: `imagens/${filename}`, // File name you want to save as in S3
      Body: file,
      // Make public
      ACL: 'public-read'
    };
    let newImageUrl = '';
    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
      if (err) {
        throw err;
      }
      data.location = newImageUrl;
      console.log(`File uploaded successfully. ${data.Location}`);
      resolve(data.Location);
    });
  });

export { uploadFile };
