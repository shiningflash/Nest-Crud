<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Nest CRUD Demo

## Description

### Medicine
- Create: `POST` - `{base_url}/medicine`
- Retrieve List: `GET` - `{base_url}/medicine?brand=`

- Retrieve Medicine: `GET` - `{base_url}/medicine/{id}`
- Update Medicine: `PATCH` - `{base_url}/medicine/{id}`
- Delete Medicine: `DELETE` - `{base_url}/medicine/{id}`

### Product
- Create: `POST` - `{base_url}/products`
- Retrieve List: `GET` - `{base_url}/products`

- Retrieve Product: `GET` - `{base_url}/products/{id}`
- Update Product: `PATCH` - `{base_url}/products/{id}`
- Delete Product: `DELETE` - `{base_url}/products/{id}`

## Technology

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Command

```bash
# install mongodb package
$ npm install --save mongoose @nestjs/mongoose
# install types mongoose package
$ npm install --save-dev @types/mongoose
```

## Database

#### MongoDB

1. Open a free account at [mongodb from here](https://cloud.mongodb.com/). Then, create a cluster, create database, give `readWriteAnyDatabase@admin` access.
2. Whitelist your IP in Network Access.
3. Install `mongoose`, `@nestjs/mongoose`, `@types/mongoose`(for dev) packages. 
4. Connect your cluster to your application.