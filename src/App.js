import React, {useState} from 'react';
import { useForm, useFormContext, Controller } from "react-hook-form";
import {
        Stack,
        Alert,
        IconButton, 
        Typography,
        TextField,
        InputAdornment,
        Checkbox,
        FormControlLabel
      } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab';


import './App.css';

function App() {
  const defaultValues = {
    email: "hanguyen@gmail.com",
    password: "1234",
    remember: true,
  };

  const methods = useForm({ defaultValues });
  const {
    reset,
    setError,
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    setError("afterSubmit", {message: "Server Response Error"})
  };
 

  return (
    <div className="App">
      <Typography variant="h3" textAlign="center" mb={3}>
        React Hook Form
      </Typography>
    <div className='container'>
    < form onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}

    <Controller
      name='email'
      control={control}
      render={({ field, fieldState: {error}}) => (
          <TextField
            label="Email Address"
            fullWidth
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        )}
      />
      <Controller
      name='password'
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        error={!!error}
        helperText={error?.message}
        {...field}
        InputProps={{
           endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
           ),
           }}
           />
        )}
       />
      </Stack>
      <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ my: 2}}
      >
        <FormControlLabel 
          label="Remember me"
          control={
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={field.value} />
              )}
            />
              }
          />
      </Stack>

      <LoadingButton
         fullWidth
         size='medium'
         type='submit'
         variant='contained'
         loading={isSubmitting}
        >
         Login
      </LoadingButton>

    </form>
    </div>
    </div>
  );
}

export default App;
