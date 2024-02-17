import { getAllPeopleQuery } from "./constants";
import { request } from "graphql-request";

// This function is used to get all people from the database
export const getAllPeople = async () => {
    try {
        //run our query
        const data = await request("http://localhost:4000/graphql", getAllPeopleQuery);
        return data;
    } catch (error) {
        console.error(error);
    }
    };