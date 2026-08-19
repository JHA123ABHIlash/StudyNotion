// import React from "react";

// export default function ConfirmationModal({ modalData }) {
//   if (!modalData) return null;

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="w-11/12 max-w-md rounded-lg border border-richblack-700 bg-richblack-800 p-6">

//         {/* Title */}
//         <h2 className="text-2xl font-semibold text-richblack-5">
//           {modalData.title}
//         </h2>

//         {/* Message */}
//         <p className="mt-3 text-richblack-300">
//           {modalData.text}
//         </p>

//         {/* Buttons */}
//         <div className="mt-8 flex justify-end gap-4">

//           <button
//             onClick={modalData.btn1Handler}
//             className="rounded-md bg-richblack-600 px-5 py-2 font-medium text-richblack-5 transition-all duration-200 hover:bg-richblack-500"
//           >
//             {modalData.btn1Text}
//           </button>

//           <button
//             onClick={modalData.btn2Handler}
//             className="rounded-md bg-pink-200 px-5 py-2 font-medium text-richblack-900 transition-all duration-200 hover:bg-pink-300"
//           >
//             {modalData.btn2Text}
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }

import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}