import { getServerSideProps } from '@/pages/sitemap.xml'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'

jest.mock('@/blog.config', () => ({
  NOTION_PAGE_ID: 'site-id',
  NOTION_PROPERTY_NAME: { status_publish: 'Published' }
}))
jest.mock('@/lib/config', () => ({ siteConfig: (key, fallback) => fallback }))
jest.mock('@/lib/db/SiteDataApi', () => ({ fetchGlobalAllData: jest.fn() }))

function response() {
  return { setHeader: jest.fn(), write: jest.fn(), end: jest.fn() }
}

describe('public sitemap CDN caching', () => {
  it('sets shared cache headers before sending the generated XML', async () => {
    fetchGlobalAllData.mockResolvedValue({
      siteInfo: { link: 'https://example.com' },
      NOTION_CONFIG: {},
      allPages: [{ slug: 'article/hello', status: 'Published' }]
    })
    const res = response()
    await getServerSideProps({ res })

    expect(res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'public, max-age=0, s-maxage=3600, stale-while-revalidate=600'
    )
    expect(res.setHeader).toHaveBeenCalledWith(
      'Vercel-CDN-Cache-Control',
      'public, max-age=3600, stale-while-revalidate=600'
    )
    expect(res.setHeader.mock.invocationCallOrder[1]).toBeLessThan(
      res.write.mock.invocationCallOrder[0]
    )
    expect(res.write).toHaveBeenCalledWith(
      expect.stringContaining('<loc>https://example.com/article/hello</loc>')
    )
    expect(res.end).toHaveBeenCalledTimes(1)
  })

  it('does not mark a failed data fetch as publicly cacheable', async () => {
    fetchGlobalAllData.mockRejectedValue(new Error('Notion unavailable'))
    const res = response()
    await expect(getServerSideProps({ res })).rejects.toThrow('Notion unavailable')
    expect(res.setHeader).not.toHaveBeenCalled()
    expect(res.write).not.toHaveBeenCalled()
  })
})
