import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const req = await request.json()
  const { content, commenterId, commenterName, postId } = req
  const data = await prisma.comment.create({
    data : {
      content,
      commenterId,
      commenterName,
      postId,
    },
  })
 
  return NextResponse.json(data);
}