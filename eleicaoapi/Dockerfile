FROM openjdk:8-jdk-alpine
VOLUME /tmp
EXPOSE 8080
ADD build/libs/eleicaoapi-0.0.1-SNAPSHOT.jar eleicaoapi.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/eleicaoapi.jar"]