import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from "swiper/modules";
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import RatingStars from './RatingStars'

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("LOgging response in rating", data);

            if(data?.success) {
                setReviews(data?.data);
            }

            console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);


  return (
    <div className='text-white w-full'>
        <div className='my-[50px] min-h-[190px] w-full max-w-maxContent mx-auto'>
            <Swiper
            spaceBetween={24}
            loop={true}
            // loop={reviews.length > 4}
            freeMode={true}
            autoplay={{
                delay: 2500,
            }}
            observer={true}
            observeParents={true}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full'
            >

                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index}>
    <div className='flex h-full w-[250px] flex-col gap-3 overflow-hidden rounded-lg border border-richblack-700 bg-richblack-800 p-4 text-[14px] text-richblack-25'>
        <div className='flex items-center gap-4'>
            <img
            src={review?.user?.image
             ? review?.user?.image
              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
              alt='Profile Pic'
              className='h-9 w-9 flex-shrink-0 rounded-full object-cover'
            />
            <div className='flex flex-col overflow-hidden'>
                <p className='truncate font-semibold text-richblack-5'>
                    {review?.user?.firstName} {review?.user?.lastName}
                </p>
                <p className='truncate text-[12px] text-richblack-400'>
                    {review?.course?.courseName}
                </p>
            </div>
        </div>

        <p className='font-medium text-richblack-25'>
            {review?.review.split(" ").length > truncateWords
                ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                : review?.review
            }
        </p>

        <div className='mt-1 flex flex-wrap items-center gap-2'>
            <span className='font-semibold text-yellow-100'>
                {review?.rating?.toFixed(1) || "0.0"}
            </span>
            <RatingStars Review_Count={review?.rating || 0} Star_Size={16} />
        </div>
    </div>
</SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider