import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import {
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiUsers
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import React from 'react'
import NextLink from 'next/link'
import { useAppSelector } from '@/store/store'

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
  roles: string[]
}

interface NavItemProps extends FlexProps {
  icon: IconType
  href: string
  path: string
  children: React.ReactNode
}

interface ContentProps extends FlexProps {
  path: string
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  path: string
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Календарь',
    icon: FiCalendar,
    href: '/calendar',
    roles: ['clientSpecialist', 'specialist']
  },
  {
    name: 'Клиенты',
    icon: FiUsers,
    href: '/clients',
    roles: ['admin', 'clientSpecialist']
  },
  {
    name: 'Админ',
    icon: FiSettings,
    href: '/admin',
    roles: ['admin']
  }
]

const SidebarContent = ({ path, onClose, ...rest }: SidebarProps) => {
  const authState = useAppSelector(state => state.auth)

  return (
    <Box
      transition="3s ease"
      bg={'#f0ead2'}
      w={{ base: 'full', md: 40 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => {
        if (link.roles.includes(authState.role)) {
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
        }
        return null
      })}
    </Box>
  )
}

const NavItem = ({ icon, href, children, path, ...rest }: NavItemProps) => {
  const active = path.includes(href)
  const iconColor = active ? '#92b23e' : '#888579'

  return (
    <NextLink href={href}>
      <Box style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex
          color={'#888579'}
          bg={active ? '#ffffff' : '#f0ead2'}
          align="center"
          p="4"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#ffffff'
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="20"
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
    <Flex w="100%" alignItems="center" justifyContent="space-between" px={3}>
      <Text fontSize="lg" color={'#7C543B'}>
        {authState.firstName} {authState.lastName}
      </Text>
      {!authState.isAuthorized && (
        <NextLink href={'/signin'}>
          <HStack>
            <FiLogOut />
            <Text fontSize="lg">Вход</Text>
          </HStack>
        </NextLink>
      )}
      {authState.isAuthorized && (
        <NextLink href={'/logout'}>
          <HStack>
            <FiLogOut />
            <Text fontSize="lg">Выход</Text>
          </HStack>
        </NextLink>
      )}
    </Flex>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 40 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      gap={3}
      {...rest}
      boxShadow={'xs'}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <UserPanel />
    </Flex>
  )
}

const SidebarWithHeader = ({ path, children }: ContentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh">
      <SidebarContent
        path={path}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent path={path} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 40 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader
