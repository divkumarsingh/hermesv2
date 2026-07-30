
import { LoginForm } from "@/features/auth/components/login-form";
import { requireUnAuth } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

const Page = async() => {
    return(
        <LoginForm/>
        
    )
}

export default Page;