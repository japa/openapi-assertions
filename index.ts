/*
 * @japa/assert
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { PluginFn } from '@japa/runner/types'
import { TestContext } from '@japa/runner/core'

import { OpenApiAssertions } from './src/openapi_assertions.js'
import type { PluginConfig } from './src/types.js'

declare module '@japa/runner/core' {
  interface TestContext {
    openapi: OpenApiAssertions
  }
}

/**
 * Plugin for "@japa/runner"
 */
export function openapi(options: PluginConfig): PluginFn {
  OpenApiAssertions.registerSpecs(options.schemas, {
    exportCoverage: options.exportCoverage,
    reportCoverage: options.reportCoverage,
  })

  return function () {
    TestContext.getter('openapi', () => new OpenApiAssertions(), true)
  }
}

export { OpenApiAssertions }
