import { ScrollTrigger } from './gsap'

/** @type {HTMLElement | Window | null} */
let activeScroller = null

let resizeTimer = null
let foundationInitialized = false

function handleResize() {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh()
  }, 200)
}

/**
 * Wire a custom scroll container (e.g. Lenis wrapper) into ScrollTrigger.
 * Call once when smooth-scroll is introduced.
 */
export function setScrollContainer(scroller) {
  activeScroller = scroller
  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length) {
        scroller.scrollTop = value
      }
      return scroller.scrollTop
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })
  ScrollTrigger.defaults({ scroller })
}

export function clearScrollContainer() {
  if (activeScroller) {
    ScrollTrigger.scrollerProxy(activeScroller, {})
    activeScroller = null
  }
  ScrollTrigger.defaults({ scroller: undefined })
}

export function refreshScroll() {
  ScrollTrigger.refresh()
}

export function resetScrollPosition() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
  }

  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/**
 * Refresh ScrollTrigger after lazy images and videos affect layout.
 */
export function observeMediaForRefresh(root = document) {
  const cleanups = []

  const bindMedia = () => {
    root.querySelectorAll('img, video').forEach((el) => {
      if (el.dataset.scrollRefreshBound) return
      el.dataset.scrollRefreshBound = 'true'

      const handler = () => requestAnimationFrame(refreshScroll)
      el.addEventListener('load', handler, { once: true })
      el.addEventListener('loadeddata', handler, { once: true })
      el.addEventListener('error', handler, { once: true })

      cleanups.push(() => {
        el.removeEventListener('load', handler)
        el.removeEventListener('loadeddata', handler)
        el.removeEventListener('error', handler)
        delete el.dataset.scrollRefreshBound
      })
    })
  }

  bindMedia()

  const delayedBind = setTimeout(bindMedia, 600)

  return () => {
    clearTimeout(delayedBind)
    cleanups.forEach((cleanup) => cleanup())
  }
}

/**
 * Standard section trigger preset for future scroll-driven reveals.
 */
export function createSectionTrigger(element, options = {}) {
  return ScrollTrigger.create({
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    ...options,
  })
}

/**
 * Batch multiple elements with the same scroll behavior.
 */
export function batchScrollReveal(selector, options = {}) {
  return ScrollTrigger.batch(selector, {
    start: 'top 85%',
    onEnter: (batch) => {
      batch.forEach((el) => el.classList.add('is-inview'))
    },
    onLeaveBack: (batch) => {
      batch.forEach((el) => el.classList.add('is-inview'))
    },
    ...options,
  })
}

export function initScrollFoundation() {
  if (foundationInitialized) return
  foundationInitialized = true

  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  })

  ScrollTrigger.clearScrollMemory()

  window.addEventListener('load', refreshScroll)
  window.addEventListener('resize', handleResize)
}

export function destroyScrollFoundation() {
  if (!foundationInitialized) return
  foundationInitialized = false

  window.removeEventListener('load', refreshScroll)
  window.removeEventListener('resize', handleResize)
  clearTimeout(resizeTimer)
  clearScrollContainer()
}
