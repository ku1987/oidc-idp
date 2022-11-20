import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';
import base64url from 'base64url';

export const generateAuthCode = () => {
  return uuidv4();
};

export const base64urlEncode = (codeVerifier: string) => {
  const base64Digest = crypto.createHash('sha256').update(codeVerifier).digest('base64');
  return base64url.fromBase64(base64Digest);
};
