'use server';

import { prisma } from '@/lib/db';
import { redis } from '@/lib/redis';
import { CACHE_ALL_TEAMS_KEY } from '@/constants/persistence';
import {
  NEW_TEAM_MEMBER_NAME_PREFIX,
  TEAM_MEMBER_TO_DELETE_NAME_PREFIX,
} from '@/constants/form';

export async function createTeam(data: FormData) {
  const name = data.get('name')?.valueOf();
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('Invalid team name');
  }

  const teamMembersKeys = getKeysFromFormData(
    data,
    NEW_TEAM_MEMBER_NAME_PREFIX
  );

  const result = await prisma.team.create({
    data: {
      name,
      pokemon: {
        create: teamMembersKeys.map(k => JSON.parse(data.get(k) as string)),
      },
    },
  });

  await redis.del(CACHE_ALL_TEAMS_KEY);
}

const getKeysFromFormData = (
  data: FormData,
  keyIdentifier: string
): string[] => {
  const keyIterator = data.keys();
  let iteratorResult = keyIterator.next();

  const keys = [];
  while (!iteratorResult.done) {
    if (iteratorResult.value.startsWith(keyIdentifier)) {
      keys.push(iteratorResult.value);
    }
    iteratorResult = keyIterator.next();
  }

  return keys;
};

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

export async function getTeam(id: string) {
  return await prisma.team.findUnique({
    where: {
      id: id,
    },
    include: {
      pokemon: true,
    },
  });
}

export async function updateTeam(data: FormData) {
  const teamId = data.get('team-id')?.valueOf();
  if (typeof teamId !== 'string' || teamId.length === 0) {
    throw new Error('Invalid team id');
  }

  const name = data.get('name')?.valueOf();
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('Invalid team name');
  }

  const teamMembersToAddKeys = getKeysFromFormData(
    data,
    NEW_TEAM_MEMBER_NAME_PREFIX
  );

  const teamMembersToDeleteKeys = getKeysFromFormData(
    data,
    TEAM_MEMBER_TO_DELETE_NAME_PREFIX
  );

  await prisma.team.update({
    where: {
      id: teamId,
    },
    data: {
      name: name,
      pokemon: {
        ...(teamMembersToAddKeys.length > 0
          ? {
              create: teamMembersToAddKeys.map(k =>
                JSON.parse(data.get(k) as string)
              ),
            }
          : {}),
        ...(teamMembersToDeleteKeys.length > 0
          ? {
              deleteMany: {
                pokedexNumber: {
                  in: teamMembersToDeleteKeys.map(k =>
                    parseInt(data.get(k) as string)
                  ),
                },
              },
            }
          : {}),
      },
    },
  });

  await redis.del(CACHE_ALL_TEAMS_KEY);
}
