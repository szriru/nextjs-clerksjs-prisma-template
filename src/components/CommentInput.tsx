'use client'
import { useUser } from "@clerk/nextjs"
import { useRef } from "react"
import { useRouter } from 'next/navigation';

interface CommentInputProps {
  postId: string
}

export const CommentInput = ({ postId }: CommentInputProps) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const router = useRouter();
  const handleClick = async () => {
    const data = {
      content: textareaRef?.current?.value,
      commenterId: user?.id,
      commenterName: user?.username,
      postId: postId,
    }
    try {
      const response = await fetch('/api/comment/new', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      const jsonData = await response.json()
      if(response.ok){
        alert('success')
        router.refresh()

      }else{
        throw new Error("an error occured")
      }
    } catch (err) {
      alert("an Error occured")
    }
  }
  return (
    <div className="w-full">
      {isSignedIn ? (
        <div className="flex justify-center items-center flex-col">
          <textarea ref={textareaRef} cols={60} rows={5} placeholder={`comment as ${user.username}`} className="rounded-md max-w-full m-4 resize-y"></textarea>
          <button className="rounded-md p-1 bg-blue-500" onClick={handleClick}>
            Comment
          </button>
        </div>
      ) : (
        <p>You need to sign in to make a comment</p>
      )}
    </div>
  )
}

export default CommentInput
