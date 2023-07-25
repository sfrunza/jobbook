import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

const data = [
  {
    lesson: 1,
    title: "How To Protect The Customer's Home",
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

export default function Main() {
  return (
    <Stack>
      {data.map((item) => {
        return (
          <Box
            key={item.lesson}
            display="flex"
            gap={4}
            alignItems="center"
            borderBottom={1}
            borderColor={'divider'}
            paddingY={2}
          >
            {/* <Box> */}
            <SchoolRoundedIcon color="action" fontSize="large" />
            {/* </Box> */}
            <Box display="flex" flexDirection="column">
              <Typography fontWeight="bold">Lesson {item.lesson}</Typography>
              <MuiLink
                component={Link}
                to={item.slug}
                fontWeight="bold"
                color="blue"
                underline="hover"
                //   sx={{ color: 'primary.main', textDecoration: 'underline' }}
              >
                {item.title}
              </MuiLink>
              <Typography>{item.subtitle}</Typography>
              {/* <Typography
                color="text.secondary"
                variant="caption"
                sx={{ marginTop: 2 }}
              >
                {item.createdAt}
              </Typography> */}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
