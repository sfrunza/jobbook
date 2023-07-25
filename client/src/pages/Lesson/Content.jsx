import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const data = {
  lesson: 1,
  title: "How To Protect The Customer's Home",
  subtitle:
    "Be a pro at recognizing those vulnerable places and knowing the best ways to protect against damage to your customer's home.",
  createdAt: 'Jan 9, 2014',
  slug: 'lesson-1',
};

export default function Content() {
  return (
    <Stack spacing={2}>
      <Typography>
        "Doors and Floors" is our eponymous jingle for the easily-forgotten but
        always-important process of protecting the customer's floors and door
        jambs against any incidental damage.
      </Typography>
      <Typography variant="h5" fontWeight="bold">
        The benefits of doing the Doors and Floors Shuffle are twofold:
      </Typography>
      <ol>
        <li>It reduces the likelihood of property damage.</li>
        <li>
          It's a prerequisite for qualifying for any of Hire A Helper's
          EliteGold moves.
        </li>
      </ol>
      <Typography variant="h5" fontWeight="bold">
        First, the Floors
      </Typography>
      <Typography>
        Look around the home and determine where the heavy foot traffic paths
        are going to be. Most obvious will be the hall leading to the front
        door. Rooms closer to the front door (or whichever entrance will be
        heavily used) can also become high traffic areas. In these places you'll
        want to make sure the floors are protected, against both scratches and
        (especially with carpeting) any dirt the crew may track in while going
        back and forth between the truck and the house.
      </Typography>
      <Typography>
        One easy and eye-catching method of floor protection is using Neoprene
        floor runners. Most effective on hard surfaces, these suckers are tough,
        reusable and easy to roll out. They also have an adhesive quality so
        they are not prone to slipping or bunching up underfoot and do not need
        to be taped down. Check our moving supplies guide to find out where to
        get them. Then prepare to wow your customers, like Phoenix's very own
        Copperstate Moving (pictured below).
      </Typography>
      <Box
        src="https://www.hireahelper.com/_static/img/movers-academy/articles/on-the-job/floor-protection.jpg"
        component="img"
        sx={{ width: { xs: '100%', lg: '30%' } }}
      />
      <Box
        src="	https://www.hireahelper.com/_static/img/movers-academy/articles/on-the-job/floor-protection-2.jpg"
        component="img"
        sx={{ width: { xs: '100%', lg: '30%' } }}
      />
      <Box
        src="https://www.hireahelper.com/_static/img/movers-academy/articles/on-the-job/floor-protection-3.jpg"
        component="img"
        sx={{ width: { xs: '100%', lg: '30%' } }}
      />
      <Typography>
        If you choose not to go with the neoprene there are alternatives. Tape
        vinyl runners or sheets of thick plastic to heavily-trafficked carpet,
        hardwood or tile floors. Or put down cardboard (used packing boxes work
        well, hint hint). Cardboard offers good protection against potential
        hand truck scuff marks and scratches while attracting dirt and moisture
        from the crews' shoes.
      </Typography>
    </Stack>
  );
}
