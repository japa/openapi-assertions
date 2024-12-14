# @japa/openapi-assertions

<br />

[![gh-workflow-image]][gh-workflow-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

## Introduction

This package contains the OpenAPI Assertion tests that used to be included in `@japa/assert`

## Installation

Install the package from the npm registry as follows:

```sh
npm i @japa/openapi-assertions

yarn add @japa/openapi-assertions
```

## Official Documentation

You can use the assertion package with the `@japa/runner` as follows, registering an OpenAPI Schema:

```ts
import { openapi } from '@japa/openapi-assertions'

configure({
  plugins: [
    openapi({
      schemas: [new URL('../api-spec.json', import.meta.url)],
    }),
  ],
})
```

In tests you can validate API responses as follows:

```ts
test('get users', ({ assert }) => {
  const response = await supertest(baseUrl).get('/users')
  assert.isValidApiResponse(response)
})
```

## Contributing

One of the primary goals of japa is to have a vibrant community of users and contributors who believes in the principles of the framework.

We encourage you to read the [contribution guide](https://github.com/japa/.github/blob/main/docs/CONTRIBUTING.md) before contributing to the framework.

## Code of Conduct

In order to ensure that the japa community is welcoming to all, please review and abide by the [Code of Conduct](https://github.com/japa/.github/blob/main/docs/CODE_OF_CONDUCT.md).

## License

@japa/openapi-assertions is open-sourced software licensed under the [MIT license](LICENSE.md).

[gh-workflow-image]: https://img.shields.io/github/actions/workflow/status/japa/openapi-assertions/checks.yml?style=for-the-badge
[gh-workflow-url]: https://github.com/japa/openapi-assertions/actions/workflows/checks.yml 'Github action'
[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]: "typescript"
[npm-image]: https://img.shields.io/npm/v/@japa/openapi-assertions.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@japa/openapi-assertions 'npm'
[license-image]: https://img.shields.io/npm/l/@japa/openapi-assertions?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md 'license'
