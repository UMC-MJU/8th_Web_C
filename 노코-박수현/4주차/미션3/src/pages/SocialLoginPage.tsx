export default function SocialLoginPage() {
    return (
        <>
            <div className="flex flex-row gap-3 border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm cursor-pointer">
                <img
                    src={`https://www.pngarts.com/files/4/Google-Transparent-Background-PNG.png`}
                    alt={`구글 이미지`}
                    className="w-[24px] h-[24px] object-cover rounded-xl"
                />
                <h3 className="px-15 text-center font-bold">구글 로그인</h3>
            </div>
        </>
    )
}
