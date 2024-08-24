import { Helmet } from 'react-helmet-async';
// sections
import { CustomerSupportListView } from 'src/sections/uslot/customerSupport/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <CustomerSupportListView />
    </>
  );
}
