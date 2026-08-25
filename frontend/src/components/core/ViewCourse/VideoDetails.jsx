import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const playerRef = useRef(null);

  const { token } = useSelector((state) => state.auth);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData?.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId
      );

      const filteredVideoData = filteredData?.[0]?.subSection?.filter(
        (data) => data._id === subSectionId
      );

      if (filteredVideoData?.length) {
        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      } else {
        setVideoData(null);
      }
    };

    setVideoSpecificDetails();
  }, [
    courseSectionData,
    courseEntireData,
    courseId,
    sectionId,
    subSectionId,
    location.pathname,
    navigate,
  ]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) return true;

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) return true;

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    );
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    if (currentSubSectionIndex < noOfSubSections - 1) {
      // Same section ki next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // Next section ki first video
      const nextSectionId =
        courseSectionData[currentSectionIndex + 1]._id;

      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      );

    if (currentSubSectionIndex > 0) {
      // Same section ki previous video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // Previous section ki last video
      const prevSectionId =
        courseSectionData[currentSectionIndex - 1]._id;

      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;

      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId,
      },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  const handleRewatch = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
      setVideoEnded(false);
    }
  };

    return (
    <div className="flex flex-col gap-4 text-richblack-5">
      {!videoData ? (
        <div className="flex h-[400px] items-center justify-center rounded-md bg-richblack-800 text-lg text-richblack-100">
          No Data Found
        </div>
      ) : (
        <div className="relative">
          <video
            ref={playerRef}
            className="w-full rounded-md shadow-lg"
            controls
            playsInline
            src={videoData?.videoUrl}
            onEnded={() => setVideoEnded(true)}
          >
            Your browser does not support the video tag.
          </video>

          {videoEnded && (
            <div className="absolute inset-0 z-[100] grid h-full place-content-center gap-4 rounded-md bg-richblack-900/80 backdrop-blur-sm">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl mx-auto"
                />
              )}

              <IconBtn
                disabled={loading}
                onclick={handleRewatch}
                text="Rewatch"
                customClasses="text-xl mx-auto"
              />

              <div className="flex justify-center gap-3">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="rounded-md bg-richblack-100 px-4 py-2 font-semibold text-richblack-900 hover:bg-richblack-50 disabled:opacity-50"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="rounded-md bg-richblack-100 px-4 py-2 font-semibold text-richblack-900 hover:bg-richblack-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1 className="mt-2 text-2xl font-semibold text-richblack-5">
        {videoData?.title}
      </h1>

      <p className="text-richblack-200">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
