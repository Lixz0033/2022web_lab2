FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx-angular.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["nginx", "reload", "-s;"]