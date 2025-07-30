// netlify/functions/upload-image.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary using environment variables securely
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Use HTTPS
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  let parsedBody;
  try {
    // Netlify functions automatically parse JSON bodies.
    // If the client sends `Content-Type: application/json`, event.body might be a stringified JSON.
    // If event.isBase64Encoded is true, decode it first.
    if (event.isBase64Encoded) {
      parsedBody = JSON.parse(Buffer.from(event.body, 'base64').toString());
    } else {
      parsedBody = JSON.parse(event.body); // Directly parse if not base64 encoded
    }
  } catch (error) {
    console.error("Error parsing body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Could not parse body' }),
    };
  }

  const fileData = parsedBody.file; // This 'file' key must match what the client sends (the base64 image string)

  if (!fileData) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No file data received' }),
    };
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(fileData, {
      // You can add options here, e.g., folder, tags, transformations
      // folder: 'wedding_uploads',
      resource_type: 'auto' // automatically detect image/video
    });

    console.log('Cloudinary upload result:', uploadResult);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ secure_url: uploadResult.secure_url }),
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to upload to Cloudinary', error: error.message }),
    };
  }
};