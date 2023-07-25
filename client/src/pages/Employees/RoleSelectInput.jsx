import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { useField } from 'formik';
import { at } from 'lodash';

export default function RoleSelectInput(props) {
  const { setFieldValue, initVal } = props;
  const [roles, setRoles] = React.useState(initVal || []);
  const [field, meta] = useField(props);

  const handleChange = (e) => {
    const role = e.target.name;
    let copyRoles = [...roles];

    if (copyRoles.includes(role)) {
      copyRoles = copyRoles.filter((e) => e !== role);
    } else {
      copyRoles = [...copyRoles, role];
    }

    setRoles(copyRoles);
    setFieldValue(field.name, copyRoles);
  };

  //   const { gilad, jason, antoine } = roles;
  const error = roles.length > 0;

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <FormControl required error={error} sx={{ display: 'flex' }}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={roles.includes('foreman')}
              onChange={handleChange}
              name="foreman"
            />
          }
          label="foreman"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={roles.includes('driver')}
              onChange={handleChange}
              name="driver"
            />
          }
          label="driver"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={roles.includes('mover')}
              onChange={handleChange}
              name="mover"
            />
          }
          label="mover"
        />
      </FormGroup>
      {_renderHelperText() && (
        <FormHelperText error>{_renderHelperText()}</FormHelperText>
      )}
    </FormControl>
  );
}
