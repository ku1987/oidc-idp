import { Prisma } from '@prisma/client';

import prisma from './connection';

export const saveCode = async (payload: Prisma.AuthCodeCreateInput) => {
  const code = await prisma.authCode.create({
    data: payload,
  });
  return code;
};
