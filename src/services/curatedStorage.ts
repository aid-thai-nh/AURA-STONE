import { FurniturePiece } from '../types';

const CURATED_KEY = 'aura_stone_curated_pieces';
const COMPARE_KEY = 'aura_stone_compare_pieces';

export const getCuratedPieces = (): FurniturePiece[] => {
  try {
    const raw = localStorage.getItem(CURATED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleCuratedPiece = (piece: FurniturePiece): boolean => {
  const current = getCuratedPieces();
  const exists = current.some(p => p.id === piece.id);
  let updated: FurniturePiece[];
  if (exists) {
    updated = current.filter(p => p.id !== piece.id);
  } else {
    updated = [...current, piece];
  }
  try {
    localStorage.setItem(CURATED_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return !exists;
};

export const isPieceCurated = (id: string): boolean => {
  const current = getCuratedPieces();
  return current.some(p => p.id === id);
};

export const getComparePieces = (): FurniturePiece[] => {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleComparePiece = (piece: FurniturePiece): { added: boolean; list: FurniturePiece[]; message?: string } => {
  const current = getComparePieces();
  const exists = current.some(p => p.id === piece.id);
  if (exists) {
    const updated = current.filter(p => p.id !== piece.id);
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
    return { added: false, list: updated };
  } else {
    if (current.length >= 3) {
      return { 
        added: false, 
        list: current, 
        message: 'Chỉ có thể so sánh tối đa 3 tác phẩm cùng lúc để đảm bảo độ chi tiết của bản vẽ.' 
      };
    }
    const updated = [...current, piece];
    localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
    return { added: true, list: updated };
  }
};

export const clearCompare = () => {
  localStorage.removeItem(COMPARE_KEY);
};
