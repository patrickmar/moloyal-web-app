"use client"
import React from 'react'
import { Sidebar } from 'flowbite-react';
import { HiCalendar, HiOutlineSave, HiUser } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import { BsCalendar, BsHouseDoor, BsPerson } from 'react-icons/bs';

const SidebarNav = () => {

  const menus = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: BsHouseDoor,
    },
    {
      name: 'MoSave',
      icon: HiOutlineSave,
      submenus: [
        {
          name: 'Savings',
          link: '/savings',
        },
        {
          name: 'Withdrawal',
          link: '/withdraw',
        }
      ]
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: BsPerson,
    },
    {
      name: 'MoTicket',
      link: '/savings',
      icon: BsCalendar,
    }
  ]
  return (
    <Sidebar className="bg-white fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full font-normal duration-75 lg:flex transition-width">
      <div className="bg-white h-full overflow-y-auto overflow-x-hidden rounded py-4 px-3 dark:bg-gray-800">
      <Image className="h-12 w-auto mr-2" src="/imgs/logo/logo.png" alt="logo" width={0} height={0} sizes="100vw" />
      {/* <Sidebar.Logo as={Image} href="#" img="/imgs/logo/logo2.png" imgAlt="Moloyal logo" className="lg:h-16"></Sidebar.Logo> */}
      <Sidebar.Items className='mt-5'>
        <Sidebar.ItemGroup>
          {menus.map((menu, i) => (
            <React.Fragment key={i}>
              {menu.submenus != undefined && menu.submenus.length > 0 ? (
                <Sidebar.Collapse icon={menu.icon} label={menu.name}>
                  {menu.submenus.map((sm, id) => (
                    <Sidebar.Item key={id} as={Link} href={sm.link}>{sm.name}</Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item icon={menu.icon} as={Link} href={menu.link}> {menu.name} </Sidebar.Item>
              )}
            </React.Fragment>
          ))}

        </Sidebar.ItemGroup>
      </Sidebar.Items>
      </div>
    </Sidebar>
  )
}

export default SidebarNav