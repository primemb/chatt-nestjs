FROM node:lts AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY apps/websocket apps/websocket
COPY libs libs

RUN npm run build websocket

FROM node:lts AS production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/websocket/main.js" ]