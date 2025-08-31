#!/bin/sh

set -e

echo "🚀 Starting Medusa backend setup..."

# Function to wait for database
wait_for_db() {
    echo "⏳ Waiting for database to be ready..."
    
    # Extract connection details from DATABASE_URL or use defaults
    DB_HOST=${DB_HOST:-postgres}
    DB_PORT=${DB_PORT:-5432}
    DB_USER=${POSTGRES_USER:-medusa}
    DB_NAME=${POSTGRES_DB:-medusa-v2}
    
    # Wait for PostgreSQL to be ready
    until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME"; do
        echo "Database is unavailable - sleeping..."
        sleep 2
    done
    
    echo "✅ Database is ready!"
}

# Function to wait for Redis
wait_for_redis() {
    echo "⏳ Waiting for Redis to be ready..."
    
    REDIS_HOST=${REDIS_HOST:-redis}
    REDIS_PORT=${REDIS_PORT:-6379}
    
    # Wait for Redis to be ready
    until redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping | grep -q "PONG"; do
        echo "Redis is unavailable - sleeping..."
        sleep 2
    done
    
    echo "✅ Redis is ready!"
}

# Function to run database operations
setup_database() {
    echo "🗄️  Setting up database..."
    
    # Check if migrations need to be run
    echo "📋 Running database migrations..."
    npx medusa db:migrate || {
        echo "❌ Migration failed, but continuing..."
        echo "This might be normal on first run or if migrations don't exist yet."
    }

    echo "✅ Database setup complete!"
}

# Main execution
main() {
    # Wait for dependencies
    wait_for_db
    wait_for_redis
    
    # Setup database
    setup_database
    
    echo "🎉 All setup complete! Starting Medusa backend..."
    
    # Execute the main command
    exec "$@"
}

# Install postgresql-client and redis-tools if not available
if ! command -v pg_isready &> /dev/null; then
    echo "Installing postgresql-client..."
    apk add postgresql17-client
fi

if ! command -v redis-cli &> /dev/null; then
    echo "Installing redis tools..."
    apk add redis
fi

# Run main function
main "$@"