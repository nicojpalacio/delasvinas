import Link from "next/link"
import Image from "next/image"
import { FaInstagram, FaFacebook } from 'react-icons/fa'

const socials = [
  { icon: <FaInstagram />, href: 'https://www.instagram.com/lasvinas/'},
  { icon: <FaFacebook />, href: 'https://www.facebook.com/vinasenflor/' }
]
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import { Button } from "@/components/ui/button"
import Dropdown from "./Dropdown"
import MobileNav from "./MobileNav"
import Nav from "./Nav"
const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  const user = await getUser()

  return (
    <header className="py-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">
          <div className="flex items-center gap-5 justify-center xl:w-max">
            <Link href='/'>
              <Image src='/isologo.jpg' width={160} height={160} alt="" />
            </Link>
            <div className="w-[1px] h-[40px] bg-gray-300"></div>
            <div className="flex gap-2">
              {socials.map((item, index) => {
                return <Link href={item.href} target="_blank" key={index} className="bg-accent text-white hover:bg-accent-hover text-sm w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all">
                  {item.icon}
                </Link>
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-8 xl:w-max">
            <div className=" flex items-center gap-2 xl:order-2">
              {isUserAuthenticated ? (
                <Dropdown user={user} />
              ) : (
                <div className="flex gap-2">
                  <LoginLink>
                    <Button variant='primary'>Sign In</Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button>Register</Button>
                  </RegisterLink>
                </div>
              )}
            </div>
            <div className="xl:hidden">
              <MobileNav/>
            </div>
            <div className="hidden xl:flex ">
              <Nav isUserAuthenticated = {isUserAuthenticated}/>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header