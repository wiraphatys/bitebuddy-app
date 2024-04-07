import Image from "next/image";
import styles from "./topmenu.module.css"
import Link from "next/link";

export default function TopMenu() {
    return (
        <div className={styles.menucontainer}>
            <div className={styles.containerleft}>
                <Link href='/'>
                    <Image src="/img/logo.png" alt='icon' height={80} width={50}/>
                </Link>
            </div>
            <div className={styles.containerright}>
                <div>
                    icon
                </div>
                <div>
                    navbar
                </div>
            </div>
        </div>
    );
}