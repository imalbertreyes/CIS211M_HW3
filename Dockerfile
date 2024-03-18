# Use the official Node.js image as base
FROM node:14

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to container
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install dependencies for frontend and backend
RUN cd ./backend && npm install

# Copy frontend and backend code to container
COPY frontend ./frontend
COPY backend ./backend

# Expose port 3000 for frontend
EXPOSE 3000

# Command to run the backend server
CMD ["node", "backend/server.js"]
