###### Levantar un contendor en docker
`docker-compose up -d postgres`

###### bajar un contendor en docker
`docker-compose down`

###### ver qué esta corriendo dentro del contenedor
`docker-compose ps`

###### conectandonos al contendor y la base de datos de postgres
`docker-compose exec postgres bash`

###### conectandonos a la base de datos
`psql -h localhost -d my_store -U fer`

para salirnos de la base de datos : ` \q`
para salirnos del contenedor: ` exit`


###### Levantar PGADMIN
`docker-compose up -d pgadmin`

para inspeccionar todo : `docker ps`
nos entrega un id y eso lo utilizamos : `docker inspect 046c9fbb41db`


###### create table in pgadmin

CREATE TABLE tasks(
  id serial PRIMARY KEY,
  title VARCHAR (255) NOT NULL,
  completed boolean DEFAULT false
);

###### integración de node-postgres
