'use client';

import { useState } from 'react';
import PageHeader from '@/components/pageHeader';
import InputGroup from '@/components/inputGroup';
import { createTeam } from '@/helpers/db/dbHelper';
import { Input } from '@mui/material';
import PokemonCard from '@/components/pokemonCard';
import { TeamMember } from '@/types/types';
import { addRandomTeamMember } from '@/utils/team';
import { PokemonCardContainer } from '@/components/pokemonCardContainer';
import { NEW_TEAM_MEMBER_NAME_PREFIX } from '@/constants/form';

export default function Page() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const FORM_ID = 'create-team-form';

  const deleteTeamMember = (pokedexNumber: number) => {
    setTeamMembers(teamMembers.filter(x => x.pokedexNumber !== pokedexNumber));
  };

  return (
    <>
      <PageHeader text="Create Team" link={{ text: 'Home', url: '/' }} />

      <main>
        <form id="create-team-form" action={createTeam}>
          <InputGroup
            textFieldProps={{ name: 'name', label: 'Team name' }}
            additionalButtonProps={{
              text: "Gotta catch'em all",
              callback: () => addRandomTeamMember(teamMembers, setTeamMembers),
            }}
            submitButtonProps={{ text: 'Create', formId: FORM_ID }}
          />

          {teamMembers.map((teamMember, index) => (
            <Input
              key={`${index}`}
              type="hidden"
              name={`${NEW_TEAM_MEMBER_NAME_PREFIX}${index}`}
              id={`input-team-member-${index}`}
              value={JSON.stringify(teamMember)}
            />
          ))}
        </form>

        <PokemonCardContainer>
          {teamMembers
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
      </main>
    </>
  );
}
