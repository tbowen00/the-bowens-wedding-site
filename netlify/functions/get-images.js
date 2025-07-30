// netlify/functions/get-images.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

exports.handler = async () => {
  try {
    // Search for all resources with our specific tag
    const result = await cloudinary.search
      .expression('tags=bowens_wedding_2025')
      .sort_by('created_at', 'desc') // Show newest images first
      .max_results(100) // Get up to 100 images
      .execute();

    // Extract just the secure URLs from the results
    const urls = result.resources.map(resource => resource.secure_url);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls }),
    };
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch images' }),
    };
  }
};