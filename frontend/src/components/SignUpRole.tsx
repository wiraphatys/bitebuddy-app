'use client'

import { useRouter } from 'next/navigation'
import styles from './signuprole.module.css'


function SignUpRole() {

    const router = useRouter();

    const handleSelectClick = (role: string) => {
        router.push(`/register/${role}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>WHO ARE YOU?</div>
            <div className={styles.buttonRow}>
                <button className={styles.button} onClick={() => handleSelectClick('user')}>User</button>
                <button className={styles.button} onClick={() => handleSelectClick('owner')}>Owner</button>
            </div>
        </div>
    );
}
export default SignUpRole;