import { Metadata, NextPage } from "next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
const AdminApp = dynamic(() => import("@/components/admin/adminPage"), { ssr: false });

export const metadata:Metadata = {
    title:'admin'
}

const Admin: NextPage = () => <AdminApp />;

export default Admin;