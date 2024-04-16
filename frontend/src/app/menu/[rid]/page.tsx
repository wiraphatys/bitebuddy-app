import MenuSlider from "@/components/MenuSlider";
import styles from './menupage.module.css'

export default async function MenuPage({params}: {params:{rid:string}}) {
    return (
        <div className={styles.page}>
            <h1>Menu</h1>
            <MenuSlider rid={params.rid}/>
        </div>
    );
}