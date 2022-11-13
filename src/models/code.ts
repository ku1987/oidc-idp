import { Prisma } from '@prisma/client';

import prisma from './connection';

export const getAuthCodeByCode = async (code: string) => {
  const authCode = await prisma.authCode.findUnique({
    where: {
      code,
    },
    include: {
      Client: true,
    },
  });
  if (!authCode) {
    return null;
  }
  return authCode;
};

export const saveCode = async (payload: Prisma.AuthCodeCreateInput) => {
  const code = await prisma.authCode.create({
    data: payload,
  });
  return code;
};
