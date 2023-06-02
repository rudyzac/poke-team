'use client';

import { getAllTeams } from '@/helpers/db/dbHelper';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { TeamWithMembers } from '@/types/types';
import TeamCard from '@/components/teamCard';
import { Team } from '@prisma/client';

export default function Page() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);

  useEffect(() => {
    getAllTeams()
      .then(teams => {
        console.log(teams);
        return teams;
      })
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
      <header>
        <Typography variant="h1">List</Typography>
      </header>

      {teams.map(team => (
        <TeamCard
          key={team.id}
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
