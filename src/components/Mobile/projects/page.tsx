"use client";

import React from "react";
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import Image from "next/image";

interface MobileProjectItem {
  icon: string;
  text: string;
  date?: string;
  role?: string;
  href: string;
  target: string;
  rel: string;
}

const MobileProjectsPage: React.FC = () => {
  const t = useTranslations('mobile');
  const params = useParams();
  const router = useRouter();
  const currentLocale = params.locale as string;

  const handleBackToHome = () => {
    router.push(`/${currentLocale}`);
  };

  const projects: { category: string; items: MobileProjectItem[] }[] = [
    {
      category: t('projects.machineLearning'),
      items: [
        {
          icon: '/mobile-github-logo.png',
          text: t('projects.sentimentAnalysis'),
          href: 'https://github.com/uzeyirtalhakilic/tweeteval-multiclass-sentiment-analysis',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        {
          icon: '/icons/mezunIcon.png',
          text: t('projects.thesisProject'),
          date: t('projects.thesisProjectDate'),
          role: t('projects.thesisProjectTag'),
          href: '',
          target: '',
          rel: ''
        }
      ]
    },
    {
      category: t('projects.applications'),
      items: [
        {
          icon: '/mobile-github-logo.png',
          text: t('projects.courierTracking'),
          date: t('projects.courierTrackingDate'),
          role: t('projects.courierTrackingRole'),
          href: 'https://github.com/uzeyirtalhakilic/DesktopApp-Courier-Tracking',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        {
          icon: '/mobile-github-logo.png',
          text: t('projects.veterinaryClinic'),
          date: t('projects.veterinaryClinicDate'),
          role: t('projects.veterinaryClinicRole'),
          href: 'https://github.com/uzeyirtalhakilic/Vet_Tracking',
          target: '_blank',
          rel: 'noopener noreferrer'
        },
        {
          icon: '/mobile-github-logo.png',
          text: t('projects.restaurantManagement'),
          date: t('projects.restaurantManagementDate'),
          href: 'https://github.com/uzeyirtalhakilic/Restaurant-Management',
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      ]
    }
  ];

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
            {t('menu.projects')}
          </h1>
        </div>
        
        <div className="w-full max-w-md flex-1">
          <div className="space-y-6">
            {projects.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mobile-project-category">
                <h2 className="text-green-400 font-bold mb-3 text-lg border-b border-green-400 pb-2 font-press-start">
                  {category.category}
                </h2>
                
                <div className="space-y-3">
                  {category.items.map((project, projectIndex) => (
                    <div 
                      key={projectIndex}
                      className={`mobile-project-item ${project.href ? 'clickable' : ''}`}
                      onClick={() => {
                        if (project.href) {
                          window.open(project.href, project.target || '_blank', project.rel);
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="project-icon">
                          <Image 
                            src={project.icon} 
                            alt={project.text}
                            width={24} 
                            height={24} 
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="project-text font-press-start">{project.text}</span>
                          {project.date && (
                            <span className="project-text font-press-start text-[10px] opacity-60">{project.date}</span>
                          )}
                          {project.role && (
                            <span className="project-text font-press-start text-[10px] opacity-60">{project.role}</span>
                          )}
                        </div>
                        {project.href && (
                          <span className="project-link">🔗</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProjectsPage; 