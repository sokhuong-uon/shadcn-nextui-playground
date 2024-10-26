import { LoaderCircle } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export default function PreferencesLoadingPage() {
  return (
    <Card className="h-[21rem] w-full">
      <CardContent className="flex h-full w-full items-center justify-center">
        <LoaderCircle className="animate-spin duration-1000" size={24} />
      </CardContent>
    </Card>
  )
}
