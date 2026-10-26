# expressjs-boilerplate

## Files and directories structure

```zsh
.
├── biome.json
├── branch-name-lint.config.json
├── commitlint.config.ts
├── docker-compose.yml
├── Dockerfile
├── knip.config.ts
├── LICENSE
├── lint-staged.config.ts
├── package-lock.json
├── package.json
├── prisma.config.ts
├── README.md
├── src
│   ├── app.ts
│   ├── config
│   │   ├── config.ts
│   │   └── swagger.ts
│   ├── controllers
│   │   └── task.controller.ts
│   ├── db
│   │   └── db.ts
│   ├── middlewares
│   │   ├── error.middleware.ts
│   │   ├── logger.middleware.ts
│   │   ├── not-found.middleware.ts
│   │   ├── request-id.middleware.ts
│   │   └── validation.middleware.ts
│   ├── prisma
│   │   ├── generated
│   │   │   ├── browser.ts
│   │   │   ├── client.ts
│   │   │   ├── commonInputTypes.ts
│   │   │   ├── enums.ts
│   │   │   ├── internal
│   │   │   │   ├── class.ts
│   │   │   │   ├── prismaNamespace.ts
│   │   │   │   └── prismaNamespaceBrowser.ts
│   │   │   ├── models
│   │   │   │   ├── Tag.ts
│   │   │   │   └── Task.ts
│   │   │   └── models.ts
│   │   ├── migrations
│   │   │   ├── 20261008163234_added_task_and_tag_models
│   │   │   │   └── migration.sql
│   │   │   ├── 20261013232753_delete_tasktag_model
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   ├── models
│   │   │   ├── tags.prisma
│   │   │   └── tasks.prisma
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── repositories
│   │   └── task.repository.ts
│   ├── routes
│   │   └── task.route.ts
│   ├── schemas
│   │   └── task.schema.ts
│   ├── server.ts
│   ├── services
│   │   └── task.service.ts
│   └── utils
│       └── errors.util.ts
├── tsconfig.build.json
└── tsconfig.json
```

## Referenses

- <https://github.com/shariarSultanFahim/fullstack-turborepo-starter-kit>
- <https://github.com/tajbinkhan/express-authentication-boilerplate>
- <https://github.com/zoom2ashish/typescript-express-tsed-starter>
- <https://github.com/GausAlMunirTushar/nodejs-boilerplate>
- <https://github.com/tjuandev/node-joker>
- <https://github.com/stressGC/ExpressJS-TypeScript-Starter-Kit>
- <https://github.com/hagopj13/node-express-boilerplate>
- <https://github.com/danielfsousa/express-rest-boilerplate>
- <https://github.com/madhums/node-express-mongoose>
- <https://github.com/maitraysuthar/rest-api-nodejs-mongodb>
- <https://github.com/kunalkapadia/express-mongoose-es6-rest-api>
- <https://docs.webdock.io/how-guides/javascript-guides/nodejs-boilerplate-typescript-express-prisma/>
- <https://www.mdfaisal.com/blog/create-express-typescript-boilerplate>
- <https://github.com/bhavyajshah/nodejs-expressjs-boilerplate>
