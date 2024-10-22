import * as Sentry from '@sentry/nextjs';
import type { NextRequest } from 'next/server';
import { delay } from './delay';

export const updateRequest = async (_: NextRequest) => {
  await Sentry.startSpan(
    { name: 'update-request', op: 'function.nextjs' },
    () => delay(400)
  );
};
