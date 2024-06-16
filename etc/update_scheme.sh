API_URL=https://api.staging.online.brunoyam.com/portal/api
EVENTS_SCHEMA_URL=https://api.staging.online.brunoyam.com/portal/ws/events/schema

curl -L "${API_URL}/schema/json/" -o ./src/api/openapi.json
npx swagger-typescript-api -p ./src/api/openapi.json -o ./src/api -n index -t ./src/api/templates/

curl -L "${API_URL}/lesson/schema/" -o ./src/api/lesson-content/schema.json
npx json2ts ./src/api/lesson-content/schema.json > ./src/api/lesson-content/lessonContentType.ts

curl -L "${EVENTS_SCHEMA_URL}" -o ./src/api/websockets-events/schema.json
npx json2ts ./src/api/websockets-events/schema.json > ./src/api/websockets-events/websocketsEvents.ts
