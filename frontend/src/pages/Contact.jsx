// import React from "react";

// export default function Contact() {
//   return (
//     <div className="mx-auto max-w-7xl px-6 py-16">

//       <h1 className="text-4xl font-bold text-richblack-5">
//         Contact Us
//       </h1>

//       <p className="mt-5 text-richblack-300">
//         Email : support@studynation.com
//       </p>

//       <p className="mt-2 text-richblack-300">
//         Phone : +91 9876543210
//       </p>

//       <p className="mt-2 text-richblack-300">
//         Address : India
//       </p>

//     </div>
//   );
// }


import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  )
}

export default Contact;