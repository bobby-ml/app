FROM nginx:1.13-alpine-perl

COPY build /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
