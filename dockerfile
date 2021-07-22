FROM node:12

RUN mkdir /home/volume/

COPY package*.json ./
RUN npm install
COPY dist ./
COPY frontend/build ./app

ENV DB_FOLDER=/home/volume
ENV APP_MAX_CAPACITY=150

CMD ["npm", "run-script", "serve"]