import { Link, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  link?: { text: string; url: string };
};

const PageHeader = (props: Props) => {
  return (
    <header>
      <Container>
        <Typography variant="h1">{props.text}</Typography>
        {props.link && (
          <Link id="link" href={props.link.url}>
            {props.link.text}
          </Link>
        )}
      </Container>
    </header>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem;

  & #link {
    align-self: center;
  }
`;

export default PageHeader;
