import type { MenuProps } from 'antd'
import { Flex, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '~/assets/logo.svg'
import routes from '~/config/route.config'
import { cn } from '~/utils/helpers'
import SideIcon from './SideIcon'
import SideItem from './SideItem'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  openDrawer: boolean
  setOpenDrawer: (enable: boolean) => void
}

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, type?: 'group'): MenuItem {
  return {
    key,
    icon,
    label,
    type
  } as MenuItem
}

const SideNav: React.FC<Props> = ({ openDrawer, setOpenDrawer, ...props }) => {
  const { pathname } = useLocation()
  const [selectedKey, setSelectedKey] = useState<string>(routes[0].key)
  // const currentUser = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const keyFound = routes.find((route) => route.path === lastPath(pathname))
    if (keyFound) {
      setSelectedKey(keyFound.key)
    }
  }, [pathname])

  const lastPath: (pathname: string) => string = function (pathname) {
    const arrPath = pathname.split('/')
    const path = arrPath[arrPath.length - 1]
    return path
  }

  const items: MenuProps['items'] = routes
    // .filter((item) => !currentUser.roles.includes('admin') || currentUser.roles.includes('staff'))
    .map((route) => {
      if (route.isGroup) {
        return getItem(SideItem(route), route.key, null, 'group')
      } else {
        return getItem(SideItem(route), route.key, SideIcon(route.icon))
      }
    })

  const handleClick: MenuProps['onClick'] = (e) => {
    setSelectedKey(e.key)
    setOpenDrawer(!openDrawer)
  }

  return (
    <Flex vertical gap={20} {...props} className={cn('bg-white', props.className)}>
      <Flex align='center' justify='center'>
        <img src={logo} alt='logo' className='h-16 w-16 object-contain' />
      </Flex>
      <Menu
        onClick={handleClick}
        selectedKeys={[selectedKey]}
        defaultSelectedKeys={[selectedKey]}
        mode='inline'
        items={items}
      />
    </Flex>
  )
}
export default SideNav
