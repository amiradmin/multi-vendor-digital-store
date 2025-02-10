# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the frontend port
EXPOSE 3000

# Run Next.js application
CMD ["npm", "run", "dev"]
