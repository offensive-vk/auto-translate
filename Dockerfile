# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the necessary files to the container
COPY package*.json ./
COPY index.js ./
COPY action.yml ./
COPY readme.md ./

# Install the required dependencies
RUN pnpm install

# Build the Project
RUN pnpm run build

# Set the default command to run the action
CMD ["node", "dist/index.js"]
