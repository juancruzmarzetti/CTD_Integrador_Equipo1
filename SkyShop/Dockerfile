FROM eclipse-temurin:21-jdk as build

WORKDIR /app

COPY pom.xml ./
RUN ./mvnw dependency:go-offline

COPY . .

RUN ./mvnw clean install

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
