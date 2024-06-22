import { Helmet } from 'react-helmet-async';
// sections
import { CouponCodeListView } from 'src/sections/uslot/couponCodeManagment/view';

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User List</title>
      </Helmet>

      <CouponCodeListView />
    </>
  );
}
