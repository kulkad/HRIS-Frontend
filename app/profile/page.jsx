// pages/profile.js
import { FaBox, FaCalendarAlt, FaTags, FaWallet, FaQuestionCircle, FaBriefcase, FaGlobe, FaBookmark, FaChevronRight, FaAccessibleIcon, FaUserFriends, FaBell, FaShieldAlt, FaUserCog } from 'react-icons/fa';

export default function Profile() {
  const menuItems = [
    { icon: FaBox, text: 'Pesanan', description: 'Cek riwayat & pesanan aktif' },
    { icon: FaCalendarAlt, text: 'Langgananku', new: true },
    { icon: FaTags, text: 'Promo' },
    { icon: FaWallet, text: 'Metode Pembayaran' },
    { icon: FaQuestionCircle, text: 'Pusat bantuan' },
    { icon: FaBriefcase, text: 'Profil bisnis' },
    { icon: FaGlobe, text: 'Pilihan bahasa' },
    { icon: FaBookmark, text: 'Alamat favorit' },
    { icon: FaAccessibleIcon, text: 'Aksesibilitas', new: true },
    { icon: FaUserFriends, text: 'Ajak teman, dapat voucher' },
    { icon: FaBell, text: 'Notifikasi' },
    { icon: FaShieldAlt, text: 'Keamanan akun', new: true },
    { icon: FaUserCog, text: 'Atur akun' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Profilku</h1>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Akun</h2>
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <item.icon className="text-2xl text-gray-700" />
                  <div>
                    <p className="font-semibold">{item.text}</p>
                    {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                  </div>
                </div>
                {item.new && <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-full">Baru</span>}
                {!item.new && <FaChevronRight className="text-gray-400" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
