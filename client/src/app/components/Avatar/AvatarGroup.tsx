import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import {
  generateInitial,
  stringToColor,
} from '../../helpers/avatar-user.helper';

interface IProps {
  arr: any[];
}

export default function CustomAvatarGroup(props: IProps) {
  const { arr } = props;
  return (
    <AvatarGroup max={4}>
      {arr.map((obj, idx) => (
        <Avatar
          key={idx}
          title={obj.name}
          style={{ background: stringToColor(obj.name) }}
        >
          {generateInitial(obj.name)}
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
