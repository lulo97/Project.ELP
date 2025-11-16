FROM node:20-slim

WORKDIR /app

COPY dist ./dist

EXPOSE 3001

CMD ["node", "dist/app.js"]
