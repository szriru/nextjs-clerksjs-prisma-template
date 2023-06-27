import { prisma } from "@/lib/prisma"
import { JSDOM } from "jsdom"
import CommentInput from "@/components/CommentInput"

interface IndPostProps {
  params: {
    postId: string
  }
}
export default async function IndPost({ params }: IndPostProps) {
  const postId = params.postId
  const post = await prisma.post.findFirst({
    where: {
      id: postId
    },
    include: {
      comments: true
    }
  })
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId
    },
  })
  const parsedContent = new JSDOM(post?.content)
  const html = parsedContent.window.document.documentElement.outerHTML
  return (
    <div className="flex justify-center flex-col items-center">
      <div className='py-4 px-8 rounded-md shadow-md w-[80%] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl my-8 gap-8 flex flex-col justify-center items-center'>
        <h1>{post?.created_at.toString()}</h1>
        <h3>writen by: {post?.authorName}</h3>
        <div className="w-full flex flex-col justify-start items-start" dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>
      <div className='p-4 rounded-md shadow-md w-[80%] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl my-8 gap-8 flex flex-col justify-center items-center'>
        <h3>Comments</h3>
        <CommentInput postId={postId} />
        {comments.map(comment => (
          <div className="flex flex-col items-center justify-center w-full p-2 border ronuded-md ">
            <p  className="mx-2 flex w-full justify-start">Comment Data: {post?.created_at.toString()}</p>
            <p className="mx-2 flex w-full justify-start">Comment by: {comment.commenterName}</p>
            <p className="mt-2 mx-2 flex w-full justify-start">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}