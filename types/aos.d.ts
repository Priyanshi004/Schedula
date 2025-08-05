declare module 'aos' {
  const AOS: {
    init: (options?: {
      duration?: number
      easing?: string
      once?: boolean
      anchorPlacement?: string
    }) => void
  }

  export default AOS
}