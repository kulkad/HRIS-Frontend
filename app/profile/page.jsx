import { FaBox, FaTags, FaChevronRight, FaRegEdit } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import { IoLogOutOutline } from "react-icons/io5";

export default function Profile() {
  const menuItems = [
    {
      icon: FaBox,
      text: "Pesanan",
      description: "Cek riwayat & pesanan aktif",
    },
    { icon: FaTags, text: "Detail Akun", link: "/detailuser" },
    { icon: FiEdit3, text: "Edit Profile", link: "/edit-data" },
    { icon: IoLogOutOutline, text: "Logout", link: "/logout" },
  ];

  return (
    <div className="w-full size-full min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Profilku</h1>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Akun</h2>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <Link href={item.link || "#"} passHref>
                  <div className="flex items-center space-x-4">
                    <item.icon className="text-2xl text-gray-700" />
                    <div>
                      <p className="font-semibold">{item.text}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
                {!item.new && <FaChevronRight className="text-gray-400" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
