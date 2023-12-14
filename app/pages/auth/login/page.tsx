import LoginForm from "@/components/auth/loginForm";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: 'Sign in',
}

export default function Login() {
    return <div>
        <LoginForm/>
    </div>;
}