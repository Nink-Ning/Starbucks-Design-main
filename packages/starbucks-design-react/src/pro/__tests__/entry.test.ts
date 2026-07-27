import { describe, expect, it } from 'vitest'
import * as pro from '../index'

describe('pro entry', () => {
  it('resolves as a module', () => {
    expect(pro).toBeTypeOf('object')
  })
})
