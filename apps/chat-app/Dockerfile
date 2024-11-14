FROM node:lts AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install

COPY apps/chat-app apps/chat-app
COPY libs libs

RUN cd apps/chat-app && npm install

RUN npm run build


FROM node:lts AS production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/chat-app/main.js" ]