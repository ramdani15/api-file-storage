# Use a Node.js Alpine base image
FROM node:16.10-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]