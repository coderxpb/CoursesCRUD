import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { useCourse } from '../contexts/courseContext';
import _, { toNumber } from 'lodash';
import React from 'react';
import { ICourse } from '../interfaces/ICourse';

interface IUpdateCourse {
  initialCourses: ICourse[] | undefined;
  addToChosenCourses(course: ICourse): void;
  removeFromChosenCourses(course: ICourse): void;
  updateCourses(): void;
  closeDialog(): void;
  open: boolean;
}

export const UpdateCourseDialog = (props: IUpdateCourse) => {
  const {
    open,
    initialCourses,
    addToChosenCourses,
    removeFromChosenCourses,
    closeDialog,
    updateCourses,
  } = props;
  const { courses } = useCourse();
  const onSave = () => {
    updateCourses();
    closeDialog();
  };

  const onCancel = () => {
    closeDialog();
  };

  const onCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    course: ICourse,
  ) =>
    e.target.checked
      ? addToChosenCourses(course)
      : removeFromChosenCourses(course);

  const isDefaultChecked = (course: ICourse, courses: ICourse[]) =>
    courses.filter(c => c._id == course._id).length > 0;

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ fontSize: 22, fontFamily: 'Outfit', fontWeight: 500}}>Update Courses</DialogTitle>
      <DialogContent sx={{ minWidth: 250 }}>
        <FormGroup>
          {_.map(courses, course => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDefaultChecked(course, initialCourses || [])}
                  value={course._id}
                  onChange={e => onCheckboxChange(e, course)}
                />
              }
              label={course.name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
