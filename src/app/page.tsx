import Image from 'next/image'

import logo from '../../public/assets/logo.png'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect user to the notes page when logged in already
  const { userId } = auth();
  
  if (userId) redirect('/notes')

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <Image 
        src={logo}
        alt='Slick Notes Logo'
        width={200}/>

        <div className='max-w-3xl py-8 flex flex-col justify-center
         items-center gap-8 px-6'>
          <h1 className='text-center'>
            Experience the future of note-taking with Slick-Notes AI-driven insights.
             Receive intelligent suggestions, automated categorization, and smart search capabilities,
            allowing you to uncover valuable connections within your notes effortlessly.
          </h1>

          <div>
            <Button asChild>
              <Link href={'/notes'}>
                Take Note <ArrowRight size={20} className='ml-3'/>
              </Link>
            </Button>
          </div>
        </div>

    </main>
  )
}
