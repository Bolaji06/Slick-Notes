
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage (){

    return (
        <>
            <section className='h-screen flex justify-center items-center'>
                <SignUp appearance={{ variables: {colorPrimary: '#0F172A'}}}/>
            </section>
        </>
    )
}