import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { Pokemon } from '@prisma/client';
import React from 'react';
import styled from 'styled-components';
import FilterBox, { ALL_CATEGORIES } from './filterBox';
import { formatList } from '@/utils/text';

type TeamCardProps = {
  name: string;
  members: Pokemon[];
  imageUrls: string[];
  totalBaseExperience: number;
  types: string[];
};

export default function TeamCard(props: TeamCardProps) {
  const [type, setType] = React.useState(ALL_CATEGORIES);

  return (
    <Card sx={{ minWidth: 275, padding: '1rem', margin: '1rem' }}>
      <CardHeader
        title={props.name}
        titleTypographyProps={{ variant: 'h5' }}
        action={
          <>
            <Button>Edit</Button>
          </>
        }
      />

      <hr />

      <CardContent>
        <Typography variant="h6">Members</Typography>
      </CardContent>

      {props.members.length ? (
        <CardContent>
          {props.imageUrls && (
            <AvatarList>
              {type != ALL_CATEGORIES
                ? props.members
                    .filter(m => m.types.includes(type))
                    .map(m => <Avatar key={m.imageUrl} src={m.imageUrl} />)
                : props.members.map(m => (
                    <Avatar key={m.imageUrl} src={m.imageUrl} />
                  ))}
            </AvatarList>
          )}

          <FilterBox
            label="Filter by type"
            categories={props.types}
            selectedCategory={type}
            setCategory={setType}
          />
        </CardContent>
      ) : (
        <CardContent>
          <Typography variant="body1">No members yet.</Typography>
        </CardContent>
      )}

      <hr />

      <CardContent>
        <Typography variant="h6">Team stats</Typography>
      </CardContent>

      <CardContent>
        <Typography variant="body1">
          Total team base experience: {props.totalBaseExperience}
        </Typography>

        <Typography variant="body1">
          All team types: {props.types.length ? formatList(props.types) : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
}

const AvatarList = styled.div`
  display: flex;
  overflow-x: auto;
  border: 1px solid #d3d3d3;
  border-radius: 0.3rem;
  padding: 0.3rem;
  margin-bottom: 1.3rem;
`;
