import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";

import { findSideBarRoutes } from "@/routes";
import { XRoutes } from "@/routes/types";
import type { MenuProps } from "antd";

import "./index.less";
import logo from "./images/logo.png";

// https://ant.design/components/menu-cn/
type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: "group"): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const { Sider } = Layout;

interface MenuInfo {
  key: string;
  keyPath: string[];
  /** @deprecated This will not support in future. You should avoid to use this */
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const defaultOpenKeys = pathname.split("/").slice(0, 3).join("/");
  const defaultSelectedKeys = pathname.split("/").slice(0, 4).join("/");

  const routes = findSideBarRoutes() as XRoutes;

  const menuItems: MenuItem[] = routes.map((route) => {
    return getItem(
      route.meta?.title,
      route.path as string,
      route.meta?.icon,
      route.children
        ?.map((item) => {
          if (item.hidden) return null;
          return getItem(item.meta?.title, item.path as string, item.meta?.icon);
        })
        .filter(Boolean)
    );
  });

  const handleMenuClick = ({ key }: MenuInfo) => {
    navigate(key);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} breakpoint="lg">
      <h1 className="layout-title">
        <img className="layout-logo" src={logo} alt="logo" />
        <span style={{ display: collapsed ? "none" : "inline-block" }}>大黑耗子管理系统</span>
      </h1>
      <Menu theme="dark" mode="inline" defaultOpenKeys={[defaultOpenKeys]} defaultSelectedKeys={[defaultSelectedKeys]} items={menuItems} onClick={handleMenuClick}></Menu>
    </Sider>
  );
}

export default SideBar;
