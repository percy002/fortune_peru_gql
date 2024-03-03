export interface MenuData {
  menus: Menus;
}

export interface Menus {
  nodes: MenuNode[];
}

export interface MenuNode {
  slug: string;
  name: string;
  count: number;
  menuItems: MenuItems;
}

export interface MenuItems {
  nodes: MenuItemsNode[];
}

export interface MenuItemsNode {
  id: string;
  url: string;
  label: string;
  childItems: ChildMenuItems;
}

export interface ChildMenuItems {
  nodes: NodeChildItem[];
}

export interface NodeChildItem {
  id: string;
  url: string;
  label: string;
}
