FROM node:20-slim

WORKDIR /app

COPY dist ./dist
COPY app.js ./

EXPOSE 3100

CMD ["node", "app.js"]
