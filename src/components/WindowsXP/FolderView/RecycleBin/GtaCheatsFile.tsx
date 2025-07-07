import React from "react";
import TxtFile from "../base/TxtFile";
import { useTranslations } from 'next-intl';

const GtaCheatsFile: React.FC = () => {
  const t = useTranslations('gtaCheats');

  const gtaCheatsContent = `${t('title')}
============================

${t('health')}:
ASPIRINE         -> ${t('codes.ASPIRINE')}
PRECIOUSPROTECTION -> ${t('codes.PRECIOUSPROTECTION')}

${t('vehicles')}:
BIGBANG          -> ${t('codes.BIGBANG')}
COMEFLYWITHME    -> ${t('codes.COMEFLYWITHME')}
PANZER           -> ${t('codes.PANZER')}
SEAWAYS          -> ${t('codes.SEAWAYS')}
GRIPISEVERYTHING -> ${t('codes.GRIPISEVERYTHING')}
AHAIRDRESSERSCAR -> ${t('codes.AHAIRDRESSERSCAR')}
IWANTITPAINTEDBLACK -> ${t('codes.IWANTITPAINTEDBLACK')}
LOADSOFLITTLETHINGS -> ${t('codes.LOADSOFLITTLETHINGS')}
THELASTRIDE      -> ${t('codes.THELASTRIDE')}
ROCKANDROLLCAR   -> ${t('codes.ROCKANDROLLCAR')}
RUBBISHCAR       -> ${t('codes.RUBBISHCAR')}
GETTHEREFAST     -> ${t('codes.GETTHEREFAST')}
GETTHEREQUICKLY  -> ${t('codes.GETTHEREQUICKLY')}
GETTHEREVERYFASTINDEED -> ${t('codes.GETTHEREVERYFASTINDEED')}
GETTHEREAMAZINGLYFAST -> ${t('codes.GETTHEREAMAZINGLYFAST')}

${t('effects')}:
LIFEISPASSINGMEBY -> ${t('codes.LIFEISPASSINGMEBY')}
BOOOOOORING      -> ${t('codes.BOOOOOORING')}
CHASESTAT        -> ${t('codes.CHASESTAT')}
YOUWONTTAKEMEALIVE -> ${t('codes.YOUWONTTAKEMEALIVE')}
LEAVEMEALONE     -> ${t('codes.LEAVEMEALONE')}
FANNYMAGNET      -> ${t('codes.FANNYMAGNET')}
CERTAINDEATH     -> ${t('codes.CERTAINDEATH')}
DEEPFRIEDMARSBARS -> ${t('codes.DEEPFRIEDMARSBARS')}
PROGRAMMER       -> ${t('codes.PROGRAMMER')}

${t('weapons')}:
NUTTERTOOLS      -> ${t('codes.NUTTERTOOLS')}
PROFESSIONALTOOLS -> ${t('codes.PROFESSIONALTOOLS')}
THUGSTOOLS       -> ${t('codes.THUGSTOOLS')}

${t('effects')} (Devam):
ONSPEED          -> ${t('codes.ONSPEED')}
BOINGBOINGBOING  -> ${t('codes.BOINGBOINGBOING')}
HOPINGIRL        -> ${t('codes.HOPINGIRL')}
AIRSHIP          -> ${t('codes.AIRSHIP')}
GREENLIGHT       -> ${t('codes.GREENLIGHT')}
MIAMITRAFFIC     -> ${t('codes.MIAMITRAFFIC')}
WELOVEOURDICK    -> ${t('codes.WELOVEOURDICK')}
CHEATSHAVEBEENCRACKED -> ${t('codes.CHEATSHAVEBEENCRACKED')}`;

  return (
    <TxtFile
      content={gtaCheatsContent}
    />
  );
};

export default GtaCheatsFile; 