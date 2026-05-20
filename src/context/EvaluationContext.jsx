import { createContext, useContext, useState } from 'react';

const EvaluationContext = createContext(null);

export function EvaluationProvider({ children, onSetView }) {
  const [view, setViewState] = useState('list');

  function setView(v) {
    setViewState(v);
    onSetView?.(v);
  }

  return (
    <EvaluationContext.Provider value={{ view, setView }}>
      {children}
    </EvaluationContext.Provider>
  );
}

export function useEvaluation() {
  const ctx = useContext(EvaluationContext);
  if (!ctx) throw new Error('useEvaluation must be used inside EvaluationProvider');
  return ctx;
}
