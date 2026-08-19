// import { Outlet, useParams } from "react-router-dom";
// import VideoSidebar from "../components/VideoPlayer/VideoSidebar";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { getCourseDetails } from "../services/operations/courseAPI";
// import { getCourseProgress } from "../services/operations/courseProgressAPI";
// import { Navigate } from "react-router-dom";



// export default function ViewCourse() {

//   const token = useSelector((state) => state.auth.token);

//   const [course, setCourse] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [completedVideos, setCompletedVideos] = useState([]);

//   const [progressPercentage, setProgressPercentage] = useState(0);

//   const { courseId, sectionId, subSectionId } = useParams();

//   function addCompletedVideo(videoId) {
//     setCompletedVideos((prev) => {
//       if (prev.includes(videoId)) return prev;

//       const updated = [...prev, videoId];

//       const totalVideos = course.courseContent.reduce(
//         (acc, section) => acc + section.subSection.length,
//         0,
//       );

//       if (totalVideos === 0) {
//         setProgressPercentage(0);
//         return updated;
//       }

//       const percentage = Number(
//         ((updated.length / totalVideos) * 100).toFixed(2),
//       );

//       setProgressPercentage(percentage);

//       return updated;
//     });
//   }

//   async function fetchCourse() {
//     setLoading(true);

//     const result = await getCourseDetails(courseId, token);

//     if (result) {
//       setCourse(result);

//       const progress = result.courseProgress?.completedVideos || [];

//       setCompletedVideos(progress);

//       const percentage = await getCourseProgress(courseId, token);

//       setProgressPercentage(percentage);
//     }

//     setLoading(false);
//   }

//   useEffect(() => {
//     fetchCourse();
//   }, [courseId]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         Course Not Found
//       </div>
//     );
//   }

//   if (
//   !sectionId &&
//   !subSectionId &&
//   course &&
//   course.courseContent.length > 0
// ) {
//   let targetSection = null;
//   let targetLecture = null;

//   for (const section of course.courseContent) {
//     const lecture = section.subSection.find(
//       (lec) => !completedVideos.includes(lec._id)
//     );

//     if (lecture) {
//       targetSection = section;
//       targetLecture = lecture;
//       break;
//     }
//   }

//   if (!targetLecture) {
//     targetSection = course.courseContent[0];
//     targetLecture = targetSection.subSection[0];
//   }

//   return (
//     <Navigate
//       replace
//       to={`/view-course/${course._id}/section/${targetSection._id}/sub-section/${targetLecture._id}`}
//     />
//   );
// }

//   return (
//     <div className="flex min-h-screen bg-richblack-900">
//       <VideoSidebar
//         course={course}
//         completedVideos={completedVideos}
//         progressPercentage={progressPercentage}
//       />

//       <div className="flex-1">
//         <Outlet
//           context={{
//             course,
//             completedVideos,
//             addCompletedVideo,
//           }}
//         />
//       </div>
//     </div>
//   );
// }


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
        <div>
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div>
                <Outlet />
            </div>
            {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
        </div>
        
    </>
  )
}

export default ViewCourse
