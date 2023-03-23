/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
/* eslint-disable simple-import-sort/imports */
import '../styles/global.css';
import '../styles/modal.css'

import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { ContextProvider } from '@/contexts/ContextProvider';

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session,
}>) {

  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </SessionContextProvider>
  )
}
export default MyApp