'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined'
          ? `${window.location.origin}/`
          : undefined,
      },
    });
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="container-page py-16">
      <div className="card max-w-md mx-auto p-6">
        <h1 className="text-xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm text-neutral-600 mb-4">
          We’ll send you a secure magic link to your email.
        </p>
        {sent ? (
          <div className="text-green-700 bg-green-50 border border-green-200 rounded-xl p-3">
            Check your inbox for the link.
          </div>
        ) : (
          <form onSubmit={sendMagicLink} className="space-y-3">
            <input
              type="email"
              required
              placeholder="coach@school.co.za"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-xl px-3 py-2"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button className="bg-brand text-white px-4 py-2 rounded-xl">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
