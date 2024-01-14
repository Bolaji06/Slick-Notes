
import { Metadata } from "next"
import prisma from "@/lib/db/prisma"
import { auth } from '@clerk/nextjs' 
import Note from "@/components/Note"

export const metadata: Metadata = {
    title: "Slick-Notes"
}

export default async function NotePage(){

    const { userId } = auth()

    if (!userId) throw Error("userId undefined");

    const allNotes = await prisma?.note.findMany({where: { userId }})

    return (
        <>
           <section className="grid grid-col-1 md:grid-cols-2  gap-3 lg:grid-cols-3">
            {
                allNotes.map((note) => {
                    return <Note key={note.id} note={note}/>
                })
            }
            {allNotes.length === 0 && (
            <div className="col-span-full text-center">
                <h1 className="text-3xl">Your note is currently empty</h1>
            </div>)}
           </section>
        </>
    )
}