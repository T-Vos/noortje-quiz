import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
      </Head>
    <div className="flex flex-col items-start w-full">
  <h4 className="mt-10 text-xl text-white/60">Question 1 of 5</h4>
  <div className="mt-4 text-2xl text-white">
    What type of framework is Next.js?
  </div>
</div>
</div>
  )
}

export default Home
