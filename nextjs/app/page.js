import Image from 'next/image'
import Navbar from './components/Navbar'
import DashboardCard from './components/DashboardCard'
import ArticleCard from './components/ArticleCard'

import { signIn, signOut, useSession } from "next-auth"

export default function Home() {
  return (
    <div>
      <Navbar />
      <DashboardCard />
      <ArticleCard />
      {/* Add the rest of your home page content */}
      <h1>Welcome to the Home Page!</h1>
      {/* Additional content */}
    </div>
  )
}
