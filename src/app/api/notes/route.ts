
import { error } from 'console';

import { createNoteSchema } from '@/app/lib/note-validation';
import { auth } from '@clerk/nextjs'

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