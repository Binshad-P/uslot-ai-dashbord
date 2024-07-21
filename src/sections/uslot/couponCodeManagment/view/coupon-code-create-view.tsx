// @mui
import Container from '@mui/material/Container';
// routes
import { paths, uslotPath } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import CouponCodeNewEditForm from '../coupon-code-new-edit-form';

// ----------------------------------------------------------------------

export default function CouponCodeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new coupon code user"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Coupon Management',
            href: uslotPath.couponcodemanagment,
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CouponCodeNewEditForm />
    </Container>
  );
}
