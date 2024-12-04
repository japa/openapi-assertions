/*
 * @japa/openapi-assertions
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { dirname, resolve } from 'node:path'
import { OpenApiAssertions } from '../src/openapi_assertions.js'
import { expectError } from '../tests_helpers/index.js'
import { fileURLToPath } from 'node:url'

test.group('When OpenApi is not configured', () => {
  test('fails when assertions are called', () => {
    const openApi = new OpenApiAssertions()

    expectError(() => {
      openApi.isValidResponse({
        path: '/v2/pet/1',
        method: 'get',
        status: 200,
        body: {},
        headers: {},
      })
    }, 'Cannot validate responses without defining api schemas')
  })
})

test.group('When OpenApi is configured with string schema path', (group) => {
  group.setup(() => {
    const directory = dirname(fileURLToPath(import.meta.url))
    const schemaPath = resolve(directory, './fixtures/api-spec.json')

    OpenApiAssertions.registerSpecs([schemaPath])
  })

  test('pass when response confirms to the api spec', () => {
    const openApi = new OpenApiAssertions()

    openApi.isValidResponse({
      path: '/v2/pet/1',
      method: 'get',
      status: 200,
      body: {
        name: 'Pet 1',
        photoUrls: ['/a', 'b'],
      },
      headers: {},
    })
  })
})

test.group('When OpenApi is configured', (group) => {
  group.setup(() => {
    OpenApiAssertions.registerSpecs([new URL('./fixtures/api-spec.json', import.meta.url)])
  })

  test('pass when response confirms to the api spec', () => {
    const openApi = new OpenApiAssertions()

    openApi.isValidResponse({
      path: '/v2/pet/1',
      method: 'get',
      status: 200,
      body: {
        name: 'Pet 1',
        photoUrls: ['/a', 'b'],
      },
      headers: {},
    })
  })

  test('fail when response does not confirms to the api spec', () => {
    const openApi = new OpenApiAssertions()

    expectError(() => {
      openApi.isValidResponse({
        path: '/v2/pet/1',
        method: 'get',
        status: 200,
        body: {},
        headers: {},
      })
    }, 'expected response to match API schema')
  })

  test('validate error messages response', () => {
    const openApi = new OpenApiAssertions()

    openApi.isValidResponse({
      path: '/v2/pet/1',
      method: 'get',
      status: 400,
      body: {
        message: 'Invalid id',
      },
      headers: {},
    })
  })

  test('fail when response status code is not in the spec', () => {
    const openApi = new OpenApiAssertions()

    expectError(() => {
      openApi.isValidResponse({
        path: '/v2/pet/1',
        method: 'get',
        status: 401,
        body: {},
        headers: {},
      })
    }, 'schema not found for {"path":"/v2/pet/1","method":"get","status":401}')
  })

  test('fail when endpoint is not in the spec', () => {
    const openApi = new OpenApiAssertions()

    expectError(() => {
      openApi.isValidResponse({
        path: '/v2/pets/1',
        method: 'get',
        status: 200,
        body: {},
        headers: {},
      })
    }, 'schema not found for {"path":"/v2/pets/1","method":"get","status":200}')
  })

  test('fail when response headers mis-match', () => {
    const openApi = new OpenApiAssertions()

    expectError(() => {
      openApi.isValidResponse({
        path: '/v2/user/login',
        method: 'get',
        status: 200,
        body: 'dads',
        headers: {
          'x-rate-limit': 'abc',
        },
      })
    }, 'expected response to match API schema')
  })
})
