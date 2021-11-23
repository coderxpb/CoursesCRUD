import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { IStudent } from '../interfaces/IStudent'

type pageType = 'list' | 'profile';

interface ContextType {
  currentPageType: pageType;
  setCurrentPageType(page: pageType): void;
  studentProfile: IStudent;
  setStudentProfile(student: IStudent): void;
  currentPageNo: number;
  setCurrentPageNo(p: number): void;
  pageSize: number;
  setPageSize(p: number): void;
}

const PageContext = createContext<ContextType>({} as ContextType);

const PageContextProvider = ({ children }: { children: ReactElement }) => {
  const [currentPageType, setCurrentPageType] = useState<pageType>('list');
  const [studentProfile, setStudentProfile] = useState<IStudent>({_id: '', name: '', coursesTaken: []});
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  return (
    <PageContext.Provider
      value={{
        currentPageType,
        setCurrentPageType,
        studentProfile,
        setStudentProfile,
        currentPageNo,
        setCurrentPageNo,
        pageSize,
        setPageSize
      }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => useContext(PageContext);

export { PageContextProvider, usePage };
