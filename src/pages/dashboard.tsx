/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable prettier/prettier */
import { createServerSupabaseClient, User } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';

import DashboardMain from '@/components/DashboardMain';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    }
  };
};


const Dashboard = ({
  user,
}: {
  user: User;
}) => {
  
  return (
    <Main
      meta={
        <Meta
          title="Antbit"
          description="Antbit - Dashboard"
        />
      } session={user}
    >
      <DashboardMain />
    </Main>
  );
};

export default Dashboard;


