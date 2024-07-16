import { useField } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const FormikAutocomplete = ({placeholder,label, options, ...props }) => {
  const [field,meta, helpers] = useField(props);

  return (
    <Autocomplete
      multiple
      size="small"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      onChange={(event, value) => {
        helpers.setValue(value);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            checked={selected}
            style={{ marginRight: 8 }}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={Boolean(meta.touched && meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
      style={{ width: '40%' }}
      value={Array.isArray(field.value) ? field.value : []}
    />
  );
};

export default FormikAutocomplete;
