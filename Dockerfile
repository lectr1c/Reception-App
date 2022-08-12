FROM node:16

RUN npm i -g npm

ENV PORT 3000

EXPOSE 3000

WORKDIR /home/nextjs/app

COPY package.json .
COPY package-lock.json .

RUN npm install --no-optional

COPY . .

CMD [ "npm", "run", "dev" ]
