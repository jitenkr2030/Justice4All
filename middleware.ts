import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { encrypt, decrypt } from './lib/encryption'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (request.method === 'POST') {
      const body = request.body
      const encryptedBody = encrypt(JSON.stringify(body))
      const newRequest = new Request(request.url, {
        method: request.method,
        headers: request.headers,
        body: encryptedBody,
      })
      return NextResponse.next({
        request: newRequest,
      })
    }
    
    if (request.method === 'GET') {
      const response = NextResponse.next()
      const originalJson = response.json
      response.json = async () => {
        const data = await originalJson.call(response)
        return decrypt(JSON.stringify(data))
      }
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}

