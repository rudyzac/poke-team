'use server';

import { prisma } from '@/app/db';

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
}
