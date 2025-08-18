FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install netcat for health checking
RUN apk add --no-cache netcat-openbsd

# Copy package.json and package-lock.json from storefront directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000 || exit 1

# Start the application
CMD ["npm", "run", "dev"]