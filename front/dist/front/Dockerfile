FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx-angular.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "reload", "-s;"]
ENTRYPOINT ["nginx", "-g", "daemon off;"]