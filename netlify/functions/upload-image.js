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
    if (event.isBase64Encoded) {
      parsedBody = JSON.parse(Buffer.from(event.body, 'base64').toString());
    } else {
      parsedBody = JSON.parse(event.body);
    }
  } catch (error) {
    console.error("Error parsing body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Could not parse body' }),
    };
  }

  const fileData = parsedBody.file;

  if (!fileData) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No file data received' }),
    };
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(fileData, {
      // ADDED: This tag allows us to fetch all wedding photos later
      tags: ['bowens_wedding_2025'],
      resource_type: 'auto'
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