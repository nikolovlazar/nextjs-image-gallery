import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';

import { checkImageExists } from './utils/check-image-exists';
import { checkAuth } from './utils/check-auth';
import { updateRequest } from './utils/update-request';
import { checkLocale } from './utils/check-locale';

export async function middleware(request: NextRequest) {
  return await Sentry.startSpan(
    { name: 'middleware', op: 'middleware' },
    async () => {
      await checkAuth(request);

      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/p/')) {
        const publicId = pathname.split('/').pop();
        if (publicId) {
          await checkImageExists(publicId);
        }
      }

      await checkLocale(request);
      await updateRequest(request);

      return NextResponse.next();
    }
  );
}
