// import React from "react";
// import { Link } from "react-router-dom";

// export default function Error() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center">

//       <h1 className="text-8xl font-bold text-yellow-50">
//         404
//       </h1>

//       <p className="mt-4 text-xl text-richblack-300">
//         Page Not Found
//       </p>

//       <Link
//         to="/"
//         className="mt-8 rounded-md bg-yellow-50 px-6 py-3 font-semibold text-richblack-900"
//       >
//         Go Home
//       </Link>

//     </div>
//   );
// }


import React from 'react'

const Error = () => {
  return (
    <div className='flex justify-center items-center text-3xl text-white'>
      Error - 404 Not found
    </div>
  )
}

export default Error
