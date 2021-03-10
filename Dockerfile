# Stage 1 node set up
FROM node:14 AS builder

COPY . /app

WORKDIR /app
RUN npm install && npm run build

# Stage 2 run angular project in nginx
FROM nginx:alpine AS production-build
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
