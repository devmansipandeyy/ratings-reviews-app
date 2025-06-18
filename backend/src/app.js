const express = require('express');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');
const reviewModel = require('./models/reviewModel');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', reviewRoutes);

const PORT = process.env.PORT || 3001;
reviewModel.createTables().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});