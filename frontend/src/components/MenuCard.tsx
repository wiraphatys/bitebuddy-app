'use client'

export default function MenuCard({name, img, description} : {name: string, img: string, description: string}) {
    return (
        <div className="w-[729px] h-[436px] bg-[#F0F0F0] rounded-[24px] flex">
            <div className="w-[346px] h-[265px] bg-gray-300 rounded-[24px] mt-[24px] ml-[24px]">
                {/* paste the img here */}
            </div>
            <div className="mt-[32px] ml-[24px]">
                {/* title */}
                <div>
                    <h1 className="text-black text-[28px] font-medium">{name}</h1>
                    <hr className="border border-gray-400" />
                </div>
                {/* description */}
                <div className="mt-[32px]">
                    <h1 className="text-black text-[19px] font-medium">Description</h1>
                    <div className="w-[311px] h-[146px] border border-gray-400 rounded-[4px] mt-[8px] p-3">
                        <p className="text-gray-600 text-[14px]">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="text-end">
                    <button className="btn btn-outline border-2 border-[#333333] text-[18px] text-[#333333] w-[138px] h-[43px] rounded-[40px] mt-[80px]">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}