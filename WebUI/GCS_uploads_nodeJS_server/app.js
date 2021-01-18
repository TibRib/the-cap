const {format} = require('util');
const express = require('express');
const Multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');

const MAX_MB = 16

// Instantiate a storage client
const storage = new Storage({
    keyFilename: path.join(__dirname, "./The-CAP-GCP-dc4a47b550a7.json"),
    projectId: 'the-cap-gcp'
  });

const app = express();

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: MAX_MB * 1024 * 1024, // no larger than 16mb, you can change as needed.
  },
});

// A bucket is a container for objects (files).
const bucket = storage.bucket('the-cap-bucket');

app.get("/", (req, res) => {
    res.send(
      `<!doctype html>
      <html lang="en">
        <head>
          <title>Upload NodeJS</title>
          <!-- Required meta tags -->
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body>
            <div class="container text-center">
            <h1>Welcome to the file uploading server</h1>
            <br><br>
            <form method="POST" action="/upload" enctype="multipart/form-data">
                <input type="file" name="file" />
                <input type="submit" />
            </form>
            </div>
       </body>
      </html>

        `
        
    );
  });

// Process the file upload and upload to Google Cloud Storage.
app.post('/upload', multer.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
  console.log('Successfully uploaded '+publicUrl);
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});