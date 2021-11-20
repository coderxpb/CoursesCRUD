import { SubjectCard } from '../components/CustomCard';
import { useCourse } from '../contexts/courseContext';

interface IProps {
  courseID: string;
  removeCourse(courseID:string): void;
}
export const CourseRenderer = (props: IProps) => {
  const { courses } = useCourse();
  const { courseID, removeCourse } = props;

  return courses[courseID] ? (
    <SubjectCard
      key={courseID}
      name={courses[courseID].name}
      id={courseID}
      onDeleteClicked={() => removeCourse(courseID)}
    />
  ) : <div></div>;
};
