import MenuSlider from "@/components/MenuSlider";
import getMenu from "@/libs/getMenus";

export default async function RestaurantPage({params}: {params : {rid: string}}) {
    const menus = await getMenu(params.rid)

    return (
        <div>
            <MenuSlider menusJson={menus}/>
        </div>
    );
}