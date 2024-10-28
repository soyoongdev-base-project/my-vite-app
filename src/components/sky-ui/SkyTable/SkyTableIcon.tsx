import { Check, CircleAlert, LoaderCircle, TriangleAlert } from 'lucide-react'
import React from 'react'
import { TableStatusType } from '~/typing'

export interface SkyTableIconProps {
  type: TableStatusType
  size?: number
}

const SkyTableIcon: React.FC<SkyTableIconProps> = ({ type, size }) => {
  const content = () => {
    switch (type) {
      case 'success':
        return (
          <Check size={size ?? 16} color='#ffffff' className='relative top-[2px] m-0 rounded-full bg-success p-[2px]' />
        )
      case 'warning':
        return (
          <TriangleAlert
            size={size ?? 16}
            color='#ffffff'
            className='relative top-[2px] m-0 rounded-full bg-warn p-[2px]'
          />
        )
      case 'danger':
        return (
          <CircleAlert
            size={size ?? 16}
            color='#ffffff'
            className='relative top-[2px] m-0 rounded-full bg-error p-[2px]'
          />
        )
      case 'progress':
        return (
          <LoaderCircle
            size={size ?? 16}
            color='#ffffff'
            className='relative top-[2px] m-0 animate-spin rounded-full bg-warn p-[2px]'
          />
        )
      default:
        return (
          <Check
            size={size ?? 16}
            color='#ffffff'
            className='relative top-[2px] m-0 rounded-full bg-lightGrey p-[2px]'
          />
        )
    }
  }

  return <>{content()}</>
}

export default SkyTableIcon
