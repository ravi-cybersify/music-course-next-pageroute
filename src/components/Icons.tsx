import React from 'react'
import { IconType } from 'react-icons';

interface Props {
    icon: IconType;
  }

const Icons: React.FC<Props> = ({icon:Icon}) => {
  return (
    <div>
      <Icon size={20} color='#00AEEF' />
    </div>
  )
}

export default Icons
