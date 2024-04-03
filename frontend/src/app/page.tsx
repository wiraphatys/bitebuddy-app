import Image from "next/image";
import styles from './page.module.css'
import DateValidationShouldDisableDate from "@/components/Calendar";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.leftBlock}>
          <Image src="/img/logo.png" alt='icon' width={100} height={100} objectFit="contain"/>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nisi perferendis nemo.
          </div>
          <button>
            explore now
          </button>
        </div>
        <div className={styles.rightBlock}>
          <Image src="/img/logo.png" alt='icon' layout='fill' objectFit="contain"/>
        </div>
      </div>
    </main>
  );
}
