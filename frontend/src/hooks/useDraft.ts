/* Guarda y recupera el código del editor por problema, para que no se pierda si falla el envío (F01).*/

import { useCallback, useMemo, useState } from 'react';

const STORAGE_PREFIX = 'zheta_draft_';

function getStorageKey(problemId: string): string {
  return `${STORAGE_PREFIX}${problemId}`;
}

function readDraftFromStorage(problemId: string, fallbackCode: string): string {
  if (!problemId) {
    return fallbackCode;
  }

  try {
    const saved = window.localStorage.getItem(getStorageKey(problemId));
    return saved !== null ? saved : fallbackCode;
  } catch {
    return fallbackCode;
  }
}

export interface UseDraftResult {
  code: string;
  updateCode: (value: string) => void;
  resetDraft: () => void;
}

export function useDraft(problemId: string, initialCode: string): UseDraftResult {
  // Guarda solo ediciones manuales asociadas al problemId en el que se escribieron
  const [editedDraft, setEditedDraft] = useState<{
    problemId: string;
    value: string;
  } | null>(null);

  const code = useMemo(() => {
    if (editedDraft && editedDraft.problemId === problemId) {
      return editedDraft.value;
    }
    return readDraftFromStorage(problemId, initialCode);
  }, [editedDraft, problemId, initialCode]);

  const updateCode = useCallback(
    (value: string) => {
      if (!problemId) {
        return;
      }

      setEditedDraft({ problemId, value });

      try {
        window.localStorage.setItem(getStorageKey(problemId), value);
      } catch {
        // Ignora errores de cuota o acceso restringido a localStorage
      }
    },
    [problemId]
  );

  const resetDraft = useCallback(() => {
    if (!problemId) {
      return;
    }

    setEditedDraft({ problemId, value: initialCode });

    try {
      window.localStorage.removeItem(getStorageKey(problemId));
    } catch {
      // Ignora errores de acceso a localStorage
    }
  }, [problemId, initialCode]);

  return {
    code,
    updateCode,
    resetDraft,
  };
}

export default useDraft;