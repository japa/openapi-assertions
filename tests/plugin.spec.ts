/*
 * @japa/openapi-assertions
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { test } from '@japa/runner'
import { assert as chaiAssert } from 'chai'
import { TestContext, Test, Emitter, Refiner } from '@japa/runner/core'

import { openapi } from '../index.js'
import { OpenApiAssertions } from '../src/openapi_assertions.js'
import { wrapAssertions } from '../tests_helpers/index.js'

test.group('Plugin', () => {
  test('add openapi property to test context', async () => {
    const emitter = new Emitter()

    openapi({
      schemas: [new URL('./fixtures/api-spec.json', import.meta.url)],
    })({
      cliArgs: {},
      config: {} as any,
      emitter: emitter,
      runner: {} as any,
    })

    const refiner = new Refiner()
    const getContext = (t: Test<any>) => new TestContext(t)

    const testInstance = new Test('test 1', getContext, emitter, refiner)
    testInstance.run(async (ctx) => {
      ctx.assert.plan(1)
    })

    wrapAssertions(() => {
      chaiAssert.isDefined(getContext(testInstance)['openapi'])
      chaiAssert.instanceOf(getContext(testInstance)['openapi'], OpenApiAssertions)
    })
  })
})
