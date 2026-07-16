"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

interface EducationEntry {
  school: string;
  degree: string;
  period: string;
  location: string;
  thesis: string;
}

const MobileExperiencePage: React.FC = () => {
  const t = useTranslations('experience');
  const tMobile = useTranslations('mobile');
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const workExperience = t.raw('workExperience') as ExperienceEntry[];
  const education = t.raw('education') as EducationEntry[];

  const handleBackToHome = () => {
    router.push(`/${currentLocale}`);
  };

  return (
    <div className="min-h-screen retro-black-bg">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={handleBackToHome}
          className="w-10 h-10 bg-black border-2 border-green-400 flex items-center justify-center hover:bg-green-900 hover:border-green-300 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-[0_0_10px_rgba(0,255,0,0.5)]"
        >
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="text-center w-full max-w-md mt-8">
          <h1 className="retro-welcome font-bold mb-4 text-lg">
            {tMobile('menu.experience')}
          </h1>
        </div>

        <div className="mobile-content w-full max-w-md flex-1 text-green-400 text-xs">
          <div className="mb-2 font-bold text-sm">{t('workExperienceTitle')}</div>
          {workExperience.map((entry, idx) => (
            <div key={idx} className="mb-4 pl-2 border-l-2 border-green-400/50">
              <div className="flex justify-between flex-wrap gap-1">
                <span className="font-bold">{entry.company}</span>
                <span className="opacity-70">{entry.period}</span>
              </div>
              <div className="italic opacity-80 mb-1">{entry.role} — {entry.location}</div>
              <ul className="list-disc list-inside leading-5">
                {entry.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mb-2 mt-6 font-bold text-sm">{t('educationTitle')}</div>
          {education.map((entry, idx) => (
            <div key={idx} className="mb-4 pl-2 border-l-2 border-green-400/50">
              <div className="flex justify-between flex-wrap gap-1">
                <span className="font-bold">{entry.school}</span>
                <span className="opacity-70">{entry.period}</span>
              </div>
              <div className="italic opacity-80 mb-1">{entry.degree} — {entry.location}</div>
              <div className="leading-5">{entry.thesis}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileExperiencePage;
