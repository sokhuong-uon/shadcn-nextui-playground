'use client'

import { Button } from '@nextui-org/button'
import { PartyPopper } from 'lucide-react'

export default function Home() {
  return (
    <>
      <div className="flex h-dvh w-dvw items-center justify-center gap-4">
        <p>Hello world</p>
        <Button className="rounded-small" isIconOnly>
          <PartyPopper strokeWidth={1.25} />
        </Button>
      </div>
    </>
  )
}
