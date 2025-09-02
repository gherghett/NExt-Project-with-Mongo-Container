FROM mongo:8

# Copy replica set init script into Mongo's entrypoint init folder
COPY rs-init.js /docker-entrypoint-initdb.d/rs-init.js
