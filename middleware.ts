import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const uid = request.cookies.get('uid');
  if (uid) {
    return;
  } else {
    return NextResponse.redirect(new URL(`/login?redir=${request.nextUrl.pathname}`, request.url));
  }
}

export const config = {
  matcher: ['/peoplePublish', '/storePublish', '/writeComment/:id*']
}
