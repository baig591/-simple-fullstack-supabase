FROM node:22-alpine

RUN apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Runtime ko npm ki zaroorat nahi: bundled npm packages ki CVEs bhi khatam
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

USER node

EXPOSE 5000

CMD ["node", "src/index.js"]
