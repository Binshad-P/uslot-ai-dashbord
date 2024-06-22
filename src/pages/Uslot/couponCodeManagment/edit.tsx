import { Helmet } from 'react-helmet-async';
// sections
import{ CouponCodeEditView} from 'src/sections/uslot/couponCodeManagment/view';

// ----------------------------------------------------------------------

export default function CouponCodeEditPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: User Edit</title>
      </Helmet>

      <CouponCodeEditView />
    </>
  );
}
