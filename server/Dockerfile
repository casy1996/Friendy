FROM maven:3.9.9-openjdk-17 AS build
WORKDIR /app
COPY server/pom.xml server/
COPY server/src server/src
RUN mvn -f server/pom.xml clean package -DskipTests

FROM openjdk:17-jdk
WORKDIR /app
COPY --from=build /app/server/target/friendy-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 5500
ENTRYPOINT ["java", "-jar", "app.jar"]
