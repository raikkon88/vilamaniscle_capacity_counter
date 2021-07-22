FROM node:12

RUN mkdir /home/volume/

COPY package*.json ./
RUN npm install
COPY dist ./
COPY build ./build
# COPY environment ./environment
# COPY https/$ENVIRONMENT ./https

CMD ["npm", "run-script", "serve"]