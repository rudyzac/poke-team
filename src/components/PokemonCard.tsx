import { capitalizeFirstLetter } from '@/app/utils';
import { PropsWithChildren } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

type PokemonCardProps = {
  pokedexNumber: number;
  name: string;
  baseExperience: number;
  imageUrl: string;
  abilities: string[];
  types: string[];
  deleteTeamMember: (pokedexNumber: number) => void;
};

export default function PokemonCard(props: PokemonCardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Avatar
          alt={props.name}
          src={props.imageUrl}
          sx={{ width: 75, height: 75 }}
        />

        <Typography variant="h5" component="div">
          {capitalizeFirstLetter(props.name)}
        </Typography>

        <Property>Base experience: {formatData(props.baseExperience)}</Property>
        <Property>Abilities: {formatList(props.abilities)}</Property>
        <Property>Types: {formatList(props.types)}</Property>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          onClick={() => props.deleteTeamMember(props.pokedexNumber)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const Property = (props: PropsWithChildren) => (
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    {props.children}
  </Typography>
);

const formatData = (data: string | number): string =>
  data ? data.toString() : 'N/A';

const formatList = (list: string[]): string[] =>
  list.map((value, index) =>
    index === list.length - 1 ? `${value}. ` : `${value}, `
  );
