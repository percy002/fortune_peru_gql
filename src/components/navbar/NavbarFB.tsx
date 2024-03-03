"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { getMenuItems, menuItems } from "./services/menu.service";
import { gql } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Dropdown } from "flowbite-react";

import {
  ChildMenuItems,
  MenuItemsNode,
} from ".";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const DropdownCustomTheme = {
    "floating": {
      "animation": "transition-opacity",
      "base": "z-10 w-[100vw] min-h-[30vw] rounded divide-y divide-gray-100 shadow focus:outline-none",      
    },
};
const NavbarCustomTheme = {
  root : {
    inner:{
      base: "mx-auto flex flex-wrap items-end justify-between"
    }
  }
}
const menuQuery = gql`
  {
    menus(where: { slug: "menu-español" }) {
      nodes {
        slug
        name
        count
        menuItems(where: { parentDatabaseId: 0 }) {
          nodes {
            id
            url
            label
            childItems {
              nodes {
                id
                url
                label
              }
            }
          }
        }
      }
    }
  }
`;
export default function NavbarFB() {
  const [menuItems, setMenuItems] = useState<MenuItemsNode[]>();
  const [currentMenuItem, setCurrentMenuItem] = useState("");
  const [isScreenLarge, setIsScreenLarge] = useState(false);

  const [subMenuItems, setSubmenuItems] = useState<ChildMenuItems>();

  const data: any = useSuspenseQuery(menuQuery).data;

  const menus: MenuItemsNode[] = data?.menus.nodes[0].menuItems.nodes;

  useEffect(() => {
    setMenuItems(menus);
  }, [menus]);

  const handleMouseEnter = (currentMenu: string, submenu: ChildMenuItems) => {
    if(submenu.nodes.length > 0){
      setCurrentMenuItem(currentMenu);
      setSubmenuItems(submenu);  
    }
  };


  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth > 768); // Ajusta este valor según el breakpoint sm de Tailwind CSS      
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isScreenLarge]);

  return (
    <Navbar fluid rounded className="lg:px-16" theme={NavbarCustomTheme}>
      <Navbar.Brand as={Link} href="/">
        <img
          src="/logo-fortuneperutravel.png"
          className="mr-3 h-9 sm:h-24"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {menuItems &&
          menuItems.map((menuItem) => {
            return (
              <Navbar.Link
                as={Link}
                href={menuItem.childItems.nodes.length == 0 ? menuItem.url : ""}
                key={menuItem.id}
                onMouseEnter={() =>
                  handleMouseEnter(menuItem.label, menuItem.childItems)
                }
              >
                {isScreenLarge && menuItem.childItems.nodes.length > 0 && (
                  <Dropdown
                    theme={DropdownCustomTheme}
                    label=""
                    dismissOnClick={false}
                    renderTrigger={() => (<span className="lg:text-lg">{menuItem.label} <ChevronDownIcon className="h-5 w-5 inline"/></span>)}
                    trigger="hover"
                    
                  >
                    <div className="flex justify-between py-8 px-4">
                      <div className="flex-1 border-r border-gray-600 px-2">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam provident illo qui aut repellendus iste pariatur sunt voluptate recusandae eum?</p>
                      </div>
                      
                      <div className="flex-1 border-r">
                        {subMenuItems &&
                          subMenuItems.nodes.map((submenu) => (
                            <Dropdown.Item
                              key={submenu.id}
                              className="text-left hover:font-bold hover:underline"
                            >
                              {submenu.label}
                            </Dropdown.Item>
                          ))}
                      </div>

                      <div className="flex-1">
                        <img src="https://picsum.photos/100/100" alt="" className="w-11/12"/>
                      </div>
                    </div>
                  </Dropdown>
                )
              }

              <span className="lg:text-lg">{(!isScreenLarge || menuItem.childItems.nodes.length == 0) && menuItem.label}  </span>             

              </Navbar.Link>
            );
          })}
        {/* {showSubmenu && currentMenuItem && subMenuItems.length > 0 && (
          <Submenu submenu={subMenuItems} />
        )} */}
      </Navbar.Collapse>
    </Navbar>
  );
}
