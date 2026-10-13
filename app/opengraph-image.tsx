import { ImageResponse } from 'next/og';

// The preview image shown when a VeracuePay link is shared (Open Graph and the Twitter large card).
// Drawn here rather than shipped as a file so it always matches the brand colours.
export const alt = 'VeracuePay — secure payment pages for independent businesses';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#191b16',
          color: '#fff1e6',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              border: '3px solid #cb997e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              color: '#cb997e',
            }}
          >
            V
          </div>
          <div style={{ display: 'flex', fontSize: 40, letterSpacing: 6, color: '#eddcd2' }}>VERACUEPAY</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Secure payment pages
          </div>
          <div style={{ display: 'flex', fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: '#cb997e' }}>
            for independent businesses.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#a5a58d' }}>
          Every checkout names who you are paying before you pay.
        </div>
      </div>
    ),
    size,
  );
}
