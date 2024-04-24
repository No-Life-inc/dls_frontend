export async function apiRequest(endpoint: string, method: string, body: any, token: string | null = null) {
    try {
      const headers: { [key: string]: string } = {
        'Content-Type': 'application/json',
      };
  
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const response = await fetch(process.env.REACT_APP_WRITEAPIURL + endpoint, {
        method,
        headers,
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  export async function updateStory(storyId: string, bodyText: string, imgUrl: string, token: string | null = null) {
    try {
      const data = await apiRequest(`/stories/${storyId}`, 'PUT', {
        id: storyId,
        bodyText,
        imgUrl,
      }, token );
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }