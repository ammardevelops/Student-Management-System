import * as React from 'react';
import { studentFormInitialState } from '../reducer/student-form-reducer';
import { GetStudentDetailProps } from '../types';
import { useLazyGetStudentDetailQuery } from '../api/student-api';

const initialState: GetStudentDetailProps = {
  success: false,
  data: { ...studentFormInitialState, id: 0, reporterName: '' }
};
export const useGetStudentDetail = (id: string | undefined) => {
  const [student, setStudent] = React.useState(initialState);

  const [getStudentDetail] = useLazyGetStudentDetailQuery();

  React.useEffect(() => {
    const fetch = async () => {
      try {
        const result = await getStudentDetail(id).unwrap();
        console.log('Student detail response:', result);
        if (result) {
          setStudent(result);
        }
      } catch (error) {
        console.error('Error fetching student detail:', error);
      }
    };

    fetch();
  }, [id, getStudentDetail]);

  return student;
};
