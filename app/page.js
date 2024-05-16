'use client';

import React from 'react';
import Board from '@/components/Board';
import seedData from '@/data/seedscript';

function Home() {
  seedData();
  return <Board />;
}

export default Home;
