import { MenuItem, Select } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'

interface Course {
  id: string
  title: string
  description: string
}

const courseList: Course[] = [
  {
    id: '1',
    title: 'Course 1',
    description: 'Course 1 description',
  },
  {
    id: '2',
    title: 'Course 2',
    description: 'Course 2 description',
  },
  {
    id: '3',
    title: 'Course 3',
    description: 'Course 3 description',
  },
]

const CourseSelector: FunctionComponent<{
  selectedCourse: string
  getUserContext: () => Promise<unknown>
  onSelect: (id: string) => void
  token: string
}> = ({ selectedCourse, onSelect, getUserContext, token }) => {
  const [courses, setCourses] = useState<Course[] | undefined>()
  const [userContext, setUserContext] = useState<unknown>()

  useEffect(() => {
    const fetchCourseList = async () => {
      const _courses = await new Promise((resolve) => {
        setTimeout(() => {
          if (token !== 'THE_RIGHT_TOKEN') {
            throw new Error('Invalid token!')
          }
          resolve(courseList)
        }, 3000)
      })
      const userContext = await getUserContext()
      setUserContext(userContext)
      setCourses(_courses as Course[])
    }

    fetchCourseList()
  }, [getUserContext, token])

  return (
    <div>
      <h2>Selecteer een opleiding</h2>
      {(courses === undefined || userContext === undefined) && (
        <p>Loading...</p>
      )}
      {courses !== undefined && userContext !== undefined && (
        <Select
          value={selectedCourse}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full"
        >
          <MenuItem value="">Select a course</MenuItem>
          {courseList.map((course) => (
            <MenuItem
              key={course.id}
              value={course.id}
            >
              {course.title}
            </MenuItem>
          ))}
        </Select>
      )}
      <pre>{JSON.stringify(userContext, null, 2)}</pre>
    </div>
  )
}

export default CourseSelector
