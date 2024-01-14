'use client'

import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/assets/logo.png'

import { luistana, poppins } from "./fonts"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import AddNoteDialog from "@/components/AddNoteDialog"
import ThemeToggleButton from "@/components/ThemeToggleButton"
import { dark } from '@clerk/themes';
import { useTheme } from "next-themes"

export default function NavBar (){
    const [showDialog, setShowDialog] = useState(false);
    const { theme } = useTheme();


    return (
        <>
            <nav className="p-4 shadow-md dark:shadow-md dark:shadow-slate-900">
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
                                baseTheme: (theme === "dark" ? dark : undefined),
                                elements: { avatarBox: { width: '2.5rem', height: '2.5rem'}}
                            }}/>
                         <ThemeToggleButton />
                        <Button onClick={() => setShowDialog(true)}>
                            <Plus size={20} className="mr-2"/>
                            Add Note
                        </Button>
                    </div>
                </div>
            </nav>
            <AddNoteDialog open={showDialog} setOpen={setShowDialog} />
            
        </>
    )
}