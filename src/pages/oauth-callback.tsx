import React, { useEffect, useState } from 'react';
import { PaymanClient } from '@paymanai/payman-ts';

const OAuthCallback: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) {
      setStatus('error');
      setError('No authorization code found in URL.');
      return;
    }
    const clientId = import.meta.env.VITE_PAYMAN_CLIENT_ID;
    try {
      // Exchange code for access token
      const payman = PaymanClient.withAuthCode({ clientId }, code);
      // You can now use 'payman' to make authenticated requests on behalf of the user
      // For demo, just show success
      setStatus('success');
      // TODO: Store the payman client/token for future use (e.g., in context or state)
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'OAuth exchange failed.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {status === 'loading' && <p className="text-lg">Connecting to Payman...</p>}
      {status === 'success' && <p className="text-lg text-green-700">Payman account connected! You can now use Payman features.</p>}
      {status === 'error' && <p className="text-lg text-red-700">OAuth Error: {error}</p>}
    </div>
  );
};

export default OAuthCallback; 