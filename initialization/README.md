For DOCKER image:

cd into initialization folder
run docker build -t frontend_db .

When it has completed you can run:

docker run -d --name frontend_db_instance -p 27017:27017 frontend_db

in MongoDB Compass:

access the server through:

mongodb://admin:P@ssw0rd1@localhost:27017/admin