'use client';

import Link from 'next/link';

export default function Login() {
  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      <label>Login: </label>
      <input placeholder="login"></input>
      <br></br>
      <br></br>
      <label>Password: </label>
      <input placeholder="password"></input>

      <br></br>
      <br></br>
      <Link href="/register">
        <span>Sign up</span>
      </Link>
    </main>
  );
}
