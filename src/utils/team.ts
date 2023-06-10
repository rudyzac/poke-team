import { Ability, TeamMember, Type } from '@/types/types';
import { SetStateAction } from 'react';
import { randomIntegerWithinRange } from './math';
import { TOTAL_NUMBER_OF_POKEMON } from '@/constants/pokemon';

export const addRandomTeamMember = (
  existingTeamMembers: TeamMember[],
  setTeamMembers: (value: SetStateAction<TeamMember[]>) => void
) => {
  const randomPokemonNumber = randomIntegerWithinRange(
    1,
    TOTAL_NUMBER_OF_POKEMON
  );
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  fetch(`${baseUrl}${randomPokemonNumber}`)
    .then(response => response.json())
    .then(data =>
      setTeamMembers([
        ...existingTeamMembers,
        {
          pokedexNumber: data.id,
          name: data.name,
          baseExperience: data.base_experience,
          imageUrl: data.sprites.front_default,
          abilities: data.abilities.map((a: Ability) => a.ability.name),
          types: data.types.map((t: Type) => t.type.name),
        },
      ])
    );
};
