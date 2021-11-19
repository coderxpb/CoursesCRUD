import { getRequest } from '../services/httpHandlers'
import { useEffect, useState } from 'react'
import { CustomCard } from '../components/CustomCard'
import { IStudent } from '../interfaces/IStudent'

export const StudentsList = () => {
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [studentList, setStudentList] = useState<Record<string, IStudent>>()
  const [studentListKeys, setStudentListKeys] = useState<string[]>()

  //fetch students list data to be displayed in current page
  useEffect(() => {
    ;(async () => {
      const data = await getRequest('/students/list', { size: 10, page: 1 })
      setStudentListKeys(Object.getOwnPropertyNames(data))
      setStudentList(data)
    })()
  }, [])

  return (
    <>
      {studentListKeys && studentList
        ? studentListKeys.map(key => <CustomCard key={key}>{studentList[key].name}</CustomCard>)
        : 'loading'}
    </>
  )
}
