import { ImSpinner8 } from 'react-icons/im';

import Typography from './Typography';

export default function Loading() {
  return (
    <div className='fixed w-full top-0 left-0  flex min-h-screen flex-col items-center justify-center z-10'>
      <ImSpinner8 className='text-typo-dark mb-4 animate-spin text-4xl' />
      <Typography>Loading...</Typography>
    </div>
  );
}
