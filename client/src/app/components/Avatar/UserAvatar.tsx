import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import React from 'react';
import {
  generateInitial,
  stringToColor,
} from '../../helpers/avatar-user.helper';

interface IProps {
  name: string;
}

export default function UserAvatar(props: IProps) {
  const { name } = props;
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        style={{
          background: stringToColor(name),
        }}
      >
        {generateInitial(name)}
      </Avatar>
      <span style={{ marginLeft: '8px' }}>{name}</span>
    </Box>
  );
}
