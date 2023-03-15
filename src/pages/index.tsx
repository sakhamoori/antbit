import { useSession } from '@supabase/auth-helpers-react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  const session = useSession();

  return (
    <Main
      meta={<Meta title="Antbit - Main" description="Antbit - Landing Page" />}
      session={session}
    >
      Landing Page
    </Main>
  );
};

export default Index;
