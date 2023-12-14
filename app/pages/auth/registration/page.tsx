    import RegistraionForm from "@/components/auth/registrationForm";
    import { Metadata } from "next";

    export const metadata:Metadata = {
        title: 'Sign up',
    }



    export default function Registration() {
        return <div>
            <RegistraionForm/>
        </div>;
    }