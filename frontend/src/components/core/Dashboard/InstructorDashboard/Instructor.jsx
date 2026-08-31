import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const {token} = useSelector((state)=> state.auth);
    const {user} = useSelector((state)=>state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(()=> {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if(instructorApiData.length)
                setInstructorData(instructorApiData);

            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    },[])

    const totalAmount = instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr)=>acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='text-white'>
      <div>
        <h1 className='text-2xl font-semibold text-richblack-5'>Hi {user?.firstName} 👋</h1>
        <p className='mt-1 font-medium text-richblack-300'>Let's start something new</p>
      </div>

      {loading ? (<div className='mt-10 grid place-items-center'><div className='spinner'></div></div>)
      :courses.length > 0 
        ? (<div>
            <div className='my-4 flex flex-col-reverse gap-4 lg:flex-row lg:items-stretch'>
                <InstructorChart  courses={instructorData}/>
                <div className='flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6'>
                    <p className='text-lg font-bold text-richblack-5'>Statistics</p>
                    <div className='mt-4 space-y-3'>
                        <p className='text-lg text-richblack-200'>Total Courses</p>
                        <p className='text-3xl font-semibold text-richblack-5'>{courses.length}</p>
                    </div>

                    <div className='mt-4 space-y-3'>
                        <p className='text-lg text-richblack-200'>Total Students</p>
                        <p className='text-3xl font-semibold text-richblack-5'>{totalStudents}</p>
                    </div>

                    <div className='mt-4 space-y-3'>
                        <p className='text-lg text-richblack-200'>Total Income</p>
                        <p className='text-3xl font-semibold text-richblack-5'>Rs. {totalAmount}</p>
                    </div>
                </div>
            </div>
        <div className='mt-8'>
            {/* Render 3 courses */}
            <div className='flex items-center justify-between'>
                <p className='text-lg font-bold text-richblack-5'>Your Courses</p>
                <Link to="/dashboard/my-courses">
                    <p className='text-sm text-yellow-25 hover:underline'>View all</p>
                </Link>
            </div>
            <div className='mt-5 flex flex-wrap gap-6'>
                {
                    courses.slice(0,3).map((course, index)=> (
                        <div key={index} className='w-[calc(33.33%-1rem)] min-w-[250px]'>
                            <img 
                                src={course.thumbnail}
                                className='h-[201px] w-full rounded-md object-cover'
                                alt={course.courseName}
                            />
                            <div className='mt-3 w-full'>
                                <p className='text-lg font-medium text-richblack-5'>{course.courseName}</p>
                                <div className='mt-1 flex items-center gap-2 text-sm text-richblack-300'>
                                    <p>{course.studentsEnrolled.length} students</p>
                                    <p> | </p>
                                    <p>Rs. {course.price}</p>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
        
        )
        :(<div className='mt-20 flex flex-col items-center gap-3'>
            <p className='text-lg text-richblack-300'>You have not created any courses yet</p>
            <Link to={"/dashboard/add-course"} className='rounded-md bg-yellow-50 px-4 py-2 font-semibold text-richblack-900'>
                Create a Course
            </Link>
        </div>)}
    </div>
  )
}

export default Instructor
