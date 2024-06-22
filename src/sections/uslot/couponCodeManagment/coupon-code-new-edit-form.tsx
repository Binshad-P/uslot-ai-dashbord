import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// types
import { CouponItem } from 'src/types/user';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
// import { createCouponCodeManagement } from 'src/api/Uslot/couponCodeManagment';
import { TextField, Container, InputLabel,Select,MenuItem } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
import {
  createCouponCodeManagement,
  editCouponCodeManagement,
} from 'src/api/Uslot/couponCodeManagment';
import { width } from '@mui/system';
import { error } from 'console';
import { FormControl,  } from '@mui/base';
// ----------------------------------------------------------------------

type Props = {
  currentUser?: CouponItem;
};

export default function CouponCodeNewEditForm({ currentUser }: Props) {
  const [expiryDate, setexpiryDate] = useState(
    currentUser?.expiry_date && new Date(currentUser.expiry_date)
  );

  console.log(expiryDate, '1021');

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    couponCode: Yup.string().required('Coupon code is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
    commission: Yup.number()
      .required('Commission amount is required')
      .typeError('Commission must be a number'),
    discount: Yup.number()
      .required('Discount amount is required')
      .typeError('Discount must be a number'),
    limit: Yup.number().required('Limit is required').typeError('Limit must be a number'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      couponCode: currentUser?.couponCode || '',
      expiryDate: currentUser?.expiryDate || '',
      commission: currentUser?.commission || 0,
      discount: currentUser?.discount || 0,
      limit: currentUser?.limit || 0,
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();

      router.push(paths.dashboard.user.list);

      if (currentUser?.id) {
        // If data.id is present, it's an edit operation
        const res = await editCouponCodeManagement(data, currentUser?.id);
        if (res?.status == 'success') {
          enqueueSnackbar(res?.message);
        } else {
          enqueueSnackbar(res?.message, { variant: 'error' });
        }
      } else {
        // If data.id is absent, it's a create operation
        const res = await createCouponCodeManagement(data);
        if (res?.status == 'success') {
          enqueueSnackbar(res?.message);
        } else {
          enqueueSnackbar(res?.message, { variant: 'error' });
        }
      }
    } catch (error) {
      console.log(error.message, 'eroorroror');
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Card sx={{ p: 3, width: '100%' }}>
        <Box
          columnGap={2}
          display="flex"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <LocalizationProvider>
            <Container>
              <Box mt={5}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                    }}
                  >
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={currentUser?.name}
                      rules={{ required: 'Name is required' }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.name}
                          />
                          {errors.name && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.name.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      defaultValue={currentUser?.email}
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid email address',
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.email}
                            // helperText={errors.email ? errors.email.message : ''}
                          />
                          {errors.email && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.email.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />
                  </Box>

                  <Box
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                    }}
                  >
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue={currentUser?.phone}
                      rules={{
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Phone number must contain only digits',
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Phone"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.phone}
                            // helperText={errors.phone ? errors.phone.message : ''}
                          />
                          {errors.phone && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.phone.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />
                    <Controller
                      name="couponCode"
                      control={control}
                      defaultValue={currentUser?.coupon_code}
                      rules={{ required: 'Coupon code is required' }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Coupon Code"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.couponCode}
                            // helperText={errors.couponCode ? errors.couponCode.message : ''}
                          />
                          {errors.couponCode && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.couponCode.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />
                  </Box>

                  <Box
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                    }}
                  >
                    <Controller
                      name="expiryDate"
                      control={control}
                      defaultValue={expiryDate}
                      rules={{
                        required: 'Expiry Date is required',
                        validate: (value) => {
                          return (value && !isNaN(new Date(value).getTime())) || 'Invalid date';
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Box
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            mt: '15px',
                          }}
                        >
                          <DatePicker
                            label="Expiry Date"
                            value={expiryDate}
                            // defaultValue={expiryDate}
                            sx={{ width: '100%' }}
                            onChange={(date: any) => {
                              setexpiryDate(date);
                              field.onChange(date);
                            }}
                          />
                          {error && (
                            <Typography sx={{ fontSize: '12px', color: 'red', mt: '5px' }}>
                              {error.message}
                            </Typography>
                          )}
                        </Box>
                      )}
                    />

                    <Controller
                      name="commission"
                      control={control}
                      defaultValue={currentUser?.commission_amount}
                      rules={{
                        required: 'Commission is required',
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: 'Commission must be a valid number',
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Commission"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.commission}
                          />
                          {errors.commission && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.commission.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />
                  </Box>
                  <Box
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                    }}
                  >
                    <Controller
                      name="discount"
                      control={control}
                      defaultValue={currentUser?.discounted_amount}
                      rules={{
                        required: 'Discount is required',
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message: 'Discount must be a valid number',
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Discount"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.discount}
                            // helperText={errors.discount ? errors.discount.message : ''}
                          />

                          {errors.discount && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.discount.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />

                    <Controller
                      name="limit"
                      control={control}
                      defaultValue={currentUser?.coupon_code_limit}
                      rules={{
                        required: 'Limit is required',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Limit must be a valid number',
                        },
                      }}
                      render={({ field }) => (
                        <div>
                          <TextField
                            {...field}
                            label="Limit"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.limit}
                            // helperText={errors.limit ? errors.limit.message : ''}
                          />
                          {errors.limit && (
                            <Typography sx={{ fontSize: '12px', color: 'red' }}>
                              {errors.limit.message as string}
                            </Typography>
                          )}
                        </div>
                      )}
                    />

                    {
                      currentUser && (

                        <Controller
                             name="coupon_status"
                             control={control}
                             defaultValue={currentUser?.coupon_status}
                             rules={{ required: 'Status is required' }}
                             render={({ field }) => (
                               <FormControl   error={!!errors.status}>
                                 <InputLabel id="status-label">Status</InputLabel>
                                 <Select
                                   labelId="status-label"
                                   {...field}
                                   label="Status"
                                 >
                                   <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                   <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                                 </Select>
                                 {errors.status && (
                                   <Typography sx={{ fontSize: '12px', color: 'red' }}>
                                     {/* {errors.status.message} */}
                                   </Typography>
                                 )}
                               </FormControl>
                             )}
                           />
                      )
                    }
                    
                  </Box>
                  <Box mt={2}>
                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                      <LoadingButton type="submit" variant="contained">
                        {!currentUser ? 'Create User' : 'Save Changes'}
                      </LoadingButton>
                    </Stack>
                  </Box>
                </form>
              </Box>
            </Container>
          </LocalizationProvider>
        </Box>
      </Card>
      {/* </Grid> */}
    </Grid>
  );
}
