"use client";
import { Admin, Resource, AppBar, Layout, LayoutProps, EditGuesser, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserEdit, UserList } from "./user";
import { OrderEdit, OrderList } from "./order";
import { ProductList, ProductEdit, ProductCreate } from "./product";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CategoryCreate, CategoryEdit, CategoryList } from "./category";

const AdminAppBar = () => <AppBar position="static" />;
const AdminLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => (
  <Layout
    {...props}
    appBar={AdminAppBar}
    appBarAlwaysOn
    sx={{ "& .RaLayout-appFrame": { marginTop: 0 } }}
  />
);

async function checkAdmin(router: AppRouterInstance, session: any) {
  if (session.status === "loading") {
    return;
  } else {
    if (!session.data.user.admin) {
      router.push("/");
    } else {
      return;
    }
  }
}

const AdminApp = () => {
  const route = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      route.push("/pages/auth/login");
    },
  });
  useEffect(() => {
    checkAdmin(route, session);
  }, [route, session]);
  if (session.status === "loading") {
    return "Загрузка авторизации";
  }
  return (
    <Admin
      layout={AdminLayout}
      dataProvider={jsonServerProvider("http://localhost:8000")}
    >
      <Resource
        name="product"
        list={ProductList}
        edit={ProductEdit}
        create={ProductCreate}
        recordRepresentation="name"
      />
      <Resource
        name="user"
        options={{ label: "Users" }}
        list={UserList}
        edit={UserEdit}
        recordRepresentation="name"
      />
      <Resource
        name="order"
        list={OrderList}
        edit={OrderEdit}
        recordRepresentation="name"
      />
      <Resource
        name='category'
        options={{ label: "Categories" }}
        list={CategoryList}
        edit={CategoryEdit}
        create={CategoryCreate}
      />
    </Admin>
  );
};
export default AdminApp;
