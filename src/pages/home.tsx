import { Helmet } from 'react-helmet-async';
// sections
import { HomeView } from 'src/sections/home/view';
// ----------------------------------------------------------------------
import { JwtLoginView } from 'src/sections/auth/jwt';
import AuthClassicLayout from 'src/layouts/auth/classic';
export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Minimal: The starting point for your next project</title>
      </Helmet>
      <HomeView />
      {/* <JwtLoginView /> */}
    </>
  );
}
