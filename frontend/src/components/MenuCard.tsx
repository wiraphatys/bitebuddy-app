'use client'

export default function MenuCard({ name, img, description }: { name: string; img: string; description: string }) {
    return (
        <div className="w-[380px] md:w-[729px] h-[478px] md:h-[436px] bg-[#F0F0F0] rounded-[24px] flex flex-col md:flex-row items-center md:items-start">
            <img
                src={img}
                className="w-[332px] md:w-[346px] h-[191px] md:h-[265px] bg-gray-300 rounded-[24px] mt-[24px] md:mt-[24px] md:ml-[24px]"
            />
            <div className="mt-[16px] md:mt-[32px] md:ml-[24px] flex-grow">
                {/* title */}
                <div>
                    <h1 className="text-black text-[18px] md:text-[28px] font-medium">{name}</h1>
                    <hr className="mr-6 border border-gray-400" />
                </div>
                {/* description */}
                <div className="mt-[16px] md:mt-[32px]">
                    <h1 className="text-black text-[16px] md:text-[19px] font-medium">Description</h1>
                    <div className="w-[332px] md:w-[311px] h-[93px] md:h-[146px] border border-gray-400 rounded-[4px] mt-[8px] p-3">
                        <p className="text-gray-600 text-[11px] md:text-[14px]">{description}</p>
                    </div>
                </div>
                <div className="text-end mt-[10px] md:mt-[10px] md:mr-[20px]">
                    <button
                        className="mt-[12px] md:mt-[70px] w-[78px] md:w-[138px] h-[28px] md:h-[43px] rounded-[40px] 
              bg-transparent border-2 border-[#333333] 
              text-[#333333] text-[11px] md:text-[18px]"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}