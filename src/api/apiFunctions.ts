import { HttpMethod } from '../types/types';

export async function apiRequest(apiType: 'write' | 'auth', endpoint: string, method: HttpMethod, body: any, token: string | null = null) {
  try {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const apiUrl = apiType === 'write' ? process.env.REACT_APP_WRITEAPIURL : process.env.REACT_APP_AUTHURL;

    const response = await fetch(apiUrl + endpoint, {
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


  export async function updateStory(storyGuid: string, bodyText: string, imgUrl: string, token: string | null = null) {
    try {
      const data = await apiRequest( "write",`/stories/${storyGuid}`, HttpMethod.PUT, {
      storyGuid: storyGuid,
      storyInfo: {
        bodyText,
        imgUrl,
      },
      }, token );
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  export async function deleteStory(storyGuid: string, token: string | null = null) {
    try {
      const data = await apiRequest( "write",`/stories/${storyGuid}`, HttpMethod.DELETE, {}, token );
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }