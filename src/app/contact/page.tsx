import Link from "next/link"

export default async function Contact() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className='p-4 rounded-md shadow-md w-[80%] xs:max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl my-8 gap-8 flex flex-col justify-center items-start'>
        <h1>Contact</h1>
        <Link className="text-blue-500" href="https://twitter.com/sz_riru">Twiiter: @sz_riru</Link>
        <Link className="text-blue-500" href="https://github.com/szriru">github: szriru</Link>
      </div>
    </div>
  )
}