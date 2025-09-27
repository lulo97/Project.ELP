# Stage 1: Build frontend
FROM node:20-alpine AS build

# Set workdir
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed to build frontend)
RUN npm install

# Copy everything
COPY . .

# Build frontend
RUN cd frontend && npm install && npm run build

# Stage 2: Run backend
FROM node:20-alpine

WORKDIR /app

# Set PORT for runtime
ENV PORT=3001
ENV TTS_HOST=http://host.docker.internal:5000
ENV STT_HOST=http://host.docker.internal:3003
ENV GRAMMAR_HOST=http://host.docker.internal:3002/v2/check

# Copy only necessary files
COPY package*.json ./
# Install only production dependencies
RUN npm install --omit=dev

# Copy backend code
COPY app.js .
COPY database ./database
COPY frontend ./frontend
COPY middleware ./middleware
COPY routes ./routes
COPY utils ./utils

# Copy frontend build
COPY --from=build /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 3001

# Run the app
CMD ["node", "app.js"]
