import Image from "next/image";
import { fetchUserInfo } from "@/api/userInfo/UserApi";

const Header = async () => {
  const userInfo = await fetchUserInfo();
  return (
    <>
      <div className="min-w-[1200px] h-[55px] flex justify-between items-center border-b border-gray-200 pr-[12px]">
        <a href="/">
          <Image src="/logo.png" width="90" height="30" alt="" />
        </a>
        <div>{userInfo?.name}</div>
      </div>
    </>
  );
};

export default Header;
