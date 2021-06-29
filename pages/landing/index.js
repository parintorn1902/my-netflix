import Head from 'next/head'
import LandingContent from './components/LandingContent'
import LandingHeader from './components/LandingHeader'

function Landing() {
  return (
    <div className="">
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="This is my Netflix clone web by Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingHeader showBgGradient={true} />

      <LandingContent />

    </div>
  )
}

export default Landing
