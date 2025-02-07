import axios from 'axios';

export const postToGemini = async (base64String: any, mimeType: any) => {
  const apiKey = 'AIzaSyDLsJV8JqW3wI2NBWGxQeAo_r6SXnujfzg'; 
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey; // Replace with the actual Gemini endpoint

  try {
    const response = await axios.post(endpoint, {
      contents: [
        {
          parts: [
            {
              text: "Extract text from this image and return it as text"
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64String,
              }
            }
          ]
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Failed to process image:', error.response ? error.response.data : error.message);
    throw error;
  }
};
