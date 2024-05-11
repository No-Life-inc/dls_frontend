import { HttpMethod, CreateStoryDTO } from "../types/types";

export async function apiRequest(
  apiType: "write" | "auth",
  endpoint: string,
  method: HttpMethod,
  body: any,
  token: string | null = null
) {
  try {
    const headers: { [key: string]: string } = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // If the body is an instance of FormData, don't set the 'Content-Type' header
    // The browser will set it automatically, including the necessary multipart boundary
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }

    const apiUrl =
      apiType === "write"
        ? process.env.REACT_APP_WRITEAPIURL
        : process.env.REACT_APP_AUTHURL;

    const response = await fetch(apiUrl + endpoint, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Only attempt to parse the response body as JSON if there is a response body
    let data = null;
    if (response.status !== 204) {
      data = await response.json();
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function submitStory(
  newStory: CreateStoryDTO,
  token: string | null = null 
) {
  try {
    console.log("story", newStory);

    const data = await apiRequest(
      "write",
      "/stories",
      HttpMethod.POST,
      newStory,
      token
    );

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function updateStory(
  storyGuid: string,
  bodyText: string,
  imgUrl: string,
  token: string | null = null
) {
  try {
    const data = await apiRequest(
      "write",
      `/stories/${storyGuid}`,
      HttpMethod.PUT,
      {
        storyGuid: storyGuid,
        storyInfo: {
          bodyText,
          imgUrl,
        },
      },
      token
    );
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteStory(
  storyGuid: string,
  token: string | null = null
) {
  try {
    const data = await apiRequest(
      "write",
      `/stories/${storyGuid}`,
      HttpMethod.DELETE,
      {},
      token
    );
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function deleteComment(
  commentGuid: string,
  token: string | null = null
) {
  try {
    const data = await apiRequest(
      "write",
      `/comments/${commentGuid}`,
      HttpMethod.DELETE,
      {},
      token
    );
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function updateComment(
  commentGuid: string,
  body: { commentInfo: { bodyText: string } },
  token: string | null = null
) {
  try {
    const data = await apiRequest(
      "write",
      `/comments/${commentGuid}`,
      HttpMethod.PUT,
      body,
      token
    ); // Call apiRequest with 'PUT' method and provide body
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
