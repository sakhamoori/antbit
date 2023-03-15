import DashboardMain from '@/components/DashboardMain';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@thirdweb-dev/auth';
import { Session } from 'inspector';
import { GetServerSidePropsContext } from 'next';

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
        permanent: false
      }
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    }
  };
};


const Dashboard = ({ user, initialSession }: { user: User, initialSession: Session}) => {
  
  return (
    <Main
      meta={
        <Meta
          title="Dashboard"
          description="Antbit - Dashboard"
        />
      } session={user}
    >
      <DashboardMain session={initialSession} onConnected={undefined} />
    </Main>
  );
};

export default Dashboard;


