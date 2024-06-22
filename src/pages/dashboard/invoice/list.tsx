import { Helmet } from 'react-helmet-async';
// sections
import { UserScoreListView } from 'src/sections/uslot/userScore/view';

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Invoice List</title>
      </Helmet>

      <UserScoreListView />
    </>
  );
}
