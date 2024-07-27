# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally (if needed)
RUN npm install -g nodemon

# Expose port for WebSocket
EXPOSE 5000

# Command to run the WebSocket server with nodemon
CMD ["nodemon", "index.js"]
