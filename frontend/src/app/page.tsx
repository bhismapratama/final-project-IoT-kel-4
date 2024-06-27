import Typography from '@/components/Typography'
import UnstyledLink from '@/components/links/UnstyledLink'
import Button from '@/components/Button'
import React from 'react'

export default function Page() {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-3'>
      <Typography className='capitalize text-[30px]' weight='bold'>
        welcome to kel 4
      </Typography>
      <div className='flex gap-6'>
        <UnstyledLink href='/admin'>
          <Button className='text-white'>
            DASHBOARD
          </Button>
        </UnstyledLink>
      </div>
    </div>
  )
}
