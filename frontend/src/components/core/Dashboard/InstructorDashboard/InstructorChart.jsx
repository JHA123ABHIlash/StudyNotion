import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("students");

    //functio to genertae random colors
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info

    const chartDataForStudents = {
        labels: courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create data for chart displaying iincome info
    const chartDataForIncome = {
        labels:courses.map((course)=> course.courseName),
        datasets: [
            {
                data: courses.map((course)=> course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }


    //create options
    const options = {

    };


  return (
    <div className='flex flex-1 flex-col rounded-md bg-richblack-800 p-6'>
      <p className='text-lg font-bold text-richblack-5'>Visualise</p>
      <div className='mt-4 flex gap-x-5'>
        <button
        onClick={() => setCurrChart("students")}
        className={`rounded-sm p-1 px-3 text-sm transition-all duration-200 ${
            currChart === "students"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
        }`}
        >
            Students
        </button>

        <button
        onClick={() => setCurrChart("income")}
        className={`rounded-sm p-1 px-3 text-sm transition-all duration-200 ${
            currChart === "income"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
        }`}
        >
            Income
        </button>
      </div>
      <div className='relative my-6 mx-auto aspect-square h-full w-full max-w-[300px]'>
        <Pie 
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
        />
      </div>
    </div>
  )
}

export default InstructorChart
