docker build -t kscic-client:dev .
docker run -it -p 8080:8080 --rm --name kscic-client kscic-client:dev
