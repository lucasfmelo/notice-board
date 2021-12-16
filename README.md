# Projeto Mural de Avisos CERN

## Tech Stack

* Java 11
* SprintBoot 2.5.4
* Angular 13.1.1
* Node 14.17.6
* Npm 6.14.15
* H2 1.4.200

## Geração da build do Backend

```
cd backend
.\mvnw.cmd clean package
```

## Geração da build do Frontend

```
cd ../frontend
npm install
npm run build
```

## Executando o Backend

```
cd backend
java -jar .\target\noticeboard.jar
```

## Executando o Frontend

```
cd ../frontend
ng serve
```
