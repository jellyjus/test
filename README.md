# Тестовое задание
## Production  run
1. Поднимаем PG в docker контейнере
```
docker run --name postgres -d --rm \
    --env 'DB_USER=test' --env 'DB_PASS=test' \
    --env 'DB_NAME=test' \
    --env 'DB_EXTENSION=pg_trgm' \
    -p 5433:5432 \
    sameersbn/postgresql:9.6-2
```
2. Накатываем миграции
```
NODE_ENV=production npm run db:migrate
```
3. Запускаем сервер
```
NODE_ENV=production npm start
```
## Тесты
1. Поднимаем PG в docker контейнере
```
docker run --name postgres -d --rm \
    --env 'DB_USER=test' --env 'DB_PASS=test' \
    --env 'DB_NAME=test' \
    --env 'DB_EXTENSION=pg_trgm' \
    -p 5433:5432 \
    sameersbn/postgresql:9.6-2
```
2. Запускаем тесты
```
NODE_ENV=test npm run test:int
```
