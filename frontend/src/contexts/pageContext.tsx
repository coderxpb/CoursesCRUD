import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { deleteRequest, getRequest } from '../utils/httpHandlers'
import { IStudent } from '../interfaces/IStudent'

type pageType = 'list' | 'profile';

interface ContextType {
  currentPage: pageType;
  setCurrentPage(page: pageType): void;
  studentProfile: IStudent | undefined;
  setStudentProfile(student: IStudent): void;
}

const PageContext = createContext<ContextType>({} as ContextType);

const PageContextProvider = ({ children }: { children: ReactElement }) => {
  const [currentPage, setCurrentPage] = useState<pageType>('list');
  const [studentProfile, setStudentProfile] = useState<IStudent>();

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        studentProfile,
        setStudentProfile
      }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => useContext(PageContext);

export { PageContextProvider, usePage };
