FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install netcat for health checking
RUN apk add --no-cache netcat-openbsd

# Copy package.json and package-lock.json from storefront directory
COPY package*.json ./

COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000 || exit 1

# Start the application
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "run", "start"]