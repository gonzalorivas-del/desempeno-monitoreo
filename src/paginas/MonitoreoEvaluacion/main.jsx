import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MonitoreoEvaluacion from './index.jsx';
import ComponentsShowroom from '../../components/ComponentsShowroom.jsx';
import { EvaluationProvider } from '../../context/EvaluationContext.jsx';
import tokens from '../../tokens/tokens.json';
import '../../style.css';

const linkStyle = {
  position: 'fixed',
  bottom: '16px',
  left: '16px',
  fontSize: '12px',
  color: tokens.colors.dash.$value,
  fontFamily: tokens.typography['font-family'].roboto.$value,
  fontWeight: 400,
  textDecoration: 'none',
  zIndex: 9999,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  lineHeight: 1.3,
};

function App() {
  const [showShowroom, setShowShowroom] = useState(
    () => window.location.hash === '#componentes',
  );

  useEffect(() => {
    function onHashChange() {
      setShowShowroom(window.location.hash === '#componentes');
    }
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  function goToShowroom() {
    window.location.hash = '#componentes';
  }

  function goToPage() {
    window.location.hash = '';
  }

  return (
    <>
      {showShowroom ? (
        <EvaluationProvider onSetView={(v) => v === 'list' && goToPage()}>
          <ComponentsShowroom />
        </EvaluationProvider>
      ) : (
        <MonitoreoEvaluacion />
      )}

      <button type="button" style={linkStyle} onClick={showShowroom ? goToPage : goToShowroom}>
        {showShowroom ? '← Volver a la página' : 'Ver componentes'}
      </button>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
