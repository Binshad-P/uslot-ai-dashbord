import { Helmet } from 'react-helmet-async';
// sections
import { UserListView } from 'src/sections/uslot/usermanagement/view'

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Order List</title>
      </Helmet>

      <UserListView />
    </>
  );
}
