
const postToGemini = async (base64String: any, mimeType: any) => {

        const apiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual Gemini API key
        const endpoint = 'https://api.gemini.com/v1/process-image'; // Replace with the actual Gemini endpoint
      
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              image: {
                data: base64String,
                mime_type: mimeType,
              },
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
      
          const result = await response.json();
          console.log('Processed Image Result:', result);
          return result;
      
        } catch (error) {
          console.error('Failed to process image:', error);
          throw error;
        }
      
}