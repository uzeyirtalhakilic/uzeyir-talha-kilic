"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import type { Ceil, Difficulty, GameState } from './Minesweeper';
import '../../../styles/desktop.css';

const A = '/icons/minesweeper';
const digits = [
  `${A}/digit0.png`,
  `${A}/digit1.png`,
  `${A}/digit2.png`,
  `${A}/digit3.png`,
  `${A}/digit4.png`,
  `${A}/digit5.png`,
  `${A}/digit6.png`,
  `${A}/digit7.png`,
  `${A}/digit8.png`,
  `${A}/digit9.png`,
];

function renderDigits(number: number) {
  let numberStr: string;
  if (number < 0) {
    const _number = -number % 100;
    if (_number === 0) {
      numberStr = '00';
    } else if (_number < 10) {
      numberStr = '0' + _number;
    } else {
      numberStr = String(_number);
    }
    return (
      <>
        <img src={`${A}/digit-.png`} alt="-" />
        {numberStr.split('').map((n, i) => (
          <img src={digits[Number(n)]} key={i} alt={n} />
        ))}
      </>
    );
  }

  numberStr = number < 999 ? String(number) : '999';
  if (number < 10) numberStr = '00' + numberStr;
  else if (number < 100) numberStr = '0' + numberStr;
  return numberStr
    .split('')
    .map((n, i) => <img key={i} src={digits[Number(n)]} alt={n} />);
}

interface MinesweeperViewProps extends GameState {
  changeCeilState: (index: number) => void;
  onReset: (difficulty?: Difficulty) => void;
  openCeil: (index: number) => void;
  openCeils: (index: number) => void;
  seconds: number;
  onClose: () => void;
  openingCeil: (index: number) => void;
  openingCeils: (index: number) => void;
}

function MineSweeperView({
  ceils,
  changeCeilState,
  onReset,
  openCeil,
  openCeils,
  mines,
  status,
  seconds,
  onClose,
  difficulty,
  rows,
  columns,
  openingCeil,
  openingCeils,
}: MinesweeperViewProps) {
  const face = useRef<HTMLButtonElement>(null);
  const dropDown = useRef<HTMLDivElement>(null);
  const topBar = useRef<HTMLDivElement>(null);
  const [mouseDownContent, setMouseDownContent] = useState(false);
  const [openOption, setOpenOption] = useState<string | null>(null);
  const [openBehavior, setOpenBehavior] = useState({ index: -1, behavior: '' });

  function remainMines() {
    return (
      mines -
      ceils.filter(ceil => ceil.state === 'flag' || ceil.state === 'misflagged')
        .length
    );
  }
  function statusFace() {
    if (mouseDownContent) return <img alt="ohh" src={`${A}/ohh.png`} />;
    switch (status) {
      case 'died':
        return <img alt="dead" src={`${A}/dead.png`} />;
      case 'won':
        return <img alt="win" src={`${A}/win.png`} />;
      default:
        return <img alt="smile" src={`${A}/smile.png`} />;
    }
  }
  function onMouseDownContent(e: React.MouseEvent) {
    if (e.button !== 0) return;
    if (
      (face.current && face.current.contains(e.target as Node)) ||
      status === 'won' ||
      status === 'died'
    )
      return;
    setMouseDownContent(true);
  }
  useEffect(() => {
    const { index, behavior } = openBehavior;
    switch (behavior) {
      case 'single':
        return openingCeil(index);
      case 'multi':
        return openingCeils(index);
      default:
        openingCeil(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openBehavior.index, openBehavior.behavior]);
  function onMouseDownCeils(e: React.MouseEvent, index: number) {
    if (e.button === 2 && e.buttons === 2 && index !== -1) {
      changeCeilState(index);
    } else if (e.button === 0 && e.buttons === 1) {
      setOpenBehavior({
        index,
        behavior: 'single',
      });
    } else if (e.buttons === 3) {
      setOpenBehavior({
        index,
        behavior: 'multi',
      });
    }
  }
  function onMouseOverCeils(index: number) {
    setOpenBehavior({
      index,
      behavior: openBehavior.behavior,
    });
  }
  function onMouseUpCeils() {
    const { behavior, index } = openBehavior;
    if (index === -1) return;
    if (behavior === 'single') {
      openCeil(index);
    } else if (behavior === 'multi') {
      openCeils(index);
    }
  }
  function hoverOption(option: string) {
    if (openOption) setOpenOption(option);
  }
  useEffect(() => {
    function onMouseUp(e: MouseEvent) {
      setOpenBehavior({ index: -1, behavior: '' });
      setMouseDownContent(false);
      if (dropDown.current && !dropDown.current.contains(e.target as Node))
        setOpenOption('');
    }
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);
  return (
    <div className="xp-minesweeper" onContextMenu={e => e.preventDefault()}>
      <div className="mine__drop-downs" ref={dropDown}>
        <div
          style={{ visibility: openOption === 'Game' ? 'visible' : 'hidden' }}
          className="mine__drop-down"
        >
          <div className="mine__drop-down__title">Game</div>
          <div className="mine__drop-down__menu">
            <div className="mine__drop-down__row" onMouseUp={() => onReset()}>
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">New</div>
              <span className="mine__drop-down__hot-key">F2</span>
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div
              className="mine__drop-down__row"
              onMouseUp={() => onReset('Beginner')}
            >
              <div className="mine__drop-down__check">
                {difficulty === 'Beginner' && (
                  <img src={`${A}/checked.png`} alt="checked" />
                )}
              </div>
              <span>Beginner</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div
              className="mine__drop-down__row"
              onMouseUp={() => onReset('Intermediate')}
            >
              <div className="mine__drop-down__check">
                {difficulty === 'Intermediate' && (
                  <img src={`${A}/checked.png`} alt="checked" />
                )}
              </div>
              <span>Intermediate</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div
              className="mine__drop-down__row"
              onMouseUp={() => onReset('Expert')}
            >
              <div className="mine__drop-down__check">
                {difficulty === 'Expert' && (
                  <img src={`${A}/checked.png`} alt="checked" />
                )}
              </div>
              <span>Expert</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <span>Custom...</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check">
                <img src={`${A}/checked.png`} alt="checked" />
              </div>
              <span>Marks (?)</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check">
                <img src={`${A}/checked.png`} alt="checked" />
              </div>
              <span>Color</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <span>Sound</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <span>Best Times...</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__separator" />
            <div className="mine__drop-down__row" onMouseUp={onClose}>
              <div className="mine__drop-down__check" />
              <span>Exit</span>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
          </div>
        </div>
        <div
          style={{ visibility: openOption === 'Help' ? 'visible' : 'hidden' }}
          className="mine__drop-down"
        >
          <div className="mine__drop-down__title">Help</div>
          <div className="mine__drop-down__menu">
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">Contents</div>
              <span className="mine__drop-down__hot-key">F1</span>
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">Search for Help on...</div>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
            <div className="mine__drop-down__row">
              <div className="mine__drop-down__check" />
              <div className="mine__drop-down__text">Using Help</div>
              <span className="mine__drop-down__hot-key" />
              <div className="mine__drop-down__arrow" />
            </div>
          </div>
        </div>
      </div>
      <div className="mine__top-bar" ref={topBar}>
        <div
          onMouseDown={() => setOpenOption('Game')}
          onMouseOver={() => hoverOption('Game')}
          className="mine__top-bar__text"
        >
          Game
        </div>
        <div
          onMouseDown={() => setOpenOption('Help')}
          onMouseOver={() => hoverOption('Help')}
          className="mine__top-bar__text"
        >
          Help
        </div>
      </div>
      <section className="mine__content" onMouseDown={onMouseDownContent}>
        <div className="mine__score-bar">
          <div className="mine__digits__outer">
            {renderDigits(remainMines())}
          </div>
          <div className="mine__face__outer">
            <button ref={face} className="mine__face" onClick={() => onReset()}>
              {statusFace()}
              <img alt="smile" src={`${A}/smile.png`} />
            </button>
          </div>
          <div className="mine__digits__outer">{renderDigits(seconds)}</div>
        </div>
        <div
          className="mine__content__inner"
          style={{
            gridTemplateColumns: `repeat(${columns}, 16px)`,
            gridTemplateRows: `repeat(${rows}, 16px)`,
          }}
          onMouseUp={onMouseUpCeils}
        >
          <Ceils
            ceils={ceils}
            onMouseDown={onMouseDownCeils}
            onMouseEnter={onMouseOverCeils}
          />
        </div>
      </section>
    </div>
  );
}

function getTextImg(index: number) {
  return [
    `${A}/empty.png`,
    `${A}/open1.png`,
    `${A}/open2.png`,
    `${A}/open3.png`,
    `${A}/open4.png`,
    `${A}/open5.png`,
    `${A}/open6.png`,
    `${A}/open7.png`,
    `${A}/open8.png`,
  ][index];
}

interface CeilsProps {
  ceils: Ceil[];
  onMouseDown: (e: React.MouseEvent, index: number) => void;
  onMouseEnter: (index: number) => void;
}

function Ceils({ ceils, onMouseDown, onMouseEnter }: CeilsProps) {
  function renderContent(ceil: Ceil) {
    const { state, minesAround, opening } = ceil;
    switch (state) {
      case 'open':
        return <MinesAround mines={minesAround} />;
      case 'flag':
        return <Flag />;
      case 'misflagged':
        return <MisFlagged />;
      case 'mine':
        return <Mine />;
      case 'die':
        return <Die />;
      case 'unknown':
        return opening ? <QuestionOpen /> : <Question />;
      default:
        return opening ? (
          <div className="mine__ceil-open" />
        ) : (
          <div className="mine__ceil-cover" />
        );
    }
  }

  return (
    <>
      {ceils.map((ceil, index) => (
        <div
          key={index}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseDown={e => onMouseDown(e, index)}
          className="mine__ceil"
        >
          {renderContent(ceil)}
        </div>
      ))}
    </>
  );
}

const Die = () => (
  <>
    <div className="mine__ceil-open" />
    <img alt="death" src={`${A}/mine-death.png`} />
  </>
);
const MisFlagged = () => (
  <>
    <div className="mine__ceil-open" />
    <img alt="misFlagged" src={`${A}/misflagged.png`} />
  </>
);
const Flag = () => (
  <>
    <div className="mine__ceil-cover" />
    <img alt="flag" src={`${A}/flag.png`} />
  </>
);
const MinesAround = ({ mines }: { mines: number }) => (
  <>
    <div className="mine__ceil-open" />
    <img alt="mines-around" src={getTextImg(mines)} />
  </>
);
const Question = () => (
  <>
    <div className="mine__ceil-cover" />
    <img alt="question" src={`${A}/question.png`} />
  </>
);
const QuestionOpen = () => (
  <>
    <div className="mine__ceil-open" />
    <img alt="question" src={`${A}/question.png`} />
  </>
);
const Mine = () => (
  <>
    <div className="mine__ceil-open" />
    <img alt="mine" src={`${A}/mine-ceil.png`} />
  </>
);

export default MineSweeperView;
