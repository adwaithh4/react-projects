
import logoImg from'@/assets/logo.png';
import Image from 'next/image';
import classes from './main-header.module.css'
import NavLink from './nav-link';
import Link from 'next/link';

export default function MainHeader(){
   
    return(
    <header className={classes.header}>
        <Link href="/" className={classes.logo}>
            <Image src={logoImg} alt="A Plate with food on it"/>
           Los Pollos 
        </Link>
        <nav className={classes.nav}>
            <ul>
                <li>
                   <NavLink href="/meals"> Browse Meals </NavLink>
                </li>
                <li>
                   <NavLink href="/community"> Foodies Community</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )  
}