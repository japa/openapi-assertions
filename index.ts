/*
 * @japa/openapi-assertions
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import type { PluginFn } from '@japa/runner/types'

import { OpenApiAssertions } from './src/openapi_assertions.js'
import type { OpenApiAssertionsContract, PluginConfig } from './src/types.js'
import { Assert } from '@japa/assert'

declare module '@japa/assert' {
  export interface Assert {
    isValidApiResponse: OpenApiAssertionsContract['isValidResponse']
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
    Assert.macro('isValidApiResponse', (response) =>
      new OpenApiAssertions().isValidResponse(response)
    )
  }
}

export { OpenApiAssertions }
