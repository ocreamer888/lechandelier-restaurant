'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity/sanity.config';

export default function StudioPage() {
  return (
    <div className="min-h-screen" style={{
      background: 'transparent',
      backdropFilter: 'blur(8px)',
      // You can also add your website background if you want it to show through
      // backgroundColor: 'rgba(215, 220, 207, 0.1)', // very light overlay of your background color
    }}>
      <NextStudio 
        config={config}
        unstable_globalStyles={true}
      />
    </div>
  );
}

