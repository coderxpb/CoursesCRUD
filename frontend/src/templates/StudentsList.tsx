import { getRequest } from '../services/httpHandlers'
import { useEffect, useState } from 'react'
import { CustomCard } from '../components/CustomCard'
import { IStudent } from '../interfaces/IStudent'
import { deleteRequest } from '../services/httpHandlers'

export const StudentsList = () => {
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loadStudents, setLoadStudents] = useState(true)
  const [studentList, setStudentList] = useState<Record<string, IStudent>>()
  const [studentListKeys, setStudentListKeys] = useState<string[]>()

  const cardClicked = () => console.log('clicked')

  //delete a student and refetch list
  const deleteClicked = (id: string) => {
    deleteRequest('/students', { id }).then(data => {
      setLoadStudents(true)
    })
  }

  //fetch students list data to be displayed in current page
  useEffect(() => {
    console.log('loading triggered')
    if (loadStudents) {
      ;(async () => {
        console.log('here')
        const data = await getRequest('/students/list', {
          size: pageSize,
          page: currentPage,
        })
        setStudentListKeys(Object.getOwnPropertyNames(data))
        setStudentList(data)

        setLoadStudents(false)
      })()
    }
  }, [loadStudents])

  return (
    <>
      {loadStudents
        ? 'loading'
        : studentListKeys && studentList
        ? studentListKeys.map(key => (
            <CustomCard key={key} id={key} onDeleteClicked={deleteClicked}>
              {studentList[key].name}
            </CustomCard>
          ))
        : 'data corrupted'}
    </>
  )
}
