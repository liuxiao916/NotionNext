describe('public blog runtime cache defaults', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv, NODE_ENV: 'production', VERCEL_ENV: 'production' }
    delete process.env.npm_lifecycle_event
    delete process.env.ENABLE_CACHE
    delete process.env.NEXT_PUBLIC_REVALIDATE_SECOND
    jest.resetModules()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it('enables data cache outside the build lifecycle in production', () => {
    expect(require('../../conf/dev.config').ENABLE_CACHE).toBe(true)
  })

  it('preserves an explicit cache opt-out', () => {
    process.env.ENABLE_CACHE = 'false'
    expect(require('../../conf/dev.config').ENABLE_CACHE).toBe('false')
  })

  it('defaults page revalidation to ten minutes', () => {
    expect(require('../../blog.config').NEXT_REVALIDATE_SECOND).toBe(600)
  })

  it('preserves a custom page revalidation interval', () => {
    process.env.NEXT_PUBLIC_REVALIDATE_SECOND = '1800'
    expect(require('../../blog.config').NEXT_REVALIDATE_SECOND).toBe('1800')
  })
})
