
# dls_frontend

## Contributors

- Morten Bendeke
- Betül Iskender
- Yelong Hartl-He
- Zack Ottesen

## General Use
This is the Frontend application of our project.<br>
It is built using ReactJS, we utilize a CQRS pattern in terms of updating data and retrieving data for displaying.<br>
The repo is divided into folders with the respective responsibilities within the src folder:
- Components: Contains the individual components that the app uses.
- Grahpql: Contains the queries and related Graphql code that is needed.
- Types: Contains types that represent the entities that are pulled or modified to the databases.

## Environment Variables
Create a .env in the root folder.

- REACT_APP_GRAPHQLURL=http://localhost:4000/graphql
- REACT_APP_WRITEAPIURL=http://localhost:3000
- REACT_APP_AUTHURL=http://localhost:5012/v1
- REACT_APP_CDNURL=http://localhost:9000/images/
- PORT=8080


## How To Run
Make sure the environment variables are set.<br>
Run npm i to install dependencies.<br>
Lastly, use the following command:

```bash
npm start
```

## Dependencies
Dependencies are documented in the package.json file located in the root folder.
