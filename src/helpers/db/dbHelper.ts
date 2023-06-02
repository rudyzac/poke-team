'use server';

import { prisma } from '@/app/db';
import { redis } from '@/app/redis';
import { CACHE_ALL_TEAMS_KEY } from '@/constants';

export async function createTeam(data: FormData) {
  const name = data.get('name')?.valueOf();
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('Invalid team name');
  }

  const teamMembersKeyIterator = data.keys();
  let iteratorResult = teamMembersKeyIterator.next();

  const teamMembersKeys = [];
  while (!iteratorResult.done) {
    if (iteratorResult.value.startsWith('team-member-')) {
      teamMembersKeys.push(iteratorResult.value);
    }
    iteratorResult = teamMembersKeyIterator.next();
  }

  await prisma.team.create({
    data: {
      name,
      pokemon: {
        create: teamMembersKeys.map(k => JSON.parse(data.get(k) as string)),
      },
    },
  });

  await redis.del(CACHE_ALL_TEAMS_KEY);
}

export async function getAllTeams() {
  const cacheEntry = await redis.get(CACHE_ALL_TEAMS_KEY);
  if (cacheEntry) {
    return JSON.parse(cacheEntry);
  }

  const dbEntry = await prisma.team.findMany({
    include: {
      pokemon: true,
    },
  });

  redis.set(CACHE_ALL_TEAMS_KEY, JSON.stringify(dbEntry));

  return dbEntry;
}
