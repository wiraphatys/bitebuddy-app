import RestaurantDetail from "@/components/RestaurantDetail";
import styles from '../page.module.css'

export default async function update({params}:{params:{rid:string}}) {
    return (
        <div className={styles.page}>
            <RestaurantDetail rid={params.rid}/>
        </div>
    );
}