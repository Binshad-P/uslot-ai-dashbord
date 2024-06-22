import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hook';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import axios from "../../../utils/uslot-axios";
import { store } from 'src/redux/store';
import { logIn } from 'src/redux/slices/checkout';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  // const { login } = useAuthContext();

  const router:any = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'admin@gmail.com',
    password: 'admin',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
//       const loginResponse = await login?.(data.email, data.password);
// console.log(1, loginResponse);
      // router.push('/dashboard/order')
      // router.push(returnTo || PATH_AFTER_LOGIN);
      // console.log(2);
      Uslotlogin(data)

    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const Uslotlogin = async ({ email, password }: any) => {




    try {
  
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });

      console.log(response);
      
  
    
      // const response = await axios.post('/api/auth/login', {
      //   email,
      //   password,
      // });
  
     
      localStorage.setItem('access_token',response.data.token)
      localStorage.setItem('refresh_token',response.data.token)
      // localStorage.setItem('role',response.data.response.role)
      // localStorage.setItem('userid',response.data.response.id)
  
      store.dispatch(logIn({ loginData: response.data, isLogged: true }));
      router.push(returnTo || PATH_AFTER_LOGIN);

      //login
      
      // return response;
    } catch (error) {
   
      setErrorMsg(typeof error === 'string' ? error : error.message);
      store.dispatch(logIn({ loginData: "", isLogged: false }))
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Uslot</Typography>

        {/* <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      {renderForm}
    </FormProvider>
  );
}
