import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({
  ease: 'power3.out',
  duration: 1,
})

gsap.config({
  autoSleep: 60,
  force3D: true,
})

export const MOTION_QUERY = {
  isMobile: '(max-width: 767px)',
  isDesktop: '(min-width: 768px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

export function prefersReducedMotion() {
  return window.matchMedia(MOTION_QUERY.reduceMotion).matches
}

export { gsap, ScrollTrigger, useGSAP }
