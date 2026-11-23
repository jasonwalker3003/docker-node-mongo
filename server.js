// A tiny web app: each visit is stored in MongoDB, and the page shows the count.
const express = require('express');
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);
const app = express();

app.get('/health', (req, res) => res.send('ok\n'));

app.get('/', async (req, res) => {
  try {
    const visits = client.db('demo').collection('visits');
    await visits.insertOne({ at: new Date() });
    const count = await visits.countDocuments();
    res.send(`Hello from a container. Visits stored in MongoDB: ${count}\n`);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).send('Database unavailable\n');
  }
});

client.connect()
  .then(() => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  });
