docker build -t rodrigo-portifolio:latest .
docker run --rm -d -p 8080:80 --name rodrigo-portifolio rodrigo-portifolio:latest
