# For build
FROM node:21.7.1 as builder

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG VITE_ANYTORE_BACKEND_SERVER
ENV VITE_ANYTORE_BACKEND_SERVER=${VITE_ANYTORE_BACKEND_SERVER}

RUN npm run build


# For release
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./platform/local/nginx.conf /etc/nginx/conf.d/default.conf

ENV NODE_ENV=production

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]