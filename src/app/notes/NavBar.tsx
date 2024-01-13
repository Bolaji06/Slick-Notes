import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/assets/logo.png'

import { luistana, poppins } from "./fonts"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function NavBar (){
    return (
        <>
            <nav className="p-4 shadow-md bg-white">
                <div className="flex items-center justify-between
                 flex-wrap gap-3 max-w-7xl m-auto">
                    <Link
                        href='/notes'>
                        <Image src={logo} 
                        alt="logo"
                        width={50}/>
                    </Link>
                    
                    <div className="flex items-center gap-3">
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: { avatarBox: { width: '2.5rem', height: '2.5rem'}}
                            }}/>
                        
                        <Button>
                            <Plus size={20} className="mr-2"/>
                            Add Note
                        </Button>

                    </div>

                </div>
            </nav>
        </>
    )
}