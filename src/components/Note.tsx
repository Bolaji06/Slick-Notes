
import { Note as NoteModel } from '@prisma/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface NoteProps {
    note: NoteModel
}

export default function Note({ note } : NoteProps) {
    const wasUpdated = note.updatedAt > note.createdAt;

    const createUpdatedAtTimestamp = (
        wasUpdated ? note.updatedAt : note.createdAt
    ).toDateString();

    return (
        <>
            
                <Card>
                <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription>
                        {createUpdatedAtTimestamp}
                        {wasUpdated && 'updated'}
                    </CardDescription>
                </CardHeader> 
                    <CardContent>
                        <p className='whitespace-pre-line'>
                            {note.content}
                        </p>
                    </CardContent>
                </Card>
            
            
        </>
    )

}