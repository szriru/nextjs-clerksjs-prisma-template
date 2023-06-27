'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function NewPost() {
  const [value, setValue] = useState('');
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter();
  const handleClick = async () => {
    if(!isSignedIn){
      alert('you need to sign in to make a new post')
    }
    const data = {
      content: value,
      //doesn't consider users change their username
      authorName: user?.username,
      authorId: user?.id,
    }
    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const jsonData = await response.json()
      console.log(jsonData, response)
      if(response.ok){
        alert("success. it takes 30 min to appear on top page.")
        router.push(`/post/${jsonData.id}`)
      } else {
        throw new Error("error in handleClick")
      }
    } catch(err) {
      alert('An error occured')
    }
  }
  return (
    <div className='my-8 gap-8 flex flex-col justify-center items-center'>
      <h1>Make a new Post</h1>
      <ReactQuill className='w-[80%] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl' theme="snow" value={value} onChange={setValue} placeholder="Write your dream here..." />
      {isSignedIn ? (
        <button onClick={handleClick} className='rounded-md bg-blue-500 p-1 text-white'>submit</button>
      ) : (
        <p>You need to sign in to make a new post</p>
      )}
    </div>
  )
}
