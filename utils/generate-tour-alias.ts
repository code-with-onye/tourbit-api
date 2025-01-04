import * as crypto from 'crypto';

export function generateTourAlias(): string {
  const prefix = 'tourbit-';
  const randomString = crypto.randomBytes(3).toString('hex');
  return `${prefix}${randomString}`;
}
