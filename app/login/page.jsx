
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import 'flowbite';
export default function Login() {
  return (

   

    <div className="flex h-screen bg-green-500">
       <Image
    src="/assets/image/login.png"
    alt="Deskripsi gambar"
    width={200} // lebar gambar dalam piksel
    height={2} // tinggi gambar dalam piksel
    
  />
      <Head>
        <title>Login - HRIS CORPS</title>
      </Head>
      <div className="m-auto bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-left text-2xl font-bold mb-6">
          Welcome to 
          <p className="text-green-500 font-bold mb-4">HRIS CORPS </p>
        </h2>

       
        
        <form>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
             <a href="/home">Login</a>
          </button>
          
        </form>
      </div>
    </div>
  );
}
