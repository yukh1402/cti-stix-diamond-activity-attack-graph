FROM node:lts-alpine as build-stage
RUN npm install -g parcel
WORKDIR /app
COPY . .
RUN parcel build index.html

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

