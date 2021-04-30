# Stage 1 node set up
FROM node:14 AS builder

COPY . /app

WORKDIR /app
RUN npm install && npm run build

ENTRYPOINT ["npm", "run", "dev"]
# Stage 2 project in nginx
#FROM nginx:alpine AS production-build
#COPY --from=builder /app/dist /usr/share/nginx/html
#EXPOSE 80
