import { useEffect, useState } from "react";
import { MeAPI, patchMyInfoAPI } from "../api/MeAPI";
import { DelAPI } from "../api/DelAPI";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react"; 
import { useMutation } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner"; 

export default function MyPage(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState<string>(""); 
  const [avatar, setAvatar] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false); 

  const { logout, user, updateUser } = useAuth(); 
  const navigate = useNavigate(); 


  const patchMutation = useMutation({
    mutationFn: patchMyInfoAPI,
    onMutate: async (newData) => {
      updateUser({ name: newData.name });
      setName(newData.name);
      setBio(newData.bio);
      setAvatar(newData.avatar);

      return { previousUser: { name: user?.name || "", bio: user?.bio || "", avatar: user?.avatar || "" } };
    },
    onSuccess: (data) => {
      alert("회원 정보가 수정되었습니다.");
      setEditMode(false); 
    },
    onError: (error, newData, context) => {
      if (context?.previousUser) {
        updateUser({
          name: context.previousUser.name,
          bio: context.previousUser.bio,
          avatar: context.previousUser.avatar
        });
        setName(context.previousUser.name);
        setBio(context.previousUser.bio);
        setAvatar(context.previousUser.avatar);
      }
      alert("회원 정보 수정에 실패했습니다.");
      console.error("회원 정보 수정 실패:", error);
    }
  });

  // 회원 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await MeAPI(); 
        setName(userData.name || "");
        setEmail(userData.email || ""); 
        setBio(userData.bio || "");
        setAvatar(userData.avatar || "");
      } catch (error) {
        console.error("유저 정보 가져오기 실패:", error);
      }
    };

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
      setAvatar(user.avatar || "");
    }

    fetchUserInfo();
  }, [user]); 


  // 회원 탈퇴 함수
  const DeleteAccount = async () => {
    if (window.confirm("정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      try {
        // 회원 탈퇴 API 호출
        await DelAPI();
        logout();
        navigate("/");
        alert("회원 탈퇴가 완료되었습니다.");
      } catch (error) {
        console.error("회원 탈퇴 실패: ", error);
        alert("회원 탈퇴에 실패했습니다.");
      }
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
        alert("이름은 비워둘 수 없습니다.");
        return;
    }
     if (patchMutation.isLoading) return; 

    // 뮤테이션 실행
    patchMutation.mutate({
      name: name.trim(),
      bio: bio.trim(), 
      avatar: avatar.trim() 
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#212529] text-white p-6 rounded-lg mx-auto my-12 max-w-md space-y-6">

      {/* 프로필 */}
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#212529] flex justify-center items-center bg-gray-700">
         {avatar ? (
            <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
         ) : (
            <CircleUserRound size={80} className="text-gray-400" />
         )}
      </div>


      {/* 이름 입력  */}
      <div className="w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">이름</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-500 focus:outline-none ${
              editMode ? 'focus:ring-1 focus:ring-[#F0648C] border border-[#F0648C]' : 'border border-gray-600 cursor-not-allowed'
            }`}
            placeholder="이름을 입력하세요"
            disabled={!editMode || patchMutation.isLoading} // 수정 모드가 아니거나 로딩 중이면 비활성화
          />
           {patchMutation.isLoading && <div className="mt-1 text-center"><TailSpin height="20" width="20" color="#F0648C" ariaLabel="loading"/></div>}
      </div>


      {/* 이메일 */}
       <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">이메일</label>
           <input
            id="email"
            type="email" 
            value={email}
            disabled 
            className="w-full px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-500 border border-gray-600 cursor-not-allowed opacity-70"
            placeholder="이메일"
          />
      </div>


      {/* 소개 */}
      <div className="w-full">
           <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">소개</label>
          <textarea 
            id="bio"
            placeholder="소개글을 입력하세요"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-500 focus:outline-none min-h-[80px] ${ // 최소 높이 지정
              editMode ? 'focus:ring-1 focus:ring-[#F0648C] border border-[#F0648C]' : 'border border-gray-600 cursor-not-allowed'
            }`}
            disabled={!editMode || patchMutation.isLoading} 
          />
      </div>

       {/* 프로필  */}
       <div className="w-full">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-300 mb-1">프로필 이미지 URL</label>
           <input
            id="avatar"
            type="text"
            placeholder="프로필 이미지 URL을 입력하세요"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className={`w-full px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-500 focus:outline-none ${
              editMode ? 'focus:ring-1 focus:ring-[#F0648C] border border-[#F0648C]' : 'border border-gray-600 cursor-not-allowed'
            }`}
            disabled={!editMode || patchMutation.isLoading} 
          />
       </div>

      <div className="flex gap-x-4 mt-6"> 
        {!editMode ? (
          <button
            className="text-sm border border-gray-500 rounded px-4 py-2 bg-black hover:bg-[#F0648C] hover:border-[#F0648C] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setEditMode(true)}
             disabled={patchMutation.isLoading} 
          >
            정보 수정
          </button>
        ) : (
          <>
            <button
              className="text-sm border border-gray-500 rounded px-4 py-2 bg-black hover:bg-[#F0648C] hover:border-[#F0646C] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
               disabled={patchMutation.isLoading} 
            >
               {patchMutation.isLoading ? '저장 중...' : '수정 완료'} 
            </button>
            <button
              className="text-sm border border-gray-500 rounded px-4 py-2 bg-black hover:bg-gray-600 hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setEditMode(false)}
               disabled={patchMutation.isLoading} 
            >
              취소
            </button>
          </>
        )}
      </div>
    </div>
  );
}
