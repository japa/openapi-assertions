/*
 * @japa/openapi-assertions
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Assert } from '@japa/assert'
import type { PluginFn } from '@japa/runner/types'
import type { PluginConfig } from './src/types.js'
import { OpenApiAssertions } from './src/openapi_assertions.js'

declare module '@japa/assert' {
  export interface Assert {
    isValidApiResponse: (response: any) => void
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
