/** The Parveja wordmark (the brand's own artwork). */
export default function Logo({ className }: { className?: string }) {
  return <img className={`pv-logo ${className ?? ""}`} src="/images/logo.webp" alt="Parveja" width={509} height={250} />;
}
