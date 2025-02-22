import connectionTODB from './config/dbConnection.js';
import cloudinary from 'cloudinary';
import { server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


server.listen(PORT, async () => {
  await connectionTODB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
