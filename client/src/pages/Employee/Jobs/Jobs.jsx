import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import EmployeeLayout from 'layouts/EmployeeLayout';
import JobsTableWrapper from 'components/JobsTableWrapper';

const Jobs = () => {
  const { id } = useParams();

  return (
    <EmployeeLayout>
      <JobsTableWrapper userId={id} />
    </EmployeeLayout>
  );
};

export default Jobs;
