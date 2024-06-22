// @mui
import Container from '@mui/material/Container';
// routes
import { paths, uslotPath } from 'src/routes/paths';
import { useParams } from 'src/routes/hook';
// _mock
import { _userList } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import CouponCodeNewEditForm from '../coupon-code-new-edit-form';


import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
// ----------------------------------------------------------------------
import {  listCouponCodeManagment } from 'src/api/Uslot/couponCodeManagment';
import { useEffect } from 'react';

export default function CouponCodeEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;
  useEffect(()=>{
    listCouponCodeManagment()
  },[])
  const { AllCouponCodeList } = useSelector((state: RootState) => state.app);
  
  const currentUser = AllCouponCodeList.find((user:any) =>  user.id == id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Coupon Managment',
            href: uslotPath.couponcodemanagment,
          },
          { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CouponCodeNewEditForm currentUser={currentUser}  />
    </Container>
  );
}
