# # Install the base requirements for the app.
# # This stage is to support development.
# FROM python:alpine AS base
# WORKDIR /app
# COPY requirements.txt .
# RUN pip install -r requirements.txt

FROM node:16-alpine AS app-base
ENV APP_HOME=/apps/atoll
WORKDIR ${APP_HOME}

# Copy package.json specific to deployment
COPY build/deploy-package.json ./package.json

# Copy server files
COPY build/server ./build/server

# Copy client static files to client & server folders
COPY build/client/static ./build/client/static
COPY build/client/static ./build/server/static
RUN rm -f ./build/client/static/*.js.map
RUN rm -f ./build/server/static/*.js.map
RUN rm -f ./build/client/static/*.LICENSE.txt 
RUN rm -f ./build/server/static/*.LICENSE.txt 

RUN npm i

EXPOSE 8500

CMD ["node", "build/server/server.js"]
