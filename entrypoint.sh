#!/bin/sh
set -e

# Read the contents of Swarm secret files and export as environment variables
if [ -f /run/secrets/millinks_api_client_id ]; then
  export API_CLIENT_ID=$(cat /run/secrets/millinks_api_client_id)
fi

if [ -f /run/secrets/millinks_api_client_secret ]; then
  export API_CLIENT_SECRET=$(cat /run/secrets/millinks_api_client_secret)
fi

# Execute the main container command (e.g., node server.js)
exec "$@"
