import { getRequest } from '../services/httpHandlers'
import { useEffect, useState } from 'react'

export const StudentsList = () => {
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [studentList, setStudentList] = useState()

  //fetch students list data to be displayed in current page
  useEffect(()=> {
    (async ()=> {
      const data = await getRequest('/students')
      setStudentList(data);
    })();
  },[])

  return (
    <>
      {JSON.stringify(studentList)};
    </>
  )
}