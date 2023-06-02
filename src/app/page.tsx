'use client';

import { Typography } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>
        <Typography variant="h1">Poké Team</Typography>
      </header>

      <main>
        <ul>
          <li>
            <Link href="/team/create">Create new Team</Link>
          </li>

          <li>
            <Link href="/team/list">List all Teams</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
