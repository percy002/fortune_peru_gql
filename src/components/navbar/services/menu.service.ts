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
export async function getMenuItems () {
  const {data} = await useSuspenseQuery(menuQuery)

  console.log(data);

  return data
  

}
