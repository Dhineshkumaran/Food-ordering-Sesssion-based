FROM node:alpine

# Set the working directory to the root directory.
WORKDIR /app

# Copy package.json and package-lock.json first to utilize Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["npm", "start"]
