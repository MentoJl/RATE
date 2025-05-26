import React, { useState, useEffect } from 'react'
import { useMediaQuery, Tabs, Tab, Box } from '@mui/material'
import {
  ReadOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  SearchOutlined,
  UserSwitchOutlined,
  UserOutlined
} from '@ant-design/icons'
import { usePathname } from "next/navigation"
import { Popover, Input, Image } from 'antd'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const Header = () => {

  const router = useRouter()
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [searchPopoverIsOpen, setSearchPopoverIsOpen] = useState(false)
  const { Search } = Input
  const [isScrolled, setIsScrolled] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const cleanPath = pathname.split('?')[0]
    console.log('Current Path:', cleanPath)
    switch (cleanPath) {
      case '/':
        setPage(0)
        break
      case '/catalog':
        setPage(1)
        break
      case '/search':
        setPage(2)
        break
      case '/cart':
        setPage(3)
        break
      case '/contact':
        setPage(4)
        break
      case '/profile':
      case '/login':
        setPage(5)
        break
      default:
        if (cleanPath.startsWith('/catalog/')) {
          setPage(1)
        } else {
          setPage(0)
        }
    }
  }, [pathname])

  const handleChangeTab = (tab) => {
    setPage(tab)
  }

  const handleRouteToMainPage = () => {
    setPage(0)
    router.push('/')
  }

  if (pathname === '/login') {
    return null
  }

  const handleSearch = (value) => {
    if (value) {
      router.push(`/catalog?searchBy=${value}`)
    } else {
      router.push('/catalog')
    }
    setSearchPopoverIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <Image
        preview={false}
        src='/Logo/HeaderLogo1-preview.png'
        style={{
          width: useMediaQuery('(min-width:1001px)') ? '75px' : '48px',
          height: useMediaQuery('(min-width:1001px)') ? '70px' : '45px',
          top: useMediaQuery('(min-width:1001px)') ? 0 : 2,
          position: 'fixed',
          zIndex: 900,
          cursor: 'pointer',
        }}
        onClick={() => handleRouteToMainPage()}
      />
      {useMediaQuery('(min-width:1101px)') && <Image
        preview={false}
        src='/Logo/siteName.png'
        style={{
          width: '73px',
          height: '25px',
          top: 24,
          left: 75,
          position: 'fixed',
          zIndex: 900,
          cursor: 'pointer',
        }}
        onClick={() => handleRouteToMainPage()}
      />}
      <Box sx={{
        width: '100%',
        position: "fixed",
        top: 0,
        zIndex: 800,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255)',
        backdropFilter: isScrolled ? 'blur(4px)' : 'none',
        transition: 'backdrop-filter 0.1s ease, background-color 0.1s ease',
        borderBottom: '1px solid rgba(0,0,0,0.05)'
      }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={page}
            onChange={(e, page) => handleChangeTab(page)}
            role='navigation'
            centered
          >
            <Tab
              label={useMediaQuery('(min-width:1001px)') ? "Головна" : ''}
              icon={<HomeOutlined style={{ fontSize: "18px" }} />}
              iconPosition='start'
              href="/" />
            {/* <Tab icon={<img src="/Logo/Headerlogo.png" alt="home icon" style={{ width: 60, height: 50 }} />} iconPosition='start'/> */}
            <Tab
              label={useMediaQuery('(min-width:1001px)') ? "Магазин" : ''}
              icon={<ShoppingOutlined style={{ fontSize: "20px" }} />}
              iconPosition='start'
              href='/catalog' />
            <Popover
              content={
                <Search
                  placeholder="Пошук"
                  style={{ width: '350px', height: '30px' }}
                  onSearch={value => handleSearch(value)}
                />}
              trigger="click"
              open={searchPopoverIsOpen}
              onOpenChange={() => { setSearchPopoverIsOpen(!searchPopoverIsOpen) }}
            >
              <Tab
                label={useMediaQuery('(min-width:1001px)') ? "Пошук" : ''}
                icon={<SearchOutlined style={{ fontSize: "20px" }} />}
                iconPosition='start'
              />
            </Popover>
            <Tab
              label={useMediaQuery('(min-width:1001px)') ? "Кошик" : ''}
              icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
              iconPosition='start' />
            {/* <Tab label='About us' icon={<ReadOutlined style={{ fontSize: "20px" }} />} iconPosition='start' /> */}
            <Tab
              label={useMediaQuery('(min-width:1001px)') ? "Зворотній зв`язок" : ''}
              icon={<UserSwitchOutlined style={{ fontSize: "20px" }} />}
              iconPosition='start'
              href='/feedback'
            />

            <Tab
              icon={!session ? '' : <UserOutlined style={{ fontSize: "20px" }} />}
              iconPosition='start'
              label={useMediaQuery('(min-width:1001px)') ? !session ? "Увійти" : "Профіль" : ''}
              href={!session ? '/login' : '/profile'} />
          </Tabs>
        </Box>
      </Box>
      <div style={{ height: '55px' }}></div>
    </div>
  )
}

export default Header
