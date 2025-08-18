FROM node:20-alpine

# Set working directory
WORKDIR /app

RUN apk add curl

# Install dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

# Copy application code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Build the application
RUN npm run build
RUN npx medusa build

WORKDIR /app/.medusa/server/


# Expose port
EXPOSE 9000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:9000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => { process.exit(1) })"

# Run our startup/entrypoint script for initializing the database / migrations / etc
ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["npm", "run", "start"]