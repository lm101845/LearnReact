import {Inter} from "next/font/google";
import Paragraph from "@/app/components/ui/Paragraph";

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <main className='bg-red-500'><Paragraph size='sm'/></main>
  )
}
