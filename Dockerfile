FROM node:20-slim

WORKDIR /app

# Set PORT for runtime
ENV PORT=3001
ENV TTS_HOST=http://host.docker.internal:5000
ENV STT_HOST=http://host.docker.internal:3003
ENV REDIS_HOST=redis://host.docker.internal:6379
ENV AI_HOST=http://host.docker.internal:3004
ENV YOUTUBE_HOST=http://host.docker.internal:3005
ENV POSTGRESQL_HOST=host.docker.internal
ENV POSTGRESQL_PORT=5432

COPY dist ./dist

EXPOSE 3001

CMD ["node", "dist/app.js"]
