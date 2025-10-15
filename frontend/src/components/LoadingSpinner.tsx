type Props = {
  size?: number
  className?: string
  label?: string
}

export const LoadingSpinner = ({ size = 24, className = '', label = 'Loading' }: Props) => {
  const px = `${size}px`
  return (
    <div role="status" aria-live="polite" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" />
        <path
          d="M22 12a10 10 0 00-10-10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default LoadingSpinner
