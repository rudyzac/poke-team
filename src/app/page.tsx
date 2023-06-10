'use client';

import PageHeader from '@/components/pageHeader';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <PageHeader text="Poké Team" />

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
