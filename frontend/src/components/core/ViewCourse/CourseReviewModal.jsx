import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import { RxCross2 } from 'react-icons/rx';
import { AiFillStar } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';


const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state)=> state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(()=> {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[])

    const ratingChanged = (newRating) => {
        setRating(newRating);
        setValue("courseRating", newRating);
    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    }

  return (
    <div className='fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white/10 '>
        <div className='my-10 w-11/12 max-w-[500px] rounded-lg border border-richblack-400 bg-richblack-800'>
            {/* Modal header */}
            <div className='flex items-center justify-between rounded-t-lg border-b border-richblack-400 p-5'>
                <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
                <button
                onClick={() => setReviewModal(false)}
                >
                    <RxCross2 className='text-2xl text-richblack-5' />
                </button>
            </div>

            {/* Modal Body */}
            <div className='p-6'>

                <div className='flex items-center justify-center gap-x-4'>
                    <img 
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square  w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p className='font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-sm text-richblack-300'>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center'>

                    <div className='flex gap-2'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <AiFillStar
                                key={star}
                                size={28}
                                className='cursor-pointer transition-colors'
                                color={star <= (hoverRating || rating) ? "#ffd700" : "#2C333F"}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => ratingChanged(star)}
                            />
                        ))}
                    </div>

                    <div className='mt-6 flex w-full flex-col space-y-2'>
                        <label htmlFor='courseExperience' className='text-sm text-richblack-5'>
                            Add Your Experience <sup className='text-pink-200'>*</sup>
                        </label>
                        <textarea 
                            id='courseExperience'
                            placeholder='Share Details of your own experience for this course'
                            {...register("courseExperience", {required:true})}
                            className='form-style min-h-[130px] w-full resize-none rounded-md border-0 bg-richblack-700 p-3 text-richblack-5 placeholder-richblack-400 focus:outline-2 focus:outline-yellow-50'
                        />
                        {
                            errors.courseExperience && (
                                <span className='ml-2 text-xs tracking-wide text-pink-200'>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div className='mt-6 flex w-full items-center justify-end gap-x-4'>
                        <button
                        type='button'
                        onClick={() => setReviewModal(false)}
                        className='rounded-md bg-richblack-300 px-4 py-2 font-semibold text-richblack-900'
                        >
                            Cancel
                        </button>
                        <IconBtn
                            text="Save Edits"
                            type="submit"
                        />
                    </div>


                </form>

            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal