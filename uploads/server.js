const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle file uploads
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
  const uploadedFile = req.file;

  // You can store file information in a database or process it as needed
  const fileInfo = {
    fileName: uploadedFile.originalname,
    uploadedBy: 'John Doe', // Set the actual uploader's name
    uploadDate: new Date().toLocaleDateString(),
    filePath: uploadedFile.path
  };

  // Send the file information as a JSON response
  res.json(fileInfo);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${3000}`);
});
