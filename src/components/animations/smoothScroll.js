import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, MOTION_QUERY } from './gsap'
import { refreshScroll, resetScrollPosition } from './scroll'

/** @type {import('lenis').default | null} */
let lenisInstance = null

/** @type {((time: number) => void) | null} */
let tickerHandler = null

export function getLenis() {
  return lenisInstance
}

export function scrollToTarget(target, options = {}) {
  const offset = options.offset ?? -80

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset,
      duration: options.duration,
      lerp: options.lerp,
      immediate: options.immediate,
      lock: options.lock,
      force: options.force,
      onComplete: options.onComplete,
    })
    return
  }

  const element =
    typeof target === 'string'
      ? document.querySelector(target)
      : target instanceof HTMLElement
        ? target
        : null

  element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function setSmoothScrollPaused(paused) {
  if (!lenisInstance) return
  if (paused) {
    lenisInstance.stop()
  } else {
    lenisInstance.start()
  }
}

export function createSmoothScroll() {
  const reduceMotion = window.matchMedia(MOTION_QUERY.reduceMotion).matches

  if (reduceMotion) {
    return () => {}
  }

  if (lenisInstance) {
    destroyLenis()
  }

  resetScrollPosition()

  const isMobile = window.matchMedia(MOTION_QUERY.isMobile).matches

  lenisInstance = new Lenis({
    autoRaf: false,
    lerp: isMobile ? 0.14 : 0.08,
    wheelMultiplier: isMobile ? 0.9 : 1,
    touchMultiplier: isMobile ? 1.15 : 1,
    smoothWheel: true,
    syncTouch: false,
  })

  lenisInstance.on('scroll', ScrollTrigger.update)

  tickerHandler = (time) => {
    lenisInstance?.raf(time * 1000)
  }

  gsap.ticker.add(tickerHandler)
  gsap.ticker.lagSmoothing(0)

  const handleResize = () => {
    lenisInstance?.resize()
    refreshScroll()
  }

  window.addEventListener('resize', handleResize)
  requestAnimationFrame(() => {
    resetScrollPosition()
    lenisInstance?.scrollTo(0, { immediate: true, force: true })
    lenisInstance?.resize()
    refreshScroll()
  })

  return () => {
    window.removeEventListener('resize', handleResize)
    destroyLenis()
  }
}

function destroyLenis() {
  if (tickerHandler) {
    gsap.ticker.remove(tickerHandler)
    tickerHandler = null
  }

  if (lenisInstance) {
    lenisInstance.destroy()
    lenisInstance = null
  }

  ScrollTrigger.update()
}
