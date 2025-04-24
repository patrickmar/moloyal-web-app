import Image from "next/image";
import Link from "next/link";
import React from "react";
import { menus } from "../../constants/constant";
import PropTypes from "prop-types";

type Iprops = { userData: object; open: boolean };

const sidebarNav3 = (props: Iprops) => {
  const { userData, open } = props;
  return (
    <aside
      id="logo-sidebar"
      className={` fixed top-0 left-0 z-40 w-64 border-gray-200 border-r h-screen transition-transform md:translate-x-0 ${
        open ? "" : "-translate-x-full"
      }`}
    >
      {/* <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
      <Link href="/" className="flex items-center pl-2.5 mb-5">
      <Image className="h-12 w-auto mr-2" src="/imgs/logo/logo.png" alt="logo" width={0} height={0} sizes="100vw" />
      </Link>
      <ul className="space-y-2 font-medium">
        {menus.map((item, i)=> (
            <li key={i}>
            <Link href={item.link} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               {item.icon}
               <span className="flex-1 ml-3 whitespace-nowrap">{item.name}</span>
               {item.badge && <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-green-600 bg-green-100 rounded-full dark:bg-gray-700 dark:text-green-300">{item.badge}</span>}
               {item.count && <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{item.count}</span>}
            </Link>
         </li>
        ))}         
      </ul>

      <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
        {menus.submenus.map((item:any, i:number) => (
            <li key={i}>
            <Link href={item.link} className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
               {item.icon}
               <span className="ml-4">{item.name}</span>
            </Link>
         </li>
        ))}
      </ul>
   </div> */}
    </aside>
  );
};

sidebarNav3.propTypes = {
  open: PropTypes.bool.isRequired,
  userData: PropTypes.object,
};

export default sidebarNav3;
