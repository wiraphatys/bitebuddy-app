import MenuSlider from "@/components/MenuSlider";
import styles from '../restaurants/owner/ownerpage.module.css'

export default async function MenuPage({params}: {params:{rid:string}}) {
    <div className={styles.page}>
            <h1>Menu</h1>
            <MenuSlider rid={params.rid}/>
    </div>
}