FROM openjdk:17-jdk
WORKDIR /app
COPY server/target/friendy-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5500
ENTRYPOINT ["java", "-jar", "app.jar"]