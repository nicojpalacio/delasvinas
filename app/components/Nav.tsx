'use client'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'

const links = [
  { name: 'Inicio', path: '/' },
  { name: 'Habitaciones', path: '/rooms' },
  { name: 'Vinos', path: '/wines' },
  { name: 'Sobre nosotros', path: '/aboutus' },
  { name: 'Contacto', path: '/contact' },
]

const Nav = ({ isUserAuthenticated }: { isUserAuthenticated: boolean }) => {
  const pathname = usePathname()

  return (
    <nav>
      <ul className='flex flex-col lg:flex-row gap-6'>
        {links.map((link, index) => {
          // Check if the current link is active
          const isActive =
            pathname === link.path ||
            (link.path === '/rooms' && pathname.startsWith('/room'))

          return (
            <li key={index}>
              <Link
                href={link.path}
                className={`font-bold text-[13px] uppercase tracking-[3px] hover:text-accent-hover transition-all ${isActive ? 'text-accent' : ''}`}
              >
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>

      {!isUserAuthenticated && pathname === '/dashboard' && redirect('/')} 
    </nav>
  )
}

export default Nav