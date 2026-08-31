import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BsChevronDown } from 'react-icons/bs';
import { VscCheck } from 'react-icons/vsc';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        console.log("I am inside Add handleAddReview")
        setReviewModal(true);
    }

  return (
    <>
        <div className='flex h-[calc(100vh-3.5rem)] w-[320px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 text-white'>
            {/* for buttons and headings */}
            <div className='flex flex-col gap-4 border-b-[1px] border-b-richblack-700 p-5'>
                {/* for buttons */}
                <div className='flex items-center justify-between'>
                    <div
                    onClick={()=> {
                        navigate("/dashboard/enrolled-courses")
                    }}
                    className='flex cursor-pointer items-center gap-2 text-richblack-100 hover:text-richblack-25'
                    >
                        <MdOutlineArrowBackIosNew size={20}/>
                        <span>Back</span>
                    </div>

                    <div>
                        <IconBtn
                            text="Add Review"
                            onclick={() => handleAddReview()}
                            customClasses="text-sm !py-[6px]"
                            type="button" 
                        />
                    </div>

                </div>
                {/* for heading or title */}
                <div className='flex flex-col gap-1'>
                    <p className='text-lg font-semibold text-richblack-5'>
                        {courseEntireData?.courseName}
                    </p>
                    <p className='text-sm font-medium text-yellow-25'>
                        {completedLectures?.length} / {totalNoOfLectures}
                    </p>
                </div>
            </div>

            {/* for sections and subSections */}
            <div className='flex-1 overflow-y-auto'>
                {
                    courseSectionData.map((course, index)=> (
                        <div
                        className='border-b-[1px] border-b-richblack-700'
                        key={index}
                        >

                            {/* section */}

                            <div
                            onClick={() => setActiveStatus(
                                activeStatus === course?._id ? "" : course?._id
                            )}
                            className='flex cursor-pointer items-center justify-between bg-richblack-700 px-5 py-4'
                            >
                                <div className='text-sm font-semibold text-richblack-5'>
                                    {course?.sectionName}
                                </div>
                                <span
                                className={`transition-transform duration-200 ${
                                    activeStatus === course?._id ? "rotate-180" : "rotate-0"
                                }`}
                                >
                                    <BsChevronDown />
                                </span>
                            </div>

                            {/* subSections */}
                            <div>
                                {
                                    activeStatus === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic, index) => (
                                                    <div
                                                    className={`flex cursor-pointer items-center gap-3 px-5 py-4 transition-all duration-150 ${
                                                        videoBarActive === topic._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-richblack-100 hover:bg-richblack-800"
                                                    }`}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                        )
                                                        setVideoBarActive(topic?._id);
                                                    }}
                                                    >
                                                        <span
                                                        className={`grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border ${
                                                            completedLectures.includes(topic?._id)
                                                            ? "border-green-400 bg-green-400 text-richblack-900"
                                                            : "border-richblack-400"
                                                        }`}
                                                        >
                                                            {completedLectures.includes(topic?._id) && (
                                                                <VscCheck size={14} />
                                                            )}
                                                        </span>
                                                        <span className='text-sm'>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar
