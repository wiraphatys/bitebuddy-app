import OverallRating from "@/components/OverallRating";
import ReviewSlider from "@/components/ReviewSlider";
import styles from '../../menu/[rid]/menupage.module.css'

export default async function ReviewPage({params}: {params:{rid:string}}) {
    return (
        <div className={styles.page}>
            <h1>Review</h1>
            <div className="flex justify-center mb-10">
                <OverallRating rid={params.rid}/>
            </div>
            <ReviewSlider rid={params.rid}/>
        </div>
    );
}