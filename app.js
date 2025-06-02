
import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import { connectDB } from './database/index.js'; // database connection
import materialRoutes from './routes/materialRoutes.js'; // import routes if needed
import materialOrderRoutes from './routes/rawMaterialOrderRoutes.js'; // import routes if needed
import productrouts from './routes/productRouts.js'; // import routes if needed
import productionsrouts from './routes/ProductionRouts.js'; // import routes if needed
import employeeRouts from './routes/employRouts.js'; // import routes if needed

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend
  credentials: true, // if you're using cookies or auth headers
}));

const port = process.env.PORT || 4000;

app.use(express.json());

// Register routes
app.use('/api/v1/', materialRoutes); // optional if routes are ready
app.use('/api/v1/', materialOrderRoutes); // optional if routes are ready
app.use('/api/v1/', productrouts); // optional if routes are ready
app.use('/api/v1/', productionsrouts); // optional if routes are ready
app.use('/api/v1/', employeeRouts); // optional if routes are ready

// Start server
async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer(); // <-- Don't forget this!
