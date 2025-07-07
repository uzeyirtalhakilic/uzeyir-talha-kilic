"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('error.404');
  const locale = useLocale();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsLoading(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Prevent scrolling on the blue screen
    document.body.style.overflow = 'hidden'
    // Footer'ı gizle
    const footer = document.querySelector('footer');
    if (footer) footer.style.display = 'none';
    return () => {
      document.body.style.overflow = 'unset'
      if (footer) footer.style.display = '';
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex items-center justify-center">
          <span
            className="text-white text-2xl font-bold drop-shadow-lg px-6 py-3 rounded-lg"
            style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}
          >
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // Mobile theme
  if (isMobile) {
    return (
      <div className="fixed inset-0 retro-black-bg text-white overflow-hidden flex flex-col w-full h-full min-h-screen">
        <div className="w-full h-full min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8">
            {/* Main Title */}
            <h1 className="retro-welcome text-2xl md:text-3xl lg:text-4xl animate-fadeInUp">
              {t('mobile.title')}
            </h1>

            {/* Button */}
            <div className="mt-12 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <Link 
                href={`/${locale}`}
                className="mobile-menu-item inline-block text-center min-w-[200px]"
              >
                {t('mobile.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop theme (Windows XP Blue Screen)
  return (
    <div className="fixed inset-0 bg-[#000080] text-white font-['Tahoma', sans-serif] overflow-hidden flex flex-col">
      {/* Blue Screen Header */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">A problem has been detected and Windows has been shut down to prevent damage to your computer.</h1>
        </div>

        {/* Error Details */}
        <div className="space-y-4 text-lg">
          <p><strong>PAGE_NOT_FOUND_ERROR</strong></p>
          <p>If this is the first time you&apos;ve seen this Stop error screen, restart your computer. If this screen appears again, follow these steps:</p>
          
          <div className="ml-8 space-y-2">
            <p>• Check for viruses on your computer. Remove any newly installed hard drives or hard drive controllers.</p>
            <p>• Check your hard drive to make sure it is properly configured and terminated.</p>
            <p>• Run CHKDSK /F to check for hard drive corruption, and then restart your computer.</p>
          </div>

          <div className="mt-8">
            <p><strong>Technical information:</strong></p>
            <div className="ml-8 space-y-1">
              <p>*** STOP: 0x000000F4 (0x00000003, 0x00000000, 0x00000000, 0x00000000)</p>
              <p>*** PAGE_NOT_FOUND.sys - Address FBFE7614 base at FBFE5000, DateStamp 3d6dd67c</p>
            </div>
          </div>

          <div className="mt-8">
            <p>Beginning dump of physical memory</p>
            <p>Physical memory dump complete.</p>
            <p>Contact your system administrator or technical support group for further assistance.</p>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-12">
          <Link 
            href={`/${locale}`}
            className="inline-block bg-white text-[#000080] px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
          >
            Restart Computer
          </Link>
        </div>
      </div>

      {/* Progress Bar - Fixed at bottom */}
      <div className="p-8 border-t border-white/20">
        <div className="w-full bg-white h-4 border-2 border-white">
          <div className="bg-[#000080] h-full w-1/3 animate-pulse"></div>
        </div>
        <p className="mt-2 text-lg">Collecting error information... 33%</p>
      </div>
    </div>
  )
}