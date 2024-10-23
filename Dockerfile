# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Setup Node and pnpm
RUN npm i -g pnpm@9.0.0

# Copy the necessary files to the container
COPY package*.json ./

# Install the required dependencies
RUN pnpm install

# Copy the rest files
COPY . .

# Build the Project
RUN pnpm run build

# Set the default command to run the action
CMD ["node", "dist/index.js"]
