import './config/env.js';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[SENSE IIUI Server] Running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('[Startup Error]', err);
});
