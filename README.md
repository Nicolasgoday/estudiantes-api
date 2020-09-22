# Skeleton project for Swagger


docker build -t estudiantes-api .

docker run -p 8080:8080 -d estudiantes-api

Mysql

docker-compose -f mysql.yml up -d