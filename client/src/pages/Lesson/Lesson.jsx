import Grid from '@mui/material/Grid';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PageHeader from 'components/PageHeader';
import { Link, useParams } from 'react-router-dom';
import Content from './Content';
import LessonList from './LessonList';

const lesson = {
  lesson: 1,
  title: "How To Protect The Customer's Home",
  subtitle:
    "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
  createdAt: 'Jan 9, 2014',
  slug: 'lesson-5',
};

export default function Lesson() {
  const { slug } = useParams();
  console.log(slug);

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <Box sx={{ position: 'relative', top: '-16px' }}>
          <Button
            component={Link}
            to="/on-the-job"
            color="inherit"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
          >
            back
          </Button>
        </Box>
        <PageHeader title={lesson.title} />
        <Grid
          container
          spacing={4}
          direction={{ xs: 'column-reverse', xl: 'row' }}
        >
          <Grid item xs={12} xl={3}>
            <LessonList />
          </Grid>
          <Grid item xs={12} xl={9}>
            <Content />
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
}
