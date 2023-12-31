FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

CMD npx prisma migrate dev && node dist/main.js

