FROM maven:3.8.5-openjdk-21 AS builder

WORKDIR /home/app
COPY pom.xml .
COPY src ./src
RUN mvn package -DskipTests

FROM openjdk:21-slim
COPY --from=builder /home/app/target/your-artifact.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
