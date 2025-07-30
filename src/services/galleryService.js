// A centralized service for interacting with the gallery (Cloudinary via Netlify Functions).

export const getImages = async () => {
    try {
      const response = await fetch('/.netlify/functions/get-images');
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
      const data = await response.json();
      // The body now contains an 'images' array with objects, not just URLs.
      return data.images || []; 
    } catch (error) {
      console.error("Error loading gallery images:", error);
      return []; // Return an empty array on failure
    }
  };
  
  export const uploadImage = async (base64File) => {
    try {
      const response = await fetch('/.netlify/functions/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: base64File }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed.');
      }
      
      const data = await response.json();
      return { success: true, url: data.secure_url };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };