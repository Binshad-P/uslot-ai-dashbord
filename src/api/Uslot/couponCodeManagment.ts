import { AllCouponCodeListSlice } from 'src/redux/slices/app';
import axios from '../../utils/uslot-axios';
import { store } from 'src/redux/store';
const Token = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;

export const createCouponCodeManagement = async (data: any) => {
  try {
    const response = await axios.post('/api/coupons/create',data);

    return response.data;
    // Return the response data on successful login
  } catch (error) {
    // return error?.response?.data
    return error.response.data // Throw an error on login failure
  }
};

export const editCouponCodeManagement = async (data: any, id: any) => {
  try {
    const response = await axios.patch(`/api/coupons/edit/${id}`, data);
    return response.data; // Return the response data on successful login
  } catch (error) {
    return error.response.data // Throw an error on login failure
  }
};

export const deleteCouponCodeManagement = async (id: any) => {
  try {
    const response = await axios.delete(`/api/coupons/${id}`);
    return response.data; // Return the response data on successful login
  } catch (error) {
    throw new Error('faild'); // Throw an error on login failure
  }
};

//   export const createCouponCodeManagement = async (body?: any, enqueueSnackbar?: any, SuccssFun?: any) => {

//     try {
//         const res = await axios.post('/api/coupons/create', body, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         if (res) {
//             enqueueSnackbar('Create success!')
//             SuccssFun()
//         }
//     } catch (err) {
//         window.alert("faild!!!")
//     }
// }

export const listCouponCodeManagment = async () => {
  try {
    const response = await axios.get('/api/coupons', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      store.dispatch(AllCouponCodeListSlice({ data: response.data }));
    }
  } catch (error) {
    store.dispatch(AllCouponCodeListSlice({ data: [] }));
  }
};
