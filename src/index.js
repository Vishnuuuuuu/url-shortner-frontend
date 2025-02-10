import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId="122425664781-dfv6edt1nudnfkccgiub7c3cju3la3g6.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
