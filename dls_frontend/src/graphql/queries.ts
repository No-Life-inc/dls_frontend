import { getAllStoriesQuery } from "./constants";
import { request } from "graphql-request";
import { Story } from "../types/types";

// This function is used to get all stories from the database
export const getAllStories = async (): Promise<Story[]> => {
    try {
        //run our query
        const { getAllStories }: { getAllStories: Story[] } = await request("http://localhost:4000/graphql", getAllStoriesQuery);
        return getAllStories;
    } catch (error) {
        console.error(error);
        return [];
    }
};