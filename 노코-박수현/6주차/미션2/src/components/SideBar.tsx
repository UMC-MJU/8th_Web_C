import { useNavigate } from "react-router-dom";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SideBar({ isOpen, onClose }: SideBarProps) {
    const navigate = useNavigate();

    const handleGoPage = (page: string) => () => {
        navigate(page);
        onClose();
    };
    return (
        <aside
            className={`
        md:static
        top-0 left-0 h-full w-60 bg-gray-100 shadow-md z-40
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
        >

            <div className="p-6">
                <ul className="space-y-4 text-gray-800">
                    <li className="hover:text-pink-500 cursor-pointer" onClick={handleGoPage("/")}>홈</li>
                    <li className="hover:text-pink-500 cursor-pointer" onClick={handleGoPage("/my")}>마이페이지</li>
                </ul>
            </div>
        </aside >
    );
}