FROM node:12

RUN mkdir /home/volume/

COPY package*.json ./
RUN npm install
COPY dist ./
COPY frontend/build ./app

ENV DB_FOLDER=/home/volume

CMD ["npm", "run-script", "serve"]