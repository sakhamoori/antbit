/* eslint-disable import/no-extraneous-dependencies */
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Redirect from '@/components/Redirect';

const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div
      className="container grid h-screen place-items-center"
      style={{ padding: '50px 0 100px 0' }}
    >
      {!session ? (
        <div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  borderRadius: '1px',
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: 'lightblue',
                    brandAccent: `gray`,
                  },
                },
              },
            }}
            theme="dark"
            providers={[]}
            // scopes={{github: 'repo'}} // TODO: enable scopes in Auth component.
            // socialLayout="vertical"
            // onlyThirdPartyProviders={false}
          />
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </div>
  );
};

export default Login;
