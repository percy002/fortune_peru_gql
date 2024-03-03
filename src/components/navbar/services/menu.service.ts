"use client"
import { gql } from "@apollo/client";
import { getClient } from "@/lib/client";
import { useSuspenseQuery } from "@apollo/client";
type subMenu = {
  url: string
  label: string
}
export type menuItems = {
  url : string
  label : string
  subMenu : subMenu
}
const menuQuery = gql`{
  menus (where: {slug : "menu-español"}) {
    nodes {
      slug
      name
      count   
      menuItems{
        nodes{
          url
          label          
        }
      }
    }
  }
}`

interface Data {
  menus: Menus;
}

interface Menus {
  nodes: menuNode[];
}

interface menuNode {
  slug: string;
  name: string;
  count: number;
  menuItems: MenuItems;
}

interface MenuItems {
  nodes: Node[];
}

interface Node {
  url: string;
  label: string;
}

export function getMenuItems () {
  // const {data} = useSuspenseQuery(menuQuery)

  // console.log(data);
  // const res = {
  //   url : data
  // }

  // return data;
  

}
