// @mui
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
import { CouponCodeItem } from 'src/types/user';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { deleteCouponCodeManagement } from 'src/api/Uslot/couponCodeManagment';
import { useDispatch } from 'react-redux';
import { deleteSlice } from 'src/redux/slices/app';
import { number } from 'yup';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { USER_STATUS_OPTIONS } from 'src/_mock';


//
// import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: CouponCodeItem;
  index:number;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

const formatDate = (isoString:string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function CustomerSupportTableRow({
  row,
  index,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {

  
  const {id,name, coupon_code,email,phone,commission_amount,coupon_code_limit,created_at,discounted_amount,expiry_date,coupon_code_redeemed,coupon_status} = row;
const base_amount=400



const total_amount: any = coupon_code_redeemed * (base_amount - (parseFloat(commission_amount) + parseInt(discounted_amount)));


  const formattedDate = formatDate(expiry_date);
  const confirm = useBoolean()
  const dispatch = useDispatch();

  const quickEdit = useBoolean();

  const popover = usePopover();

  const handleDelete=async(id:number)=>{
   await  deleteCouponCodeManagement(id)
   dispatch(deleteSlice())
   confirm.onFalse()
  }
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
 
  });
  const defaultValues = useMemo(
    () => ({
      name:name || '',
     
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

 

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell >
          {index+1}
          {/* <Checkbox checked={selected} onClick={onSelectRow} /> */}
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}

          <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{coupon_code}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap',width:"150px" }}>  
        <FormProvider  methods={methods}  >
           <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>
            </FormProvider>
            </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{formattedDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{formattedDate}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap',width:"300px" }}>
        <FormProvider  methods={methods}  >
        <RHFTextField name="notes" label="Notes" />
        </FormProvider>
        </TableCell>
        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{coupon_status}</TableCell> */}
{/* 
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell> */}

     
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
   
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={()=>handleDelete(id)}>
            Delete
          </Button>
        }
      />
    </>
  );
}
