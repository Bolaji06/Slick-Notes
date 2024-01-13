import { SignIn } from "@clerk/nextjs";

export default function SignInPage(){

    return (
        <>
            <section className="h-screen flex justify-center items-center">
               <SignIn appearance={{ variables: { colorPrimary: '#0F172A'}}}/> 
            </section>
            
        </>
    )
}