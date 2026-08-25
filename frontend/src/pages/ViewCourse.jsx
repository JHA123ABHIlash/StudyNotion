// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
// import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

// const ViewCourse = () => {

//     const [reviewModal, setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const dispatch = useDispatch();

//     useEffect(()=> {
//         const setCourseSpecificDetails = async() => {
//               const courseData = await getFullDetailsOfCourse(courseId, token);
//               dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//               dispatch(setEntireCourseData(courseData.courseDetails));
//               dispatch(setCompletedLectures(courseData.completedVideos));
//               let lectures = 0;
//               courseData?.courseDetails?.courseContent?.forEach((sec) => {
//                 lectures += sec.subSection.length
//               })  
//               dispatch(setTotalNoOfLectures(lectures));
//         }
//         setCourseSpecificDetails();
//     },[]);


//   return (
//     <>
//         <div>
//             <VideoDetailsSidebar setReviewModal={setReviewModal} />
//             <div>
//                 <Outlet />
//             </div>
//             {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
//         </div>
        
//     </>
//   )
// }

// export default ViewCourse




// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
// import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

// const ViewCourse = () => {

//     const [reviewModal, setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const dispatch = useDispatch();

//     useEffect(()=> {
//         const setCourseSpecificDetails = async() => {
//               const courseData = await getFullDetailsOfCourse(courseId, token);
//               dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//               dispatch(setEntireCourseData(courseData.courseDetails));
//               dispatch(setCompletedLectures(courseData.completedVideos));
//               let lectures = 0;
//               courseData?.courseDetails?.courseContent?.forEach((sec) => {
//                 lectures += sec.subSection.length
//               })  
//               dispatch(setTotalNoOfLectures(lectures));
//         }
//         setCourseSpecificDetails();
//     },[]);


//   return (
//     <>
//         <div className='flex min-h-screen bg-richblack-900'>
//             <VideoDetailsSidebar setReviewModal={setReviewModal} />
//             <div className='flex-1 overflow-y-auto p-6'>
//                 <Outlet />
//             </div>
//             {reviewModal && (
//                 <div className='fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
//                     <CourseReviewModal setReviewModal={setReviewModal} />
//                 </div>
//             )}
//         </div>
        
//     </>
//   )
// }

// export default ViewCourse





import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse(courseId, token);
              dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <>
        <div className='flex min-h-screen bg-richblack-900'>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div className='flex-1 overflow-y-auto p-6'>
                <Outlet />
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCourse