
import { error } from 'console';

import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from '@/app/lib/note-validation';
import { auth } from '@clerk/nextjs'

// add note to db
export async function POST(req: Request){
    try {
        const body = await req.json();

        const parseResult = createNoteSchema.safeParse(body);

        if (!parseResult.success) {
               console.error(parseResult.error);
               return Response.json({error: "Invalid input"}, {status: 400})
        }

        const { title, content } = parseResult.data;

        const { userId } = auth();
        if (!userId) {
            return Response.json({error: "Unauthorized"}, {status: 401});
        }

        const note = await prisma?.note.create({
            data: {
                title,
                content,
                userId,
            }
        })
        return Response.json({note}, { status: 201})

    }catch(error) {
        console.error(error)
        return Response.json({ error: "Internal Serval Error"},
        { status: 500})
    }
}

export async function PUT(req: Request){
    try {
        const body = await req.json();

        const parseResult = updateNoteSchema.safeParse(body);

        if (!parseResult.success) {
            console.error(parseResult.error);
            return Response.json({ error: "Invalid input" }, { status: 400 });
        }

        const { id, title, content } = parseResult.data;

        const note = await prisma?.note.findUnique({ where: { id }});

        if (!note){
            return Response.json({ error: "Note not found" }, { status: 404 });
        }

        const { userId } = auth();

        if (!userId || userId !== note.userId) {
            return Response.json({ error: "Unauthorized" }, { status: 401});
        }
        const updatedNote = await prisma?.note.update({
            where: {id},
            data: {
                title,
                content,
            }
        });
        return Response.json({ updatedNote }, { status: 200});


    }catch(error){
        console.log(error);
        Response.json({ error: "Error"}, { status: 500 })
    }
}

export async function DELETE(req : Request){

    try {
        const body = await req.json();

        const parseResult = deleteNoteSchema.safeParse(body);

        if (!parseResult.success) {
            console.error(parseResult.error);
            return Response.json({ error: "Error deleting"}, { status: 400 });
        }
        const { id } = parseResult.data;

        const note = await prisma?.note.findUnique({ where: { id }});

        if (!note) {
            return Response.json({ error: "Note not found"}, { status: 404 });
        }

        const { userId } = auth();

        if (!userId || userId !== note.userId){
            return Response.json({ error: "Unauthorized"}, { status: 401 });
        }

       await prisma?.note.delete({ where: { id }});
       return Response.json({ message: "Note deleted successfully" }, { status: 200 });

    }catch(error){
        console.error(error);
        Response.json({ error: "Failed to delete" }, { status: 500 });
    }
}