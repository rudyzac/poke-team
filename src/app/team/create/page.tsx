'use client';

import { useState } from 'react';
import { randomIntegerWithinRange } from '@/utils/math';
import { createTeam } from '@/helpers/db/dbHelper';
import { Button, Input, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import PokemonCard from '@/components/pokemonCard';
import { Ability, Type } from '@/types/types';

type StateProperties = {
  pokedexNumber: number;
  name: string;
  baseExperience: number;
  imageUrl: string;
  abilities: string[];
  types: string[];
};

export default function Page() {
  const [teamMembers, setTeamMembers] = useState<StateProperties[]>([]);

  const addRandomTeamMember = () => {
    const TOTAL_NUMBER_OF_POKEMON = 1008; // According to pokemon.com
    const randomPokemonNumber = randomIntegerWithinRange(
      1,
      TOTAL_NUMBER_OF_POKEMON
    );
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

    fetch(`${baseUrl}${randomPokemonNumber}`)
      .then(response => response.json())
      .then(data =>
        setTeamMembers([
          ...teamMembers,
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

  const deleteTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(x => x.pokedexNumber !== id));
  };

  return (
    <>
      <header>
        <Typography variant="h1">Create Team</Typography>
      </header>

      <form id="create-team-form" action={createTeam}>
        <TextField
          type="text"
          name="name"
          id="outlined-basic"
          label="Team name"
          variant="outlined"
        />

        {teamMembers.map((teamMember, index) => (
          <Input
            key={`${index}`}
            type="hidden"
            name={`team-member-${index}`}
            id={`input-team-member-${index}`}
            value={JSON.stringify(teamMember)}
          />
        ))}
      </form>

      <CardContainer>
        {teamMembers.map(pokemon => (
          <PokemonCard
            key={pokemon.name}
            pokedexNumber={pokemon.pokedexNumber}
            name={pokemon.name}
            baseExperience={pokemon.baseExperience}
            imageUrl={pokemon.imageUrl}
            abilities={pokemon.abilities}
            types={pokemon.types}
            deleteTeamMember={deleteTeamMember}
          />
        ))}
      </CardContainer>

      <ButtonContainer>
        <Button variant="contained" onClick={addRandomTeamMember}>
          {"Gotta catch'em all"}
        </Button>

        <Button type="submit" form="create-team-form" variant="contained">
          Create
        </Button>
      </ButtonContainer>
    </>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;