'use client';

import { useEffect, useState } from 'react';
import { TeamWithMembers } from '@/types/types';
import { getAllTeams } from '@/helpers/db/dbHelper';
import PageHeader from '@/components/pageHeader';
import TeamCard from '@/components/teamCard';
import { Team } from '@prisma/client';

export default function Page() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);

  useEffect(() => {
    getAllTeams()
      .then(teams =>
        teams.sort((t1: Team, t2: Team) =>
          t1.createdAt > t2.createdAt ? -1 : 1
        )
      )
      .then(teams => setTeams(teams));
  }, [teams]);

  const getTeamMembersTypes = (team: TeamWithMembers) => {
    const types = team.pokemon.flatMap(p => p.types);
    return [...new Set<string>(types)];
  };

  const computeTotalTeamBaseExperience = (team: TeamWithMembers) =>
    team.pokemon.reduce(
      (accumulator, currentValue) =>
        currentValue.baseExperience
          ? accumulator + currentValue.baseExperience
          : accumulator,
      0
    );

  return (
    <>
      <PageHeader text="Team list" link={{ text: 'Home', url: '/' }} />

      {teams.map(team => (
        <TeamCard
          key={team.id}
          teamId={team.id}
          name={team.name}
          members={team.pokemon}
          imageUrls={team.pokemon.map(p => p.imageUrl)}
          totalBaseExperience={computeTotalTeamBaseExperience(team)}
          types={getTeamMembersTypes(team)}
        ></TeamCard>
      ))}
    </>
  );
}
