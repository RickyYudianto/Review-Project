import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IProps {
  option: any;
  checked: boolean;
}

export default function UserOption(props: IProps) {
  const { option, checked } = props;
  return (
    <>
      <Checkbox
        icon={icon}
        checkedIcon={checkedIcon}
        color="primary"
        style={{ marginRight: 8 }}
        checked={checked}
      />
      {option.name}
    </>
  );
}
