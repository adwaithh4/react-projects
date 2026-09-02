import { Outlet, useNavigation,useSubmit,useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  // const navigation = useNavigation();
   const token = useLoaderData();
   const submit = useSubmit();
   useEffect(() => {
  if (!token) {
    return;
  }

  const logoutTimer = setTimeout(() => {
    submit(null, {
      action: '/logout',
      method: 'post',
    });
  }, 60 * 60 * 1000);

  return () => clearTimeout(logoutTimer);
}, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
