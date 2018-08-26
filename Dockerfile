FROM nginx:latest

# File Author / Maintainer
LABEL authors="Alexandru Florian Barascu <alex.florin2352@gmail.com>"
MAINTAINER alex.florin2352@gmail.com

ENV PORT=5170

WORKDIR /usr/share/nginx/html

COPY ./dist/employee-management-client /usr/share/nginx/html
COPY ./config/compression.conf /etc/nginx/conf.d/compression.conf
COPY ./config/nginx.conf /etc/nginx/nginx.conf

EXPOSE $PORT

ENTRYPOINT ["nginx", "-g", "daemon off;"]
