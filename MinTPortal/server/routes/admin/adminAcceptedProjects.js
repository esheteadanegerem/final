import express from 'express';
import multer from 'multer';
import fs from 'fs';
import AcceptedProject from '../../models/acceptedProjects.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const newPublicationId = 'accepted-' + Date.now();
    const publicationsPath = `public/accepted-projectsfiles/${newPublicationId}`;

    fs.mkdir(publicationsPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        cb(err, null);
      } else {
        console.log('Directory created successfully:', publicationsPath);
        cb(null, publicationsPath);
      }
    });
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3000000 }, // File size limit: 3MB
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]);

router.post('/add-accepted-project', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred while uploading' });
    } else {
      const { title, p_investigator, author, funding_source, description, field_of_study, date } = req.body;
      let filePath = '';
      let imagePath = 'public/images/noimage.png';

      if (req.files['file']) {
        filePath = req.files['file'][0].path.replace(/\\/g, '/'); // Replace backward slashes with forward slashes
      }

      if (req.files['image']) {
        imagePath = req.files['image'][0].path.replace(/\\/g, '/'); // Replace backward slashes with forward slashes
      }

      const serverUrl = 'https://final-0t4v.onrender.com'; // Replace this with your server URL

      try {
        const newPublication = new AcceptedProject({
          title,
          p_investigator,
          author,
          funding_source,
          description,
          field_of_study,
          date,
          imagePath: imagePath.replace(/^public\//, ''), // Remove 'public/' from the path
          filePath: filePath.replace(/^public\//, ''), // Remove 'public/' from the path
        });

        const savedPublication = await newPublication.save();
        res.json(savedPublication);
      } catch (error) {
        console.error('An error occurred while saving to the database:', error);
        res.status(500).json({ error: 'An error occurred while saving to the database' });
      }
    }
  });
});

export default router;
