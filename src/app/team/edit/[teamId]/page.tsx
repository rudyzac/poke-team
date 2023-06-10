'use client';

import PageHeader from '@/components/pageHeader';
import { Input } from '@mui/material';
import InputGroup from '@/components/inputGroup';
import PokemonCard from '@/components/pokemonCard';
import { PokemonCardContainer } from '@/components/pokemonCardContainer';
import {
  NEW_TEAM_MEMBER_NAME_PREFIX,
  TEAM_MEMBER_TO_DELETE_NAME_PREFIX,
} from '@/constants/form';
import { getTeam, updateTeam } from '@/helpers/db/dbHelper';
import { TeamMember } from '@/types/types';
import { addRandomTeamMember } from '@/utils/team';
import { FC, useEffect, useState } from 'react';

interface PageProps {
  params: { teamId: string };
}

const Page: FC<PageProps> = ({ params }) => {
  const [existingTeamMembers, setExistingTeamMembers] = useState<TeamMember[]>(
    []
  );
  const [newTeamMembers, setNewTeamMembers] = useState<TeamMember[]>([]);
  const [teamMembersToRemove] = useState<number[]>([]);
  const [error, setError] = useState<Error>();

  const FORM_ID = 'edit-team-form';

  useEffect(() => {
    getTeam(params.teamId).then(team => {
      if (team && team.pokemon) {
        setExistingTeamMembers(() =>
          team.pokemon.map(p => {
            return {
              pokedexNumber: p.pokedexNumber,
              name: p.name,
              baseExperience: p.baseExperience,
              imageUrl: p.imageUrl,
              abilities: p.abilities,
              types: p.types,
            };
          })
        );
      } else setError(new Error(`Cannot find team with id ${params.teamId}`));
    });
  }, [params.teamId]);

  const deleteTeamMember = (pokedexNumber: number) => {
    if (teamMemberExists(newTeamMembers, pokedexNumber)) {
      setNewTeamMembers(
        newTeamMembers.filter(x => x.pokedexNumber !== pokedexNumber)
      );
    }

    if (teamMemberExists(existingTeamMembers, pokedexNumber)) {
      teamMembersToRemove.push(pokedexNumber);

      setExistingTeamMembers(
        existingTeamMembers.filter(x => x.pokedexNumber !== pokedexNumber)
      );
    }
  };

  const teamMemberExists = (teamMembers: TeamMember[], pokedexNumber: number) =>
    teamMembers.find(teamMember => teamMember.pokedexNumber === pokedexNumber);

  return error ? (
    <>
      <p>{error.message}</p>
    </>
  ) : (
    <>
      <PageHeader text={`Edit team`} link={{ text: 'Home', url: '/' }} />

      <main>
        <form id={FORM_ID} action={updateTeam}>
          <Input
            type="hidden"
            name="team-id"
            id="input-team-id"
            value={params.teamId}
          />

          <InputGroup
            textFieldProps={{ name: 'name', label: 'Team name' }}
            additionalButtonProps={{
              text: "Gotta catch'em all",
              callback: () =>
                addRandomTeamMember(newTeamMembers, setNewTeamMembers),
            }}
            submitButtonProps={{ text: 'Update', formId: FORM_ID }}
          />

          {newTeamMembers.map((teamMember, index) => (
            <Input
              key={`${index}`}
              type="hidden"
              name={`${NEW_TEAM_MEMBER_NAME_PREFIX}${index}`}
              id={`input-team-member-${index}`}
              value={JSON.stringify(teamMember)}
            />
          ))}

          {teamMembersToRemove.map((teamMemberToRemove, index) => (
            <Input
              key={`${index}`}
              type="hidden"
              name={`${TEAM_MEMBER_TO_DELETE_NAME_PREFIX}${index}`}
              id={`input-remove-team-member-${index}`}
              value={teamMemberToRemove}
            />
          ))}

          <PokemonCardContainer>
            {existingTeamMembers &&
              newTeamMembers &&
              existingTeamMembers
                .concat(newTeamMembers)
                .slice()
                .reverse()
                .map(pokemon => (
                  <PokemonCard
                    key={pokemon.name}
                    pokedexNumber={pokemon.pokedexNumber}
                    name={pokemon.name}
                    baseExperience={
                      pokemon.baseExperience ? pokemon.baseExperience : 0
                    }
                    imageUrl={pokemon.imageUrl}
                    abilities={pokemon.abilities}
                    types={pokemon.types}
                    deleteTeamMember={deleteTeamMember}
                  />
                ))}
          </PokemonCardContainer>
        </form>
      </main>
    </>
  );
};

export default Page;
