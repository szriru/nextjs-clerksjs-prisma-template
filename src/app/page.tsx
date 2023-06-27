import MyCard from "@/components/MyCard";
import Pagination from "@/components/Pagination"
import { prisma } from "@/lib/prisma";

async function getRecordCount() {
  const recordCount = await prisma.post.count()
  return recordCount
}

async function getPageCount() {
 const recordCount = await getRecordCount()
 return Math.ceil(recordCount / 10)
}

async function getPosts(page: number) {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  const posts = await prisma.post.findMany({
    take: pageSize,
    skip: skip,
    orderBy: {
      created_at: "desc",
    },
  });

  return posts;
}

interface HomeProps {
  searchParams: {
    page: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const totalPages = await getPageCount()
  const currentPage = Number(searchParams.page) || 1
  const posts = await getPosts(currentPage)

  return (
    <div>
      {posts.map((post: any) => (
        <MyCard title={post.created_at.toString()} detail={post.content} id={post.id}/>
      ))}
      {/* @ts-expect-error Server Component */}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
