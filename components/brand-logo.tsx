import Image from 'next/image';

// The full VeracuePay logo (mark, wordmark, divider and "PAY" are all part of the artwork), shown
// untouched. `public/veracuepay-logo.webp` is a transparent-padding-trimmed copy of the supplied
// `public/veracue-logo.webp`, so `size` is the visible height of the logo.
//
// By default the logo sits directly on its surface, like Veracue's own header. `onDark` is only for
// dark panels, where the logo's colours can't be altered and so don't read: it seats the logo on a
// light pill instead.
export function BrandLogo({
  size = 30,
  onDark = false,
  className = '',
}: {
  /** Logo height in px. */
  size?: number;
  onDark?: boolean;
  className?: string;
}) {
  const logo = (
    <Image
      src="/veracuepay-logo.webp"
      alt="VeracuePay"
      width={1983}
      height={320}
      priority
      style={{ height: size, width: 'auto' }}
    />
  );

  if (!onDark) return <span className={`inline-flex ${className}`}>{logo}</span>;

  return (
    <span className={`inline-flex items-center rounded-full bg-alabaster px-4 py-1.5 sm:px-5 ${className}`}>
      {logo}
    </span>
  );
}
