FROM eclipse-temurin:21-jdk AS build

ARG DB_HOST
ARG DB_USER
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_NAME

WORKDIR /app

COPY mvnw .
COPY .mvn/ .mvn
COPY pom.xml .
RUN chmod +x mvnw
COPY src ./src
RUN ./mvnw install

FROM eclipse-temurin:21-jre AS runtime

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
