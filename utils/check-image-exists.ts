import * as Sentry from '@sentry/nextjs';
import { delay } from './delay';

export const checkImageExists = async (_: string) => {
  await Sentry.startSpan({ name: 'check-image-exists', op: 'http' }, () =>
    delay(1500)
  );
};
