"use client";

import React, { useReducer, useEffect, useState, useRef } from 'react';
import MinesweeperView from './MinesweeperView';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Expert';
export type CeilStateName =
  | 'cover'
  | 'flag'
  | 'unknown'
  | 'open'
  | 'die'
  | 'misflagged'
  | 'mine';

export interface Ceil {
  state: CeilStateName;
  minesAround: number;
  opening: boolean;
}

export interface GameState {
  difficulty: Difficulty;
  status: 'new' | 'started' | 'died' | 'won';
  rows: number;
  columns: number;
  mines: number;
  ceils: Ceil[];
}

export const Config: Record<Difficulty, { rows: number; columns: number; mines: number }> = {
  Beginner: { rows: 9, columns: 9, mines: 10 },
  Intermediate: { rows: 16, columns: 16, mines: 40 },
  Expert: { rows: 16, columns: 30, mines: 99 },
};

// lodash.samplesize yerine küçük bir Fisher-Yates örneklemesi
function sampleSize<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

type Action =
  | { type: 'CLEAR_MAP'; payload?: Difficulty }
  | { type: 'START_GAME'; payload: number }
  | { type: 'OPEN_CEIL'; payload: number }
  | { type: 'CHANGE_CEIL_STATE'; payload: number }
  | { type: 'GAME_OVER'; payload: number }
  | { type: 'WON' }
  | { type: 'OPENING_CEIL'; payload: number }
  | { type: 'OPENING_CEILS'; payload: number };

function getInitState(difficulty: Difficulty = 'Beginner'): GameState {
  return {
    difficulty,
    status: 'new',
    ...genGameConfig(Config[difficulty]),
  };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'CLEAR_MAP': {
      const difficulty = action.payload || state.difficulty;
      return getInitState(difficulty);
    }
    case 'START_GAME': {
      // Oyun zaten başladıysa mayınları yeniden yerleştirme (çift tetiklenme
      // sayıların mevcut yerleşimle tutarsız kalmasına yol açıyordu)
      if (state.status !== 'new') return state;
      const exclude = action.payload;
      return {
        ...state,
        ...insertMines({ ...Config[state.difficulty], exclude }, state.ceils),
        status: 'started',
      };
    }
    case 'OPEN_CEIL': {
      const indexes = autoCeils(state, action.payload);
      const ceils = [...state.ceils];
      indexes.forEach(i => {
        const ceil = ceils[i];
        ceils[i] = { ...ceil, state: 'open' };
      });
      return {
        ...state,
        ceils,
      };
    }
    case 'CHANGE_CEIL_STATE': {
      const index = action.payload;
      const ceils = [...state.ceils];
      const ceil = state.ceils[index];
      let newState: CeilStateName;
      switch (ceil.state) {
        case 'cover':
          newState = 'flag';
          break;
        case 'flag':
          newState = 'unknown';
          break;
        case 'unknown':
          newState = 'cover';
          break;
        default:
          throw new Error(`Unknown ceil state ${ceil.state}`);
      }
      ceils[index] = { ...ceil, state: newState };
      return {
        ...state,
        ceils,
      };
    }
    case 'GAME_OVER': {
      const ceils: Ceil[] = state.ceils.map(ceil => {
        if (ceil.minesAround < 0 && ceil.state !== 'flag') {
          return {
            ...ceil,
            state: 'mine' as CeilStateName,
          };
        } else if (ceil.state === 'flag' && ceil.minesAround >= 0) {
          return {
            ...ceil,
            state: 'misflagged' as CeilStateName,
          };
        } else {
          return {
            ...ceil,
            opening: false,
          };
        }
      });
      ceils[action.payload] = { ...ceils[action.payload], state: 'die' };
      return {
        ...state,
        status: 'died',
        ceils,
      };
    }
    case 'WON': {
      const ceils: Ceil[] = state.ceils.map(ceil => {
        if (ceil.minesAround >= 0) {
          return {
            ...ceil,
            state: 'open' as CeilStateName,
          };
        } else {
          return {
            ...ceil,
            state: 'flag' as CeilStateName,
          };
        }
      });
      return {
        ...state,
        status: 'won',
        ceils,
      };
    }
    case 'OPENING_CEIL': {
      const ceil = state.ceils[action.payload];
      const ceils = state.ceils.map(c => ({
        ...c,
        opening: false,
      }));
      if (ceil) ceils[action.payload] = { ...ceil, opening: true };
      return {
        ...state,
        ceils,
      };
    }
    case 'OPENING_CEILS': {
      const indexes = getNearIndexes(action.payload, state.rows, state.columns);
      const ceils = state.ceils.map(c => ({
        ...c,
        opening: false,
      }));
      [...indexes, action.payload].forEach(index => {
        const ceil = { ...ceils[index] };
        ceil.opening = true;
        ceils[index] = ceil;
      });
      return {
        ...state,
        ceils,
      };
    }
    default:
      return state;
  }
}

interface MineSweeperProps {
  defaultDifficulty?: Difficulty;
  onClose: () => void;
  onGameResize?: (width: number, height: number) => void;
  // Sadece mobilde geçilir: sağ tık olmadığı için basılı tutma ipucunu boş alanda gösterir
  touchHint?: string;
}

function MineSweeper({ defaultDifficulty = 'Beginner', onClose, onGameResize, touchHint }: MineSweeperProps) {
  const [state, dispatch] = useReducer(reducer, getInitState(defaultDifficulty));
  const seconds = useTimer(state.status);
  const gameRef = useRef<HTMLDivElement>(null);

  // Oyun alanının boyutunu izle; değişince pencereyi oyuna göre boyutlandır
  useEffect(() => {
    const el = gameRef.current;
    if (!onGameResize || !el) return;
    const report = () => onGameResize(el.offsetWidth, el.offsetHeight);
    report();
    const observer = new ResizeObserver(report);
    observer.observe(el);
    return () => observer.disconnect();
  }, [onGameResize]);

  function changeCeilState(index: number) {
    const ceil = state.ceils[index];
    if (ceil.state === 'open' || ['won', 'died'].includes(state.status)) return;
    dispatch({ type: 'CHANGE_CEIL_STATE', payload: index });
  }
  function openCeil(index: number) {
    switch (state.status) {
      case 'new':
        dispatch({ type: 'START_GAME', payload: index });
        dispatch({ type: 'OPEN_CEIL', payload: index });
        break;
      case 'started': {
        const ceil = state.ceils[index];
        if (['flag', 'open'].includes(ceil.state)) {
          break;
        } else if (ceil.minesAround < 0) {
          dispatch({ type: 'GAME_OVER', payload: index });
        } else {
          dispatch({ type: 'OPEN_CEIL', payload: index });
        }
        break;
      }
      default:
        break;
    }
  }
  function openCeils(index: number) {
    const ceil = state.ceils[index];
    if (
      ceil.state !== 'open' ||
      ceil.minesAround <= 0 ||
      state.status !== 'started'
    )
      return;
    const indexes = getNearIndexes(index, state.rows, state.columns);
    const nearCeils = indexes.map(i => state.ceils[i]);
    if (
      nearCeils.filter(c => c.state === 'flag').length !== ceil.minesAround
    )
      return;
    const mineIndex = indexes.find(
      i => state.ceils[i].minesAround < 0 && state.ceils[i].state !== 'flag',
    );
    if (mineIndex !== undefined) {
      dispatch({ type: 'GAME_OVER', payload: mineIndex });
    } else {
      indexes.forEach(i => dispatch({ type: 'OPEN_CEIL', payload: i }));
    }
  }
  useEffect(() => {
    if (state.status === 'started' && checkRemains() === 0) {
      dispatch({ type: 'WON' });
    }
  });
  function onReset(difficulty?: Difficulty) {
    dispatch({ type: 'CLEAR_MAP', payload: difficulty });
  }
  function checkRemains() {
    const safeCeils = state.ceils
      .filter(ceil => ceil.state !== 'open')
      .filter(ceil => ceil.minesAround >= 0);
    return safeCeils.length;
  }
  function openingCeil(index: number) {
    if (['died', 'won'].includes(state.status)) return;
    dispatch({ type: 'OPENING_CEIL', payload: index });
  }
  function openingCeils(index: number) {
    if (['died', 'won'].includes(state.status)) return;
    dispatch({ type: 'OPENING_CEILS', payload: index });
  }
  return (
    <div className="xp-minesweeper-window">
      <div ref={gameRef} style={{ display: 'inline-block' }}>
        <MinesweeperView
          {...state}
          onClose={onClose}
          changeCeilState={changeCeilState}
          openCeil={openCeil}
          openCeils={openCeils}
          onReset={onReset}
          seconds={seconds}
          openingCeil={openingCeil}
          openingCeils={openingCeils}
        />
      </div>
      {touchHint && <p className="xp-minesweeper-hint">{touchHint}</p>}
    </div>
  );
}

function genGameConfig(config: { rows: number; columns: number; mines: number }) {
  const { rows, columns, mines } = config;
  const ceils: Ceil[] = Array(rows * columns)
    .fill(null)
    .map(() => ({
      state: 'cover' as CeilStateName,
      minesAround: 0,
      opening: false,
    }));
  return {
    rows,
    columns,
    ceils,
    mines,
  };
}

function insertMines(
  config: { rows: number; columns: number; mines: number; exclude: number },
  originCeils: Ceil[],
) {
  const { rows, columns, mines, exclude } = config;
  // minesAround sıfırlanarak kopyalanır; olası bir yeniden yerleştirmede
  // eski sayıların üzerine eklenmesini engeller
  const ceils = originCeils.map(ceil => ({ ...ceil, minesAround: 0 }));
  if (rows * columns !== ceils.length)
    throw new Error('rows and columns not equal to ceils');
  const indexArray = [...Array(rows * columns).keys()];
  sampleSize(indexArray.filter(i => i !== exclude), mines).forEach(chosen => {
    ceils[chosen].minesAround = -10;
    getNearIndexes(chosen, rows, columns).forEach(nearIndex => {
      ceils[nearIndex].minesAround += 1;
    });
  });
  return {
    rows,
    columns,
    ceils,
    mines,
  };
}

function autoCeils(state: GameState, index: number): number[] {
  const { rows, columns } = state;
  const ceils = state.ceils.map(ceil => ({
    ...ceil,
    walked: false,
  }));
  return walkCeils(index);
  function walkCeils(idx: number): number[] {
    const ceil = ceils[idx];
    if (ceil.walked || ceil.minesAround < 0 || ceil.state === 'flag') return [];
    ceil.walked = true;
    if (ceil.minesAround > 0) return [idx];
    return [
      idx,
      ...getNearIndexes(idx, rows, columns).reduce<number[]>(
        (lastIndexes, ceilIndex) => {
          return [...lastIndexes, ...walkCeils(ceilIndex)];
        },
        [],
      ),
    ];
  }
}

function getNearIndexes(index: number, rows: number, columns: number): number[] {
  if (index < 0 || index >= rows * columns) return [];
  const row = Math.floor(index / columns);
  const column = index % columns;
  return [
    index - columns - 1,
    index - columns,
    index - columns + 1,
    index - 1,
    index + 1,
    index + columns - 1,
    index + columns,
    index + columns + 1,
  ].filter((_, arrayIndex) => {
    if (row === 0 && arrayIndex < 3) return false;
    if (row === rows - 1 && arrayIndex > 4) return false;
    if (column === 0 && [0, 3, 5].includes(arrayIndex)) return false;
    if (column === columns - 1 && [2, 4, 7].includes(arrayIndex)) return false;
    return true;
  });
}

function useTimer(status: GameState['status']) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    switch (status) {
      case 'started':
        timer = setInterval(() => setSeconds(sec => sec + 1), 1000);
        break;
      case 'new':
        setSeconds(0);
        break;
      default:
        break;
    }
    return () => clearInterval(timer);
  }, [status]);
  return seconds;
}

export default MineSweeper;
