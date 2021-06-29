import LandingContent from './components/LandingContent'
import LandingHeader from './components/LandingHeader'

function Landing() {
  return (
    <div className="flex">

      <LandingHeader showBgGradient={true} />

      <LandingContent />

    </div>
  )
}

export default Landing
