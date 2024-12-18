/*
 * @japa/openapi-assertions
 *
 * (c) Japa.dev
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export type OpenApiAssertionsContract = {
  isValidResponse: (response: any) => Chai.Assertion
}

export type PluginConfig = {
  schemas: (string | URL)[]
  reportCoverage?: boolean
  exportCoverage?: boolean
}
