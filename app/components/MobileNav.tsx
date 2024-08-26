'use client'

import { Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import Link from 'next/link'

import { FaBars } from 'react-icons/fa'

const links = [
    {
        name:'Inicio',
        path:'/'
    },
    {
        name:'Habitaciones',
        path:'/rooms'
    },
    {
        name:'Home',
        path:'/'
    },
    {
        name:'Home',
        path:'/'
    },
    {
        name:'Home',
        path:'/'
    },
]

const MobileNav = () => {
  return (
    <Sheet>
        <SheetTrigger className='text-2xl text-primary flex items-center'>
            <FaBars/>
        </SheetTrigger>
        <SheetContent side='left' className='flex justify-center items-center'>
            <nav className='flex flex-col gap-8 text-center'>
                {links.map((link, index)=>{
                    return <Link href={link.path} key={index} className='text-2xl font-primary text-primary hover:text-accent-hover transition-all'>
                        {link.name}
                        </Link>
                })}
            </nav>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav