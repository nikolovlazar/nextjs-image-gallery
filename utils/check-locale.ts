import * as Sentry from '@sentry/nextjs';
import { delay } from './delay';
import type { NextRequest } from 'next/server';

export const checkLocale = async (_: NextRequest) => {
  await Sentry.startSpan({ name: 'check-locale', op: 'function.nextjs' }, () =>
    delay(250)
  );
};
