FROM maven:3.9.9-amazoncoretto-21-al2023 AS builder

WORKDIR /home/app
COPY pom.xml .
COPY src ./src
RUN mvn package

FROM openjdk:21-slim
COPY --from=builder /home/app/target/your-artifact.jar /app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]
