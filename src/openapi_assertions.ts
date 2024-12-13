/*
 * @japa/openapi-assertions
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expect, use } from 'chai'
import { fileURLToPath } from 'node:url'
import Macroable from '@poppinss/macroable'
import { chaiPlugin } from 'api-contract-validator'
import { OpenApiAssertionsContract } from './types.js'

/**
 *
 */
export class OpenApiAssertions extends Macroable implements OpenApiAssertionsContract {
  protected static hasInstalledApiValidator = false

  /**
   * Register api specs to be used for validating responses
   */
  static registerSpecs(
    schemaPathsOrURLs: (string | URL)[],
    options?: { reportCoverage?: boolean; exportCoverage?: boolean }
  ) {
    this.hasInstalledApiValidator = true
    const paths = schemaPathsOrURLs.map((schemaPathsOrURL) => {
      return schemaPathsOrURL instanceof URL ? fileURLToPath(schemaPathsOrURL) : schemaPathsOrURL
    })

    use(chaiPlugin({ apiDefinitionsPath: paths, ...options }))
  }

  /**
   * Assert the response confirms to open API spec
   */
  isValidResponse(response: any) {
    // @ts-ignore
    if (!this.constructor['hasInstalledApiValidator']) {
      throw new Error('Cannot validate responses without defining api schemas')
    }

    return expect(response).to.matchApiSchema()
  }
}
