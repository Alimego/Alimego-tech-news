import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import postData from '../data/postData'
import Layout from '../layouts/Layout'
import scrollToTop from '../hooks/scrollToTop'
import { slugify } from '../hooks/slugify'
import NoPage from './NoPage'

const Post = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const post = postData.find((post) => slugify(post.title) === slug);

  const handlePostClick = (title) => {
    const slug = slugify(title)
    navigate(`/${slug}`)
    scrollToTop()
  }

  const handleCategoryClick = (category) => {
    const slug = slugify(category)
    navigate(`/category/${slug}`)
    scrollToTop()
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      {!post ? (
        <NoPage/>
        ) : (
        <div className="pt-16 md:pt-24 px-6 md:px-20 pb-6">
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex flex-col gap-3">
              <div onClick={()=> handleCategoryClick(post?.category)}>
                <p className="text-xl text-primary font-semibold cursor-pointer font-[Lato]">{post?.category}</p>
              </div>
              <div onClick={()=> handlePostClick(post?.title)}>
                <p className="text-2xl text-black font-bold cursor-pointer w-full lg:w-[60%]">{post?.title}</p>
              </div>
              <div className="flex items-center gap-2 text-[#777676] font-[Lato]">
                <p>{post?.writer}</p>
                <p>-</p>
                <p>{post?.date}</p>
              </div>
            </div>
            <img 
              src={post?.image} 
              alt={post?.title}
              className='w-full lg:w-[60%] h-[220px] md:h-[500px] rounded-md' 
              onClick={()=> handlePostClick(post?.title)}
            />
            <p className='text-[#777676]'>Image Source: {post?.imgSource}</p>
            <div className='py-4'>
              <p className=' leading-8 text-[17px] font-[Open Sans]'>{post?.content}</p>
            </div>
            <div>
            <div className="pb-3 md:pb-8">
              <p className="text-[26px] font-semibold py-2">Must-Read Tech Articles</p>
              <div className="bg-[#e4e4e4] w-full h-[1px]"></div>
            </div>
            <div className="grid grid-col-1 lg:grid-cols-2 gap-4 md:gap-10">
              {postData.map((data)=>(
                <div key={data?.id}>
                  <div className="flex justify-between gap-3 w-full py-4 md:h-[200px]">
                    <div className="w-[60%] flex flex-col gap-1">
                      <div onClick={()=> handleCategoryClick(data?.category)}>
                        <p className="text-[18px] text-primary font-semibold cursor-pointer font-[Lato]">{data?.category}</p>
                      </div>
                      <div onClick={()=> handlePostClick(data?.title)}>
                        <p className="text-xl text-black font-bold hover:underline cursor-pointer">{data?.title}</p>
                      </div>
                      <div className="flex flex-col gap-1 text-[#777676] font-[Lato]">
                          <p>{data?.writer}</p>
                          <p>{data?.date}</p>
                      </div>
                    </div>
                    <div className="w-[40%] flex items-center" onClick={()=> handlePostClick(data?.title)}>
                      <img src={data?.image} alt={data?.title} className='w-full h-[100px] md:h-[180px] rounded-md cursor-pointer'/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Post
