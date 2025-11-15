FROM node:20-slim

WORKDIR /app

# Set PORT for runtime
ENV PORT=3001
ENV TTS_HOST=elp-piper-container:5000
ENV STT_HOST=elp-whisper-container:3003
ENV REDIS_HOST=redis://elp-redis-container:6379
ENV AI_HOST=elp-llama-server:3004
ENV YOUTUBE_HOST=elp-youtube-container:3005
ENV POSTGRESQL_HOST=elp-postgres_container
ENV POSTGRESQL_PORT=5432

COPY dist ./dist

EXPOSE 3001

CMD ["node", "dist/app.js"]
