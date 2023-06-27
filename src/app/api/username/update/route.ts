import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs';
 
export async function POST(request: Request) {
  const data = await request.json()
  const userId = data.userId
  const username = data.username
  const user = await fetch(`https://api.clerk.com/v1/users/${userId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username: username})
  })
  return NextResponse.json(user);
}