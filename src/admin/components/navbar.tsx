import React from 'react'
import NextLink from 'next/link'
import { Box, Flex, FlexProps, HStack, Icon, Text } from '@chakra-ui/react'
import { FiLogOut } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { useAppSelector } from '@/store/store'

interface LinkItemProps {
  name: string
  icon: IconType | undefined
  href: string
}

interface NavItemProps extends FlexProps {
  icon: IconType | undefined
  href: string
  path: string
  children: React.ReactNode
}

interface ContentProps extends FlexProps {
  path: string
  children: React.ReactNode
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Работники',
    icon: undefined,
    href: '/admin/employees'
  },
  {
    name: 'Пользователи',
    icon: undefined,
    href: '/admin/users'
  },
  {
    name: 'Клиенты',
    icon: undefined,
    href: '/admin/clients'
  },
  {
    name: 'Представители',
    icon: undefined,
    href: '/admin/responsibles'
  },
  {
    name: 'Документы',
    icon: undefined,
    href: '/admin/documents'
  },
  {
    name: 'Услуги',
    icon: undefined,
    href: '/admin/services'
  },
  {
    name: 'Тестирование',
    icon: undefined,
    href: '/admin/testing'
  }
]

const NavItem = ({ icon, href, children, path, ...rest }: NavItemProps) => {
  const active = path.includes(href)
  const iconColor = active ? '#92b23e' : '#888579'

  return (
    <NextLink href={href}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          color={'#888579'}
          bg={active ? '#ffffff' : '#f0ead2'}
          align={'center'}
          p={4}
          role={'group'}
          cursor={'pointer'}
          _hover={{
            bg: '#ffffff'
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr={4}
              fontSize={20}
              color={iconColor}
              _groupHover={{
                color: iconColor
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </NextLink>
  )
}

const UserPanel = () => {
  const authState = useAppSelector(state => state.auth)

  return (
    <Flex
      w={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={3}
    >
      <Text fontSize={'lg'} color={'#7C543B'}>
        {authState.firstName} {authState.lastName}
      </Text>
      {authState.isAuthorized && (
        <NextLink href={'/logout'}>
          <HStack>
            <FiLogOut />
            <Text fontSize={'lg'}>Выход</Text>
          </HStack>
        </NextLink>
      )}
    </Flex>
  )
}

const AdminSidebar = ({ path, children }: ContentProps) => {
  return (
    <Box minH={'100vh'}>
      <Box
        transition={'3s ease'}
        bg={'#f0ead2'}
        pos={'fixed'}
        h={'full'}
        w={40}
        pt={20}
      >
        <NavItem icon={undefined} href={'/'} path={''}>
          На главную
        </NavItem>
        {LinkItems.map(link => {
          return (
            <NavItem
              key={link.name}
              icon={link.icon}
              href={link.href}
              path={path}
            >
              {link.name}
            </NavItem>
          )
        })}
      </Box>
      <Box
        ml={40}
        px={4}
        height={20}
        alignContent={'center'}
        justifyContent={'flex-end'}
        boxShadow={'xs'}
      >
        <UserPanel />
      </Box>
      <Box ml={40} p={4}>
        {children}
      </Box>
    </Box>
  )
}

export default AdminSidebar
