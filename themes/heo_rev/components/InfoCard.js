import { ArrowRightCircle } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  const url1 = siteConfig('HEO_INFO_CARD_URL1', null, CONFIG)
  const icon1 = siteConfig('HEO_INFO_CARD_ICON1', null, CONFIG)
  const url2 = siteConfig('HEO_INFO_CARD_URL2', null, CONFIG)
  const icon2 = siteConfig('HEO_INFO_CARD_ICON2', null, CONFIG)

  return (
    <div className='info-card bg-gradient-to-r from-sky-500 to-emerald-500 dark:bg-yellow-600 text-white flex flex-col items-center rounded-2xl p-6 shadow-lg'>
    {/* <div className='absolute inset-0 bg-black/10'></div>  */}
    <div className='relative z-10 flex flex-col items-center w-full'>
    {/* 顶部标语 */}
    {/* <div className='bg-white/20 px-4 py-1 rounded-full text-sm mb-4'>
    珍稀时间 合作共赢
    </div> */}

    <GreetingsWords />

      {/* 中间头像 */}
      <div className='relative mt-6'>
        <LazyImage
          src={siteInfo?.icon || '/images/testimonial.jpg'} // 你的头像路径
          className='w-24 h-24 rounded-full border-4 border-white shadow-lg'
          alt={siteConfig('AUTHOR')}
        />
        <span className='absolute -bottom-1 -right-1 text-2xl'>😆</span>
      </div>

        <div className='mt-6 w-full flex items-center justify-between px-0'>
        {/* 模块 A：名字 + 副标题 */}
        <div className='flex flex-col'>
            <span className='text-xl font-extrabold drop-shadow-sm'>LIU Xiao</span>
            <span className='text-sm opacity-80 mt-px font-medium drop-shadow-sm'>思想在此同步更新</span>
        </div>

        {/* 模块 B：两个按钮 */}
        <div className="flex gap-3">
        {url1 && (
            <div className="w-10 h-10 bg-white/20 rounded-full flex justify-center items-center transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white">
            <SmartLink href={url1}>
                <i className={`${icon1} text-2xl`} /> {/* 放大图标 */}
            </SmartLink>
            </div>
        )}
        {url2 && (
            <div className="w-10 h-10 bg-white/20 rounded-full flex justify-center items-center transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white">
            <SmartLink href={url2}>
                <i className={`${icon2} text-2xl`} />
            </SmartLink>
            </div>
        )}
        </div>
        </div>

        </div>
    </div>
  )
}

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  const url3 = siteConfig('HEO_INFO_CARD_URL3', null, CONFIG)
  const text3 = siteConfig('HEO_INFO_CARD_TEXT3', null, CONFIG)
  if (!url3) {
    return <></>
  }
  return (
    <SmartLink href={url3}>
      <div
        className={
          'group bg-sky-200 dark:bg-yellow-500 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white flex items-center transition-colors duration-200 py-2 px-3 rounded-full space-x-1'
        }>
        <ArrowRightCircle
          className={
            'group-hover:stroke-black dark:group-hover:stroke-white w-6 h-6 transition-all duration-100'
          }
        />
        <div className='font-bold'>{text3}</div>
      </div>
    </SmartLink>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG)
  const [greeting, setGreeting] = useState(greetings[0])
  // 每次点击，随机获取greetings中的一个
  const handleChangeGreeting = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    setGreeting(greetings[randomIndex])
  }

  return (
    <div
      onClick={handleChangeGreeting}
      className='select-none cursor-pointer py-1 px-2 bg-white/20 hover:bg-indigo-50 font-medium hover:text-indigo-950 dark:bg-yellow-500 dark:hover:text-white dark:hover:bg-black text-sm rounded-lg  duration-200 transition-colors'>
      {greeting}
    </div>
  )
}
