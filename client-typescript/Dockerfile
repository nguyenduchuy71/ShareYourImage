# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose port for Vite development server
EXPOSE 3000

# Command to run Vite development server with auto-reload
CMD ["npm", "run", "dev"]
