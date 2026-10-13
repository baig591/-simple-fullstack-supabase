FROM node:22-alpine

RUN apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 5000

CMD ["node", "src/index.js"]
