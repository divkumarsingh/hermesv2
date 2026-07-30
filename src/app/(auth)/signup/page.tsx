

import { RegisterForm } from "@/features/auth/components/register-form";
import { requireUnAuth } from "@/lib/auth-utils";

const Page = async () => {
    return(
        <RegisterForm/>
    );
}

export default Page;