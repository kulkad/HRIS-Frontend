"use client";

import Link from "next/link";
import React, { useState } from "react";

const UserAreaSelectBox = () => {
   const [open, setOpen] = useState(false);

   return (
      <>
         <div className="flex flex-col justify-center items-center relative z-10">
               <span className="p-1 rounded-lg">
                  Adit Paku Bumi
               </span>
         </div>
      </>
   );
};

export default UserAreaSelectBox;
