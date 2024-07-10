import Image from 'next/image';
import { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-sm bg-gray-800 rounded-full focus:outline-none"
          id="dropdownUserAvatarButton"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="/assets/images/windah.jpg"
            alt="user photo"
            width={20}
            height={20}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Jahdan Kopling</div>
            <div className="font-medium truncate">jkopsling@gmail.com</div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Dropdown;
