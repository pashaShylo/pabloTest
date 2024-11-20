"use client";
import {useState} from 'react';
import TextField from '@mui/material/TextField';


export default function Home() {
  const [value, setValue] = useState('');
  return (
    <div>
      <h1>Home</h1>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Name"
      />
    </div>
  );
}
