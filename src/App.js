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
import {FormProvider, FormTextField, FCheckBox} from './components/form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),

 }).required();



function App() {
  const defaultValues = {
    username: "",
    email: "",
    password: "1234",
    remember: true,
  };

  const methods = useForm({ resolver: yupResolver(schema), defaultValues });
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
    
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Stack spacing={3}>
      {!!errors.afterSubmit && (
        <Alert severity="error">{errors.afterSubmit.message}</Alert>
      )}
      <FormTextField name="username" label="Username"/>
      <FormTextField name="email" label="Email Address"/>
      
      
      <FormTextField
        name="password"
        label="Password"
        type={showPassword ? "text" : 'password'}
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
      </Stack>

      <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ my: 2}}
      >
        <FCheckBox name="remember" label="Remember me" />
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
      </FormProvider>

    </div>
    </div>
  );
}

export default App;
