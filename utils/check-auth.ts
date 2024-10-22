import * as Sentry from '@sentry/nextjs';
import { delay } from './delay';
import type { NextRequest } from 'next/server';

export const checkAuth = async (request: NextRequest) => {
  await Sentry.startSpan({ name: 'check-auth', op: 'function.nextjs' }, () =>
    delay(300)
  );
};
