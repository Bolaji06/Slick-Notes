
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateNoteSchema, createNoteSchema } from '@/app/lib/note-validation'
import { useForm } from 'react-hook-form';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter} from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import LoadingButton from './ui/loading-button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';


interface AddNoteDialogPros { 
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function AddNoteDialog({ open, setOpen } : AddNoteDialogPros){

    const router = useRouter()

    const { toast } = useToast()

    const form = useForm<CreateNoteSchema>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: "",
            content: "",        }
    })

    async function onSubmit(input: CreateNoteSchema){
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify(input)
            });
            if (!response.ok) throw  Error("Status code " + response.status);
            form.reset();
            router.refresh();
            setOpen(false);
            
            
        }catch(error){
            toast({
                title: 'Something happened!',
                description: "Error"
            })
        }
        //alert(input)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Note</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                            <FormField 
                                control={form.control}
                                name='title'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Note title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Note Title" 
                                            {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            <FormField 
                                control={form.control}
                                name='content'
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Note Content</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Note Content" 
                                            {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            <DialogFooter>
                                <LoadingButton type='submit' isloading={form.formState.isSubmitting}>
                                    Submit
                                </LoadingButton>
                            </DialogFooter>
                        </form>

                    </Form>
                   
                </DialogContent>
            </Dialog>
        </>
    )
}