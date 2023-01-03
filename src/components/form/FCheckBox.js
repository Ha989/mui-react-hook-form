import { useFormContext, Controller} from 'react-hook-form';
import { Checkbox, FormControlLabel} from "@mui/material";

function FCheckBox({ name, ...other}) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
    {...other}
      control={
        <Controller
          name={name}
          control={control}
          render={( {field}) => 
          <Checkbox {...field} checked={field.value} />
        }
        />
      }
    />
  );
}

export default FCheckBox;