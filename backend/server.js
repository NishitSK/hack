const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- EXISTING SCHEMA AND MODEL FOR SCHEMES ---
const schemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Education', 'Health', 'Pension', 'Housing', 'Employment', 'Other'],
  },
  eligibility: {
    type: String,
    required: true,
  },
  applicationProcess: {
    type: String,
    default: 'Refer to official guidelines.',
  },
  contactInfo: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  applicationLink: { // <--- ADDED: New field for direct application link
    type: String,
    trim: true,
    // You can add validation here if needed, e.g., match: [/^https?:\/\/.*/, 'Invalid URL format']
  },
});

const Scheme = mongoose.model('Scheme', schemeSchema);

// --- NEW SCHEMA AND MODEL FOR RESOURCES ---
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Books', 'Equipment', 'Services', 'Housing', 'Vehicles', 'Other'],
  },
  contactPerson: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  contactPhone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Available', 'Claimed', 'Expired'],
    default: 'Available',
  },
});

const Resource = mongoose.model('Resource', resourceSchema);

// --- UPDATED API ROUTES FOR SCHEMES ---

// GET all schemes (now with search and filter functionality)
app.get('/api/schemes', async (req, res) => {
  try {
    const { search, category } = req.query; // Extract search and category from query parameters
    let query = {}; // Initialize an empty query object

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const schemes = await Scheme.find(query); // Apply the constructed query
    res.status(200).json(schemes);
  } catch (err) {
    console.error('Error fetching schemes:', err);
    res.status(500).json({ message: 'Server Error: Could not retrieve schemes.' });
  }
});

app.get('/api/schemes/:id', async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found.' });
    }
    res.status(200).json(scheme);
  } catch (err) {
    console.error('Error fetching single scheme:', err);
    // Handle invalid ObjectId format explicitly
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Scheme ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not retrieve scheme.' });
  }
});

app.post('/api/schemes', async (req, res) => {
  try {
    const newScheme = new Scheme(req.body);
    const savedScheme = await newScheme.save();
    res.status(201).json(savedScheme);
  } catch (err) {
    console.error('Error creating scheme:', err);
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error: Could not create scheme.' });
  }
});

app.put('/api/schemes/:id', async (req, res) => {
  try {
    const updatedScheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body, // req.body will now include 'applicationLink' if provided
      { new: true, runValidators: true }
    );
    if (!updatedScheme) {
      return res.status(404).json({ message: 'Scheme not found.' });
    }
    res.status(200).json(updatedScheme);
  } catch (err) {
    console.error('Error updating scheme:', err);
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    if (err.kind === 'ObjectId') { // Added validation for invalid ID on PUT
        return res.status(400).json({ message: 'Invalid Scheme ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not update scheme.' });
  }
});

app.delete('/api/schemes/:id', async (req, res) => {
  try {
    const deletedScheme = await Scheme.findByIdAndDelete(req.params.id);
    if (!deletedScheme) {
      return res.status(404).json({ message: 'Scheme not found.' });
    }
    res.status(200).json({ message: 'Scheme deleted successfully.' });
  } catch (err) {
    console.error('Error deleting scheme:', err);
    if (err.kind === 'ObjectId') { // Added validation for invalid ID on DELETE
        return res.status(400).json({ message: 'Invalid Scheme ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not delete scheme.' });
  }
});

// --- EXISTING API ROUTES FOR RESOURCES ---

// GET all resources
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (err) {
    console.error('Error fetching resources:', err);
    res.status(500).json({ message: 'Server Error: Could not retrieve resources.' });
  }
});

// GET a single resource by ID
app.get('/api/resources/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.status(200).json(resource);
  } catch (err) {
    console.error('Error fetching single resource:', err);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Resource ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not retrieve resource.' });
  }
});

// POST a new resource
app.post('/api/resources', async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    const savedResource = await newResource.save();
    res.status(201).json(savedResource); // 201 Created
  } catch (err) {
    console.error('Error creating resource:', err);
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error: Could not create resource.' });
  }
});

// PUT (Update) an existing resource by ID
app.put('/api/resources/:id', async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.status(200).json(updatedResource);
  } catch (err) {
    console.error('Error updating resource:', err);
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Resource ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not update resource.' });
  }
});

// DELETE a resource by ID
app.delete('/api/resources/:id', async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found.' });
    }
    res.status(200).json({ message: 'Resource deleted successfully.' });
  } catch (err) {
    console.error('Error deleting resource:', err);
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid Resource ID format.' });
    }
    res.status(500).json({ message: 'Server Error: Could not delete resource.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});