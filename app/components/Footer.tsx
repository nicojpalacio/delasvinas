import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"


const Footer = () => {
  return (
    <footer className="bg-tertiary">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Link href='/'>
            <Image src='/descarga.png' width={80} height={80} alt="" />
          </Link>
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum
          itaque neque.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a className="text-gray-700 transition hover:text-accent-hover" href="#"> Inicio </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-accent-hover" href="#"> Habitaciones </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-accent-hover" href="#"> Sobre Nosotros </a>
          </li>

          <li>
            <a className="text-gray-700 transition hover:text-accent-hover" href="#"> Contacto </a>
          </li>

        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
          <Link href='https://www.instagram.com/lasvinas/' target="_blank"  className="bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all">
              <FaInstagram />
                </Link>
          </li>

          <li>
          <Link href='https://www.facebook.com/vinasenflor/' target="_blank"  className="bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all">
              <FaFacebook />
                </Link>
          </li>
          <li>
          <Link href='https://www.facebook.com/vinasenflor/' target="_blank"  className="bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all">
              <FaWhatsapp />
                </Link>
          </li>
         
        </ul>
      </div>
    </footer>
  )
}

export default Footer