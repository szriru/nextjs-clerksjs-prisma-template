import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom'

export async function POST(request: Request) {
  const req = await request.json()
  let { content, authorName, authorId } = req
  content = DOMPurify(new JSDOM('<!DOCTYPE html>').window).sanitize(content);
  const data = await prisma.post.create({
    data : {
      content,
      authorName,
      authorId,
    },
  })
 
  return NextResponse.json(data);
}