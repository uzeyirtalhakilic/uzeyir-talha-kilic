import React from "react";
import { useTranslations } from 'next-intl';
import { FileSystemItem } from "../data/filesystem";
import { ExperienceEntry, EducationEntry } from "../FolderView/Experience/config";

interface TerminalProps {
  item: FileSystemItem;
}

const Terminal: React.FC<TerminalProps> = ({ item }) => {
  const t = useTranslations('experience');
  const tTerminal = useTranslations('experience.terminal');
  const workExperience = t.raw('workExperience') as ExperienceEntry[];
  const education = t.raw('education') as EducationEntry[];

  const workMatch = item.id.match(/^experience-work-(\d+)$/);
  const eduMatch = item.id.match(/^experience-edu-(\d+)$/);
  const work = workMatch ? workExperience[Number(workMatch[1])] : undefined;
  const edu = eduMatch ? education[Number(eduMatch[1])] : undefined;

  const fileName = item.label;
  const prompt = tTerminal('prompt');

  return (
    <div className="xp-terminal">
      <div className="xp-terminal-line">Microsoft Windows XP [Version 5.1.2600]</div>
      <div className="xp-terminal-line">(C) Copyright 1985-2001 Microsoft Corp.</div>
      <div className="xp-terminal-line">&nbsp;</div>
      <div className="xp-terminal-line">{prompt}{fileName}</div>
      <div className="xp-terminal-line xp-terminal-error">
        [ERROR] {tTerminal('errorTitle')}
      </div>
      <div className="xp-terminal-line xp-terminal-error">{tTerminal('loadingRecord')}</div>
      <div className="xp-terminal-line">&nbsp;</div>

      {work && (
        <>
          <div className="xp-terminal-line">{tTerminal('company')}: {work.company}</div>
          <div className="xp-terminal-line">{tTerminal('role')}: {work.role}</div>
          <div className="xp-terminal-line">{tTerminal('period')}: {work.period}</div>
          <div className="xp-terminal-line">{tTerminal('location')}: {work.location}</div>
          <div className="xp-terminal-line">&nbsp;</div>
          <div className="xp-terminal-line">{tTerminal('details')}</div>
          {work.bullets.map((bullet, idx) => (
            <div className="xp-terminal-line" key={idx}>- {bullet}</div>
          ))}
        </>
      )}

      {edu && (
        <>
          <div className="xp-terminal-line">{tTerminal('school')}: {edu.school}</div>
          <div className="xp-terminal-line">{tTerminal('degree')}: {edu.degree}</div>
          <div className="xp-terminal-line">{tTerminal('period')}: {edu.period}</div>
          <div className="xp-terminal-line">{tTerminal('location')}: {edu.location}</div>
          <div className="xp-terminal-line">&nbsp;</div>
          <div className="xp-terminal-line">{edu.thesis}</div>
        </>
      )}

      <div className="xp-terminal-line">&nbsp;</div>
      <div className="xp-terminal-line">
        {prompt}<span className="xp-terminal-cursor">_</span>
      </div>
    </div>
  );
};

export default Terminal;
