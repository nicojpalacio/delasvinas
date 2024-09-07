import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { DialogTitle } from '@radix-ui/react-dialog'; // Asegúrate de que el componente esté correctamente importado
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
// Si deseas ocultar el título

const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Habitaciones', path: '/rooms' },
    { name: 'Vinos', path: '/wines' },
    { name: 'Sobre Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
];

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger className='text-2xl text-primary flex items-center'>
        <FaBars />
      </SheetTrigger>
      <SheetContent side='left' className='flex justify-center items-center'>
        {/* Agrega un DialogTitle aquí para mejorar la accesibilidad */}
        <DialogTitle>
          
        </DialogTitle>

        <nav className='flex flex-col gap-8 text-center'>
          {links.map((link, index) => (
            <SheetClose asChild key={index}>
              <Link href={link.path} className='text-2xl font-primary text-primary hover:text-accent-hover transition-all'>
                {link.name}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;