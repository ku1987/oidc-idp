import { Prisma } from '@prisma/client';

import prisma from './index';

export const getClientByClientId = async (clientId: string) => {
  const client = await prisma.client.findUnique({
    where: {
      clientId,
    },
  });
  if (!client) {
    return null;
  }
  return client;
};

export const createClient = async (payload: Prisma.ClientCreateInput) => {
  const user = await prisma.client.create({
    data: payload,
  });
  return user;
};
