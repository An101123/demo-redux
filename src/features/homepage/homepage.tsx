import React, { useState } from 'react';

import { Link } from "react-router-dom"

export function HomePage() {
  return (
    <>
      <nav>
        <Link to='/count'>Go to count</Link>
        <Link to='/quiz'>Go to quiz</Link>
        <Link to='/query'>Go to query</Link>
      </nav>
    </>

  )
}