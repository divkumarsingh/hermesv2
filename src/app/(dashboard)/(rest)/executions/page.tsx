import { requireAuth } from "@/lib/auth-utils";

const Page = async() => {
    await requireAuth(); 
    return(
        <p>executions</p>
    )
}

export default Page;
