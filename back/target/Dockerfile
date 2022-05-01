FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD target/web-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 10007
ENTRYPOINT ["java", "-jar", "/app.jar"]
