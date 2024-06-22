import { Helmet } from 'react-helmet-async';
// sections
import { CouponCodeCreateView } from 'src/sections/uslot/couponCodeManagment/view';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new coupon code user</title>
      </Helmet>

      <CouponCodeCreateView />
    </>
  );
}
