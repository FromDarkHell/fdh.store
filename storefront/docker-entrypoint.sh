#!/bin/sh

set -e

# Main execution
main() {
    echo "🚀 Starting Medusa frontend build..."
    npm run build
    echo "🎉 Building complete! Starting Medusa frontend..."
    
    # Execute the main command
    exec "$@"
}

# Run main function
main "$@"