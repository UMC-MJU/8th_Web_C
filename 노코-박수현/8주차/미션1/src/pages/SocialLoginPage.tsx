const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`;
}

export default function SocialLoginPage() {
    return (
        <>
            <button type="button" onClick={handleGoogleLogin} className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm cursor-pointer">
                <div className="flex flex-row gap-3">
                    <img
                        src={`https://www.pngarts.com/files/4/Google-Transparent-Background-PNG.png`}
                        alt={`구글 이미지`}
                        className="w-[24px] h-[24px] object-cover rounded-xl"
                    />
                    <h3 className="px-15 text-center font-bold">구글 로그인</h3>
                </div>
            </button>
        </>
    )
}
