import { SubjectCard } from '../components/CustomCard';
import { useCourse } from '../contexts/courseContext';

export const CourseRenderer = (courseID: number | string) => {
  const { courses } = useCourse();
  return courses[courseID] ? (
    <SubjectCard
      key={courseID}
      name={courses[courseID].name}
      id={courseID}
      onDeleteClicked={() => //remove course for that specific student}>
      {courses[courseID].name}
    </SubjectCard>
  ) : (
    ''
  );
};
