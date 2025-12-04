import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './App.css'

function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cityRef = useRef<HTMLImageElement>(null)
  const robotRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // City slides in from bottom
      tl.to(cityRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
      })

      // Robot slides in from bottom (appears behind city)
      tl.to(robotRef.current, {
        y: 0,
        opacity: 1,
        scale: 0.6,
        duration: 1,
      }, '-=0.6')

      // Title slides in from top
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }, '-=0.5')

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <h1 className="hero-title" ref={titleRef}>
            NIRD
          </h1>

          <img
            ref={cityRef}
            src="/images/city.png"
            alt="Cyberpunk City"
            className="hero-city"
          />

          <img
            ref={robotRef}
            src="/images/HeroRobot.png"
            alt="Attack Robot"
            className="hero-robot"
          />
        </div>

        <div className="hero-vignette" />
        <div className="hero-scanlines" />
      </section>
    </>
  )
}

export default App
