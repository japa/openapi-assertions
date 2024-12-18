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
import { wrapAssertions } from '../tests_helpers/index.js'

test.group('Plugin', () => {
  test('add isValidApiResponse method to assert', async () => {
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
    wrapAssertions(() => {
      chaiAssert.isDefined(getContext(testInstance).assert.isValidApiResponse)
      chaiAssert.isFunction(getContext(testInstance).assert.isValidApiResponse)
      chaiAssert.strictEqual(getContext(testInstance).assert.isValidApiResponse.length, 1)
    })
  })
})
