import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import withAuthorization from "@/components/withAuthorization";
import Avatar from "../Avatar";
import Breadcrumb from "../Breadcrumb";
import SideBar from "../SideBar";

import "./index.less";

const { Header, Content } = Layout;

function LayoutComponent() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <Header className="layout-header">
          <Breadcrumb />
          <Avatar />
        </Header>
        <Content>
          <Outlet />
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
					xxx
				</Footer> */}
      </Layout>
    </Layout>
  );
}

export default withAuthorization(LayoutComponent);
