FROM node:latest

WORKDIR /app

COPY ./package.json ./

RUN npm install --cpu=arm64 --os=darwin sharp
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]