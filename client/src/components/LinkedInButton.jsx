import { useState } from 'react';

export default function LinkedInButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://www.linkedin.com/company/studentverseofficial/posts/?feedView=all"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow us on LinkedIn"
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: '64px', width: '64px', overflow: 'hidden', borderRadius: '50px', position: 'relative' }}>
        {/* Bottom icon — plain, slides away on hover */}
        <div style={{
          width: '64px', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50px',
          backgroundColor: 'rgba(0,0,0,0)',
          position: 'absolute', top: 0, left: 0,
          transform: hovered ? 'translateY(-70px)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.46, -0.78, 0.5, 1.56)',
        }}>
          <svg fill="white" viewBox="0 0 448 512" height="1.5em" xmlns="http://www.w3.org/2000/svg">
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        </div>

        {/* Top icon — blue bg, slides in on hover */}
        <div style={{
          width: '64px', height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '50px',
          background: '#0A66C2',
          position: 'absolute', top: 0, left: 0,
          transform: hovered ? 'translateY(0)' : 'translateY(70px)',
          transition: 'transform 0.4s cubic-bezier(0.46, -0.78, 0.5, 1.56)',
        }}>
          <svg
            fill="white"
            viewBox="0 0 448 512"
            height="1.5em"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.5s ease 0.2s',
            }}
          >
            <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
