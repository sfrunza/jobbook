import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import { Divider } from '@mui/material';

const data = [
  {
    lesson: 1,
    title:
      "How To Protect The Customer's Home asdasd asd asd asdasdasda das dasd asdas",
    subtitle:
      "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
    createdAt: 'Jan 9, 2014',
    slug: 'lesson-1',
  },
  {
    lesson: 2,
    title: "How To Protect The Customer's Home",
    subtitle:
      "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
    createdAt: 'Jan 9, 2014',
    slug: 'lesson-2',
  },
  {
    lesson: 3,
    title: "How To Protect The Customer's Home",
    subtitle:
      "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
    createdAt: 'Jan 9, 2014',
    slug: 'lesson-3',
  },
  {
    lesson: 4,
    title: "How To Protect The Customer's Home",
    subtitle:
      "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
    createdAt: 'Jan 9, 2014',
    slug: 'lesson-4',
  },
  {
    lesson: 5,
    title: "How To Protect The Customer's Home",
    subtitle:
      "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
    createdAt: 'Jan 9, 2014',
    slug: 'lesson-5',
  },
];

export default function LessonList() {
  return (
    <Stack
      sx={{ border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}
      spacing={1}
    >
      <MuiLink
        component={Link}
        to="/on-the-job"
        fontWeight="bold"
        color={'inherit'}
        underline="hover"
      >
        On the Job
      </MuiLink>
      <Divider />
      {data.map((item, i) => {
        return (
          <MuiLink
            key={i}
            variant="body2"
            component={Link}
            to={`/on-the-job/${item.slug}`}
            color="blue"
            underline="hover"
          >
            {item.title}
          </MuiLink>
        );
      })}
    </Stack>
  );
}
