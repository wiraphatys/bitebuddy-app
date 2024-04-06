'use client'

import { useRouter } from 'next/navigation'

function SignUpRole(){

    const router = useRouter();

    const handleSelectClick = (role:string) =>{
        router.push(`/signup/${role}`)
    }

    return(
        <div>
            <div>WHO ARE YOU?</div>
            <button onClick={()=>handleSelectClick('user')}>Customer</button>
            <button onClick={()=>handleSelectClick('owner')}>Owner</button>
        </div>
    );
}
export default SignUpRole;