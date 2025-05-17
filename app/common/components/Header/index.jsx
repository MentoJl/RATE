import React, { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { ReadOutlined, 
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  HomeOutlined,
  SearchOutlined,
  UserSwitchOutlined,
  UserOutlined } from '@ant-design/icons'
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
  const [page, setPage] = useState(getDefaultTabValue())
  const [isScrolled, setIsScrolled] = useState(false)

  function getDefaultTabValue () {
    switch (pathname) {
      case '/':
        return 0
      case '/catalog':
        return 1
      case '/search':
        return 2
      case '/cart':
        return 3
      case '/contact':
        return 4
      case '/profile':
        return 5
      case '/login':
        return 5
      default:
        return 0
    }
  }

  const handleChangeTab = (e, tab) => {
    setPage(tab)
  }

  if (pathname === '/login') {
    return null
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ width: '100%'}}>
      <Image 
      preview={false} 
      src='/Logo/HeaderLogo1-preview.png' 
      style={{
        width: '75px', 
        height: '70px', 
        top: 0, 
        position: 'fixed', 
        zIndex: 900,
        cursor: 'pointer'
      }} 
      onClick={() => router.push('/')}
      />
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
            onChange={(e, page) => handleChangeTab(e, page)}
            role='navigation'
            centered
            > 
            <Tab label="Home Page" icon={<HomeOutlined style={{ fontSize: "18px" }} />} iconPosition='start' href="/"/>
            {/* <Tab icon={<img src="/Logo/Headerlogo.png" alt="home icon" style={{ width: 60, height: 50 }} />} iconPosition='start'/> */}
            <Tab label="Shop" icon={<ShoppingOutlined style={{ fontSize: "20px" }} />} iconPosition='start' href='/catalog'/>
            <Popover
              content={
              <Search 
                placeholder="Search" 
                style={{ width: '350px', height: '30px' }} 
                onSearch={value => console.log(value)}
              />}
              trigger="click"
              open={searchPopoverIsOpen}
              onOpenChange={() => {setSearchPopoverIsOpen(!searchPopoverIsOpen)}}
            >
              <Tab 
                label="Search" 
                icon={<SearchOutlined style={{ fontSize: "20px" }} />} 
                iconPosition='start' 
              />
            </Popover>
            <Tab label="Cart" icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />} iconPosition='start'/>
            {/* <Tab label='About us' icon={<ReadOutlined style={{ fontSize: "20px" }} />} iconPosition='start' /> */}
            <Tab label='Contact us' icon={<UserSwitchOutlined style={{ fontSize: "20px" }} />} iconPosition='start' />
            <Tab icon={!session ? '' : <UserOutlined style={{ fontSize: "20px" }}/>} iconPosition='start' label={!session ? "Увійти" : "Профіль"} href={!session ? '/login' : '/profile'}/>
          </Tabs>
        </Box>
      </Box>
      <div style={{height: '55px'}}></div>
    </div>
  )
}

export default Header
