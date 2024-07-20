FROM node:20.15.1-alpine3.19
WORKDIR /app
COPY . .
RUN npm ci && npm run build && npm cache clean --force
CMD ["node", "./dist/index.js"]
