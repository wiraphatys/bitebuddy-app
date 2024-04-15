import MenuSlider from "@/components/MenuSlider";
import styles from './menupage.module.css'

export default async function MenuPage({params}: {params:{rid:string}}) {
    return (
        <div className={styles.page}>
            <h1>Menu</h1>
            <a href="/restaurants/owner/create"><button className={styles.createButton}>Create Your Restaurant</button></a>
            <MenuSlider rid={params.rid}/>
        </div>
    );
}