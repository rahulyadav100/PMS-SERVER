const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 6000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a Mongoose schema and model
const formSchema = new mongoose.Schema({
  name: String,
  email: String
});
const Form = mongoose.model('Form', formSchema);

// Middleware to parse URL-encoded data (form data)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (if needed)
app.use(express.json());

// Serve the form at the root URL
app.get('/', (req, res) => {
  res.send(`
    <form action="/submit" method="post">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <input type="submit" value="Submit">
    </form>
  `);
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email } = req.body;

  // Create a new document
  const formData = new Form({
    name,
    email
  });

  try {
    // Save the document to MongoDB
    await formData.save();
    res.send(`Form data saved successfully:<br>Name: ${name}<br>Email: ${email}`);
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('An error occurred while saving form data.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
