# Instruccion para crear una imagen de esta aplicacion
# Linux alpine 3.19 con node 21
FROM node:21-alpine3.19
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# Copio los archivos que no estan en especificados en el docker ignore
COPY . .
#Publicamos el puerto 3001
RUN apk update
RUN apk add busybox-extras
RUN apk add nmap
EXPOSE 3001