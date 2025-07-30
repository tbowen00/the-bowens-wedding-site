// CRITICAL: This path must be correct. It goes up one level from 'functions'
// and then down into 'utils'.
const cloudinary = require('../utils/cloudinary');

exports.handler = async () => {
  try {
    const result = await cloudinary.search
      .expression('tags=bowens_wedding_2025') // Make sure this tag is correct!
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    // Updated to send an object with a unique ID for React keys
    const images = result.resources.map(resource => ({
      url: resource.secure_url,
      id: resource.public_id
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images }), // The key is now 'images'
    };
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch images' }),
    };
  }
};