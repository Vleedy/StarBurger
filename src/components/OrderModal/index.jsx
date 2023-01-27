import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearItems } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MuiTelInput } from 'mui-tel-input';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { nameValidation, phoneValidation } from './validation';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

const OrderModal = ({ setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { handleSubmit, control } = useForm({ mode: 'onBlur' });
  const { errors } = useFormState({ control });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await axios.post('https://63d144a33f08e4a8ff943525.mockapi.io/UserInformation', {
      data,
      totalPrice,
      items: items.map((item) => {
        return { name: item.name, size: item.activeSize, count: item.count };
      }),
    });
    dispatch(clearItems());
    setIsLoading(false);
    setIsOpen(false);
    navigate('/confirm');
  };

  return isLoading ? (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress sx={{ color: '#fe5f1e' }} />
    </Backdrop>
  ) : (
    <Dialog open={true} onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <DialogTitle
            sx={{ fontSize: 30, color: '#fe5f1e', fontWeight: 900, textAlign: 'center' }}>
            Ordering
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <DialogContentText sx={{ marginBottom: '20px', textAlign: 'center' }}>
              Fill in the required fields to complete the order. Our operator will contact you for
              confirmation.
            </DialogContentText>
            <Controller
              control={control}
              rules={nameValidation}
              name="name"
              render={({ field }) => (
                <TextField
                  label="Name"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  required={true}
                  margin="dense"
                  error={!!errors.name?.message}
                  helperText={errors?.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={phoneValidation}
              render={({ field }) => (
                <MuiTelInput
                  margin="dense"
                  label="Phone"
                  required={true}
                  defaultCountry="BY"
                  forceCallingCode
                  variant="outlined"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  error={!!errors.phone?.message}
                  helperText={errors?.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="adress"
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Adress"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  required={true}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <TextField
                  margin="dense"
                  label="Email"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  required={true}
                  type="email"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <button type="submit" className="button pay-btn">
              <span>Order</span>
            </button>
          </DialogActions>
        </ThemeProvider>
      </form>
    </Dialog>
  );
};

export default OrderModal;
