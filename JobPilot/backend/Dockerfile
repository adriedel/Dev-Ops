FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm config set strict-ssl false && npm install --omit=dev

COPY . .

ENV NODE_ENV=production
EXPOSE 3001

CMD ["sh", "-c", "npm run migrate && npm start"]
