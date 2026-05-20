import { useState, useEffect } from 'react';
import tokens from '../../tokens/tokens.json';
import { Button } from '../../components/Button';
import { Tabs } from '../../components/Tabs';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Checkbox } from '../../components/Checkbox';
import { Filtro } from '../../components/Filtro';
import { Helper } from '../../components/Helper';
import styles from './MonitoreoEvaluacion.module.css';

// ── Data ──────────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'monitoreo', label: 'Monitoreo' },
  { key: 'reporte', label: 'Reporte' },
];

const COLABORADORES = [
  {
    id: 1,
    nombre: 'Ana Silva Reyes',
    cargo: 'Desarrolladora Front End',
    avance: 19,
    fase: 'Evaluación',
    faseStatus: 'En progreso',
    diasEnFase: 10,
    diasAlerta: true,
  },
  {
    id: 2,
    nombre: 'Mario Luisi Luisillo',
    cargo: 'Soporte y atención',
    avance: 19,
    fase: 'Evaluación',
    faseStatus: 'En progreso',
    diasEnFase: 8,
    diasAlerta: true,
  },
  {
    id: 3,
    nombre: 'Carmen Vega',
    cargo: 'Soporte cliente',
    avance: 100,
    fase: 'Calibración',
    faseStatus: 'En progreso',
    diasEnFase: 4,
    diasAlerta: false,
  },
  {
    id: 4,
    nombre: 'Jorge Soto',
    cargo: 'Analista QA',
    avance: 0,
    fase: 'Evaluación',
    faseStatus: 'En progreso',
    diasEnFase: 3,
    diasAlerta: false,
  },
  {
    id: 5,
    nombre: 'Elena Torres',
    cargo: 'Marketing Specialist',
    avance: 100,
    fase: 'Calibración',
    faseStatus: 'En progreso',
    diasEnFase: 3,
    diasAlerta: false,
  },
  {
    id: 6,
    nombre: 'Raúl Martin',
    cargo: 'Desarrollador Backend',
    avance: 100,
    fase: 'Retroalimentación',
    faseStatus: 'En progreso',
    diasEnFase: 3,
    diasAlerta: false,
  },
  {
    id: 7,
    nombre: 'Nemesio Maldonado',
    cargo: 'Desarrollador Backend',
    avance: 72,
    fase: 'Finalizado',
    faseStatus: null,
    diasEnFase: 3,
    diasAlerta: false,
  },
  {
    id: 8,
    nombre: 'Sofía Castro',
    cargo: 'Recursos Humanos',
    avance: 19,
    fase: 'Evaluación',
    faseStatus: 'En progreso',
    diasEnFase: 5,
    diasAlerta: false,
  },
];

// ── Filtro fields config ───────────────────────────────────────────────────────

const FILTRO_FIELDS_CONFIG = [
  {
    key: 'fase-actual',
    label: 'Fase actual',
    options: ['Evaluación', 'Calibración', 'Retroalimentación'],
  },
  {
    key: 'avance',
    label: 'Avance de formularios',
    options: ['Sin avance (0%)', 'Bajo (1% – 33%)', 'Medio (34% – 66%)', 'Alto (67% – 99%)', 'Completado (100%)'],
  },
  {
    key: 'dias',
    label: 'Días en fase',
    options: ['Más de 3 días', 'Más de 7 días', 'Más de 14 días', 'Con alerta (+7 días)'],
  },
];

// ── Inline SVG icons ───────────────────────────────────────────────────────────

function IconCloseCircle({ color = '#5780AD', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.1602 2.02842C8.79827 2.21316 6.57873 3.23061 4.89715 4.89942C4.1346 5.65461 3.50628 6.53419 3.03915 7.50042C2.56215 8.46742 2.26315 9.42042 2.09215 10.5204C1.98415 11.2194 1.99515 12.6814 2.11415 13.3764C2.42015 15.1674 3.10315 16.7134 4.19315 18.0804C4.58115 18.5674 5.43315 19.4194 5.92015 19.8074C7.58718 21.1472 9.6428 21.9119 11.7802 21.9874C13.4442 22.0464 14.9762 21.7134 16.5002 20.9614C18.4447 20.0159 20.0156 18.445 20.9612 16.5004C21.4382 15.5334 21.7372 14.5804 21.9082 13.4804C22.0162 12.7814 22.0052 11.3194 21.8862 10.6244C21.5802 8.83342 20.8972 7.28742 19.8072 5.92042C19.4472 5.46942 18.5872 4.60042 18.1442 4.24142C16.8302 3.17742 15.1332 2.40742 13.5202 2.14342C12.74 2.01956 11.9487 1.981 11.1602 2.02842ZM12.9212 4.16242C14.0824 4.30157 15.1985 4.6953 16.1901 5.31551C17.1816 5.93573 18.024 6.76714 18.6572 7.75042C18.9272 8.16942 19.3282 9.01342 19.4932 9.51042C19.7512 10.2874 19.8432 10.8384 19.8682 11.7474C19.9062 13.1124 19.7332 14.0384 19.2222 15.2064C18.5719 16.6527 17.5087 17.8746 16.1662 18.7184C15.211 19.3014 14.1476 19.6847 13.0402 19.8454C12.5082 19.9204 11.3222 19.9094 10.8202 19.8254C7.23115 19.2244 4.57615 16.4654 4.15615 12.9034C4.08015 12.2584 4.13115 11.0524 4.25915 10.4404C4.50991 9.23083 5.03507 8.09498 5.79415 7.12042C6.37478 6.39531 7.07318 5.77297 7.86015 5.27942C8.35371 4.99582 8.8686 4.75108 9.40015 4.54742C9.9909 4.34966 10.601 4.21524 11.2202 4.14642C11.5042 4.11342 12.6102 4.12342 12.9212 4.16242ZM8.75215 8.09142C8.50015 8.17442 8.26015 8.37442 8.15615 8.58542C8.03215 8.83742 8.02415 9.22542 8.13815 9.46042C8.18715 9.56142 8.65815 10.0584 9.41815 10.8104L10.6202 12.0004L9.39615 13.2104C8.30915 14.2844 8.16415 14.4424 8.10615 14.6174C7.97615 15.0064 8.06015 15.3824 8.34015 15.6624C8.48388 15.8065 8.66857 15.9027 8.86901 15.938C9.06945 15.9732 9.27588 15.9458 9.46015 15.8594C9.56515 15.8104 10.0262 15.3754 10.8102 14.5824L12.0002 13.3804L13.1902 14.5834C13.9772 15.3784 14.4342 15.8104 14.5402 15.8594C15.3772 16.2474 16.2482 15.3764 15.8592 14.5404C15.8102 14.4354 15.3752 13.9744 14.5822 13.1904L13.3802 12.0004L14.5822 10.8104C15.3712 10.0294 15.8102 9.56542 15.8592 9.46042C16.2572 8.60642 15.3532 7.73942 14.5102 8.16442C14.4002 8.21942 13.9242 8.67242 13.1702 9.43542L12.0002 10.6204L10.8302 9.43642C10.0612 8.65742 9.60015 8.22142 9.48515 8.16242C9.27415 8.05542 8.95415 8.02442 8.75215 8.09142Z" fill={color} />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9.5" stroke={tokens.colors.panel.$value} strokeWidth="1.4" />
      <path d="M12 11v5" stroke={tokens.colors.panel.$value} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8.5" r="0.9" fill={tokens.colors.panel.$value} />
    </svg>
  );
}

function IconAlertCard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 3L22 21H2L12 3Z" stroke={tokens.colors.alerta.$value} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 10v4" stroke={tokens.colors.alerta.$value} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.8" fill={tokens.colors.alerta.$value} />
    </svg>
  );
}

function IconAlertRow() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 3L22 21H2L12 3Z" stroke={tokens.colors.alerta.$value} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 10v4" stroke={tokens.colors.alerta.$value} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.8" fill={tokens.colors.alerta.$value} />
    </svg>
  );
}

function IconSortUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M7 11V3M3.5 6.5L7 3l3.5 3.5"
        stroke={tokens.colors['gris-deshabilitado'].$value}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMore() {
  return (
    <svg width="20" height="5" viewBox="0 0 20 5" fill={tokens.colors['gris-textos'].$value} aria-hidden="true">
      <circle cx="2.5" cy="2.5" r="2" />
      <circle cx="10" cy="2.5" r="2" />
      <circle cx="17.5" cy="2.5" r="2" />
    </svg>
  );
}


function IconEye() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12C3.5 7 7.5 4 12 4s8.5 3 11 8c-2.5 5-6.5 8-11 8S3.5 17 1 12Z" stroke={tokens.colors.panel.$value} strokeWidth="1.4" />
      <circle cx="12" cy="12" r="3" stroke={tokens.colors.panel.$value} strokeWidth="1.4" />
    </svg>
  );
}

function IconXSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke={tokens.colors.panel.$value} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M18.6072 8.37242C18.3583 8.13389 18.0217 8 17.6709 8C17.32 8 16.9834 8.13389 16.7346 8.37242L11.9668 12.9061L7.26542 8.37242C7.01659 8.13389 6.67999 8 6.32913 8C5.97827 8 5.64167 8.13389 5.39284 8.37242C5.26836 8.49148 5.16956 8.63312 5.10214 8.78919C5.03471 8.94525 5 9.11265 5 9.28171C5 9.45078 5.03471 9.61818 5.10214 9.77424C5.16956 9.93031 5.26836 10.072 5.39284 10.191L11.0239 15.6212C11.1473 15.7412 11.2942 15.8365 11.4561 15.9015C11.6179 15.9665 11.7915 16 11.9668 16C12.1421 16 12.3157 15.9665 12.4775 15.9015C12.6394 15.8365 12.7863 15.7412 12.9097 15.6212L18.6072 10.191C18.7316 10.072 18.8304 9.93031 18.8979 9.77424C18.9653 9.61818 19 9.45078 19 9.28171C19 9.11265 18.9653 8.94525 18.8979 8.78919C18.8304 8.63312 18.7316 8.49148 18.6072 8.37242Z" fill={tokens.colors.importante.$value} />
    </svg>
  );
}

function IconUser({ color = '#B6CEE7' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M7.48864 1.37417C6.53131 1.50484 5.70597 1.92617 5.05531 2.61751C4.54531 3.15951 4.20131 3.83217 4.03464 4.61351C3.96931 4.92151 3.96931 5.69551 4.03531 6.04017C4.19664 6.88351 4.60397 7.62151 5.26197 8.26151L5.48931 8.48217L5.37797 8.52617C5.03731 8.65951 4.36464 9.04951 3.99331 9.32884C2.80064 10.2248 1.98864 11.3835 1.57464 12.7788C1.46931 13.1342 1.36531 13.6382 1.34331 13.9002C1.32664 14.0955 1.32997 14.1155 1.41131 14.2795C1.62197 14.7082 2.14131 14.7948 2.47864 14.4575C2.61931 14.3168 2.63864 14.2595 2.75797 13.6375C2.9258 12.783 3.30077 11.9827 3.84997 11.3068C5.40664 9.39684 8.09997 8.80417 10.3346 9.88017C11.5353 10.4582 12.444 11.4248 12.9673 12.6802C13.104 13.0075 13.252 13.5455 13.294 13.8668C13.3046 13.9475 13.336 14.0875 13.364 14.1788C13.4014 14.3083 13.4774 14.4234 13.5818 14.5086C13.6862 14.5939 13.8141 14.6453 13.9485 14.656C14.0829 14.6667 14.2174 14.6362 14.334 14.5686C14.4506 14.501 14.5438 14.3995 14.6013 14.2775C14.6713 14.1368 14.6673 13.8362 14.5906 13.4462C14.3405 12.1423 13.7062 10.9429 12.7693 10.0022C12.202 9.43017 11.7566 9.11084 10.978 8.71684C10.7173 8.58484 10.5073 8.46751 10.5113 8.45551C10.516 8.44417 10.59 8.37351 10.6753 8.29951C11.2846 7.76884 11.74 6.97617 11.9253 6.12551C12.01 5.73684 12.0093 4.93684 11.9246 4.55084C11.8136 4.03215 11.6084 3.53821 11.3193 3.09351C11.124 2.79684 10.5493 2.22884 10.24 2.02684C9.40331 1.48084 8.41864 1.24751 7.48864 1.37417ZM8.73197 2.78484C9.17424 2.91793 9.57563 3.16079 9.89875 3.49079C10.2219 3.82079 10.4562 4.2272 10.58 4.67217C10.6173 4.80617 10.6266 4.94551 10.6253 5.36017C10.6246 5.85817 10.6213 5.88951 10.5493 6.10684C10.2433 7.02551 9.56264 7.67017 8.64331 7.91284C8.27797 8.00884 7.72197 8.01351 7.37531 7.92284C6.40731 7.67084 5.66197 6.95884 5.41464 6.05084C5.25185 5.45257 5.3024 4.81628 5.55762 4.25122C5.81285 3.68616 6.25681 3.22757 6.81331 2.95417C7.24197 2.74017 7.46997 2.69417 8.03997 2.70484C8.43864 2.71284 8.52197 2.72217 8.73197 2.78484Z" fill={color} />
    </svg>
  );
}

function IconMail({ color = '#B6CEE7' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke={color} strokeWidth="1.4" />
      <path d="M2 7l8 5 8-5" stroke={color} strokeWidth="1.4" />
      <path d="M15 11l4-3M5 11l-4-3" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke={tokens.colors.blanco.$value} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke={tokens.colors['gris-deshabilitado'].$value} strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke={tokens.colors['gris-deshabilitado'].$value} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowRight({ color = '#B6CEE7' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h12M10 4l5 5-5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowLeft({ color = '#B6CEE7' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M15 9H3M8 4L3 9l5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICON_COLOR_ENABLED  = '#B6CEE7'; /* auxiliar */
const ICON_COLOR_DISABLED = '#999999'; /* gris-textos */

function IconChevronRight() {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" aria-hidden="true">
      <path d="M1 1l6 5.5L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── DonutChart ─────────────────────────────────────────────────────────────────

/**
 * Gráfico de dona SVG para visualizar avance global.
 * Segmentos: completados (exito), en progreso (importante), no iniciado (gris-deshabilitado).
 */
function DonutChart({ completed = 62, inProgress = 37, notStarted = 1 }) {
  const cx = 60.5;
  const cy = 60.5;
  const r = 50;
  const sw = 10;
  const C = 2 * Math.PI * r;

  const completedLen = (completed / 100) * C;
  const inProgressLen = (inProgress / 100) * C;
  const notStartedLen = (notStarted / 100) * C;

  return (
    <svg
      width="121"
      height="121"
      viewBox="0 0 121 121"
      role="img"
      aria-label={`Avance global: ${completed}% completado, ${inProgress}% en progreso, ${notStarted}% no iniciado`}
      style={{ flexShrink: 0 }}
    >
      {/* Fondo */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={tokens.colors['gris-secundario'].$value}
        strokeWidth={sw}
      />
      {/* Completados — exito */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={tokens.colors.exito.$value}
        strokeWidth={sw}
        strokeDasharray={`${completedLen} 99999`}
        strokeDashoffset={0}
        strokeLinecap="butt"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* En progreso — importante */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={tokens.colors.importante.$value}
        strokeWidth={sw}
        strokeDasharray={`${inProgressLen} 99999`}
        strokeDashoffset={-completedLen}
        strokeLinecap="butt"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      {/* No iniciado — gris-deshabilitado */}
      {notStartedLen > 0 && (
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={tokens.colors['gris-deshabilitado'].$value}
          strokeWidth={sw}
          strokeDasharray={`${notStartedLen} 99999`}
          strokeDashoffset={-(completedLen + inProgressLen)}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}
      {/* Texto central */}
      <text
        x={cx}
        y={cy + 8}
        textAnchor="middle"
        fontFamily={tokens.typography['font-family'].roboto.$value}
        fontSize="22"
        fontWeight="bold"
        fill={tokens.colors['negro-textos'].$value}
      >
        {completed}%
      </text>
    </svg>
  );
}

// ── Subcomponents ──────────────────────────────────────────────────────────────

/** Banner informativo de modalidad */
function BannerInfo({ text }) {
  return (
    <div className={styles.banner} role="note" aria-label="Información de modalidad">
      <IconInfo />
      <p className={styles.bannerText}>{text}</p>
    </div>
  );
}

/** Card: Avance global de formularios */
function AvanceGlobalCard() {
  const c = tokens.colors;
  return (
    <div className={`${styles.statsCard} ${styles.atencionCard}`} aria-label="Avance global de formularios">
      <h2 className={styles.statsTitle}>Avance global de formularios</h2>
      <div className={styles.avanceContent}>
        <DonutChart completed={62} inProgress={37} notStarted={1} />
        <div className={styles.avanceLegend}>
          <div className={styles.legendItem}>
            <div className={styles.legendItemRow}>
              <span className={styles.legendDot} style={{ background: c.exito.$value }} />
              <span className={styles.legendLabel}>Completados</span>
            </div>
            <span className={styles.legendValue}>31 (62%) de 50 (100%)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendItemRow}>
              <span className={styles.legendDot} style={{ background: c.importante.$value }} />
              <span className={styles.legendLabel}>En progreso</span>
            </div>
            <span className={styles.legendValue}>18 (37%)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendItemRow}>
              <span className={styles.legendDot} style={{ background: c['gris-deshabilitado'].$value }} />
              <span className={styles.legendLabel}>No iniciado</span>
            </div>
            <span className={styles.legendValue}>1 (1%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card: Total participantes */
function TotalParticipantesCard() {
  const c = tokens.colors;
  return (
    <div className={`${styles.statsCard} ${styles.totalParticipantesCard}`} aria-label="Total participantes">
      <h2 className={styles.statsTitle}>Total participantes</h2>
      <div className={styles.totalContent}>
        <div className={styles.totalNumeroRow}>
          <span className={styles.totalNumero}>150</span>
          <span className={styles.totalPorcentaje}>(100%)</span>
        </div>
        <div className={styles.totalGeneroList}>
          <div className={styles.totalGeneroItem}>
            <IconUser color={c.auxiliar.$value} />
            <span className={styles.totalGeneroLabel}>Hombres 50 (33%)</span>
          </div>
          <div className={styles.totalGeneroItem}>
            <IconUser color="#E28888" />
            <span className={styles.totalGeneroLabel}>Mujeres 50 (33%)</span>
          </div>
          <div className={styles.totalGeneroItem}>
            <IconUser color={c['gris-deshabilitado'].$value} />
            <span className={styles.totalGeneroLabel}>Indefinido 50 (33%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card: Atención requerida */
function AtencionRequeridaCard({ onVerCasos, active = false }) {
  return (
    <div className={`${styles.statsCard} ${styles.atencionCard}`} aria-label="Atención requerida">
      <div className={styles.atencionHeader}>
        <IconAlertCard />
        <h2 className={styles.atencionTitle}>Atención requerida</h2>
      </div>
      <div className={styles.atencionContent}>
        <span className={styles.atencionNumero}>2</span>
        <div className={styles.atencionSubInfo}>
          <p className={styles.atencionSubtitle}>Colaboradores estancados</p>
          <p className={styles.atencionDetalle}>(+ 7 días)</p>
        </div>
      </div>
      <Button variant="tertiary" size="lg" onClick={onVerCasos}>
        {active ? 'Ocultar' : 'Ver casos'}
      </Button>
    </div>
  );
}

/** Card: Fases de la evaluación */
function FasesInfoCard() {
  return (
    <div className={styles.fasesCard} aria-label="Fases de la evaluación">
      <div>
        <p className={styles.fasesTitle}>Fases de la evaluación (3)</p>
        <p className={styles.fasesSubtitle}>Evaluación, Calibración y Retroalimentación</p>
      </div>
      <div className={styles.fasesDates}>
        <div>
          <p className={styles.fasesDateLabel}>Fecha inicio</p>
          <p className={styles.fasesDateValue}>10 de mayo de 2024</p>
        </div>
        <div>
          <p className={styles.fasesDateLabel}>Fecha término</p>
          <p className={styles.fasesDateValue}>10 de mayo de 2024</p>
        </div>
      </div>
      <div>
        <p className={styles.fasesDateLabel}>Última actualización</p>
        <p className={styles.fasesDateValue}>10 de mayo de 2024 10:00 Horas</p>
      </div>
      <button type="button" className={styles.fasesLink}>Ver más datos</button>
    </div>
  );
}

/** Modal de selección de opciones para un filtro */
function FilterModal({ field, selectedValue, onSelect, onClose, anchorRect }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const modalStyle = anchorRect
    ? {
        position: 'fixed',
        top: anchorRect.top,
        left: anchorRect.left,
        width: anchorRect.width,
      }
    : {};
  return (
    <div className={styles.filterModalOverlay} onPointerDown={onClose} role="presentation">
      <div
        className={styles.filterModal}
        style={modalStyle}
        onPointerDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Filtrar por ${field.label}`}
      >
        <div className={styles.filterModalHeader}>
          <h3 className={styles.filterModalTitle}>{field.label}</h3>
        </div>

        <ul className={styles.filterModalList} role="listbox" aria-label={field.label}>
          {field.options.map((option) => (
            <li key={option} role="none">
              <button
                type="button"
                role="option"
                aria-selected={selectedValue === option}
                className={[
                  styles.filterModalOption,
                  selectedValue === option && styles.filterModalOptionActive,
                ].filter(Boolean).join(' ')}
                onClick={() => { onSelect(field.key, option); onClose(); }}
              >
                <span>{option}</span>
                {selectedValue === option && (
                  <span className={styles.filterModalCheck} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-8" stroke="#1E5591" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {selectedValue && (
          <button
            type="button"
            className={styles.filterModalClear}
            onClick={() => { onSelect(field.key, null); onClose(); }}
          >
            Limpiar filtro
          </button>
        )}
      </div>
    </div>
  );
}

/** Chip de filtro activo */
function ActiveFilterChip({ label, value, onRemove }) {
  return (
    <div className={styles.activeChip} role="status" aria-label={`Filtro activo: ${label} ${value}`}>
      <span className={styles.activeChipText}>
        {label}: <strong>{value}</strong>
      </span>
      <button
        type="button"
        className={styles.activeChipClose}
        onClick={onRemove}
        aria-label={`Quitar filtro ${label}`}
      >
        <IconCloseCircle color="#5780AD" size={16} />
      </button>
    </div>
  );
}

/** Barra de filtros + botón notificaciones */
function FilterBar({ onEnviarNotificaciones, filterValues = {}, onFieldClick, onRemoveFilter, showMixedHelper = false, onCloseMixedHelper, selectionActive = false }) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterChips} role="group" aria-label="Filtros activos">
        <button type="button" className={styles.filterChip} aria-label="Ver columnas">
          <IconEye />
          <span>Ver columnas</span>
          <IconChevronDown />
        </button>
        <button type="button" className={styles.filterChip} aria-label="Segmento: Colaboradores">
          <span>Segmento:</span>
          <span className={styles.filterChipValue}>Colaboradores</span>
          <IconChevronDown />
        </button>
        <div className={styles.filtroAndActiveGroup}>
          <div className={styles.filtroWrapper}>
            <Filtro
              label="Filtros"
              fields={FILTRO_FIELDS_CONFIG.map((f) => ({
                ...f,
                value: filterValues[f.key] ?? null,
              }))}
              onFieldClick={onFieldClick}
            />
            {showMixedHelper && (
              <div className={styles.mixedHelperWrapper}>
                <Helper
                  title="Fases mezcladas"
                  supportingText={
                    <>Los colaboradores seleccionados están en fases distintas. <strong>Filtra por fase</strong> para habilitar las acciones masivas.</>
                  }
                  cta="Cerrar"
                  onCta={onCloseMixedHelper}
                  pointer="left"
                />
              </div>
            )}
          </div>

          {FILTRO_FIELDS_CONFIG.some((f) => filterValues[f.key]) && (
            <div className={styles.activeFiltersRow}>
              {FILTRO_FIELDS_CONFIG.filter((f) => filterValues[f.key]).map((f) => (
                <ActiveFilterChip
                  key={f.key}
                  label={f.label}
                  value={filterValues[f.key]}
                  onRemove={() => onRemoveFilter(f.key)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Button
        variant="primary"
        size="md"
        icon={<IconMail color={selectionActive ? '#999999' : '#B6CEE7'} />}
        iconPosition="left"
        onClick={onEnviarNotificaciones}
        disabled={selectionActive}
        aria-label="Enviar notificaciones masivas"
      >
        Enviar notificaciones
      </Button>
    </div>
  );
}

/** Barra de progreso de avance de formularios */
function ProgressBar({ percent }) {
  return (
    <div
      className={styles.progressTrack}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${percent}% completado`}
    >
      <div className={styles.progressFill} style={{ width: `${percent}%` }} />
    </div>
  );
}

/** Badge de estado de fase */
function FaseBadge({ status }) {
  if (!status) return null;
  return (
    <span className={styles.faseBadge} aria-label={`Estado: ${status}`}>
      {status}
    </span>
  );
}

const PHASE_CONFIG = {
  'Evaluación':        { next: 'Calibración',        prev: null                },
  'Calibración':       { next: 'Retroalimentación',  prev: 'Evaluación'        },
  'Retroalimentación': { next: null,                 prev: 'Calibración'       },
  'Finalizado':        { next: null,                 prev: 'Retroalimentación' },
};

/** Tabla de monitoreo de colaboradores */
function MonitoreoTabla({ rows, selectedIds, onSelectAll, onSelectRow }) {
  const allSelected = rows.length > 0 && rows.every((r) => selectedIds.has(r.id));
  const someSelected = rows.some((r) => selectedIds.has(r.id)) && !allSelected;

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const selectedRows = rows.filter((r) => selectedIds.has(r.id));
  const uniquePhases = [...new Set(selectedRows.map((r) => r.fase))];
  const displayPhase = uniquePhases.length === 1 ? uniquePhases[0] : uniquePhases.length > 1 ? 'Mezcladas' : '';

  const singlePhase = uniquePhases.length === 1 ? uniquePhases[0] : null;
  const phaseConfig = singlePhase ? PHASE_CONFIG[singlePhase] : null;
  const nextPhase = phaseConfig?.next ?? null;
  const prevPhase = phaseConfig?.prev ?? null;
  const forwardLabel = nextPhase ? `Mover a: ${nextPhase}` : 'Fase siguiente';
  const backwardLabel = prevPhase ? `Mover a: ${prevPhase}` : 'Fase anterior';

  const filteredRows = searchQuery
    ? rows.filter(
        (r) =>
          r.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cargo.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : rows;

  const PAGE_SIZE = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const rangeStart = filteredRows.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredRows.length);
  const rangeText = `${rangeStart} - ${rangeEnd} de ${String(filteredRows.length).padStart(2, '0')} Registros`;

  return (
    <div className={styles.tableCard}>
      {/* Header: checkbox + botones de acción (si hay selección) + buscador */}
      <div className={styles.tableHeader}>
        <div className={styles.tableHeaderLeft}>
          <Checkbox
            label=""
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onSelectAll}
            aria-label="Seleccionar todos los colaboradores"
          />
          {selectedIds.size > 0 && (
            <div className={styles.tableHeaderActions}>
              <Button
                variant="secondary"
                size="md"
                icon={<IconArrowRight color={nextPhase ? ICON_COLOR_ENABLED : ICON_COLOR_DISABLED} />}
                iconPosition="left"
                disabled={!nextPhase}
                aria-label={forwardLabel}
              >
                {forwardLabel}
              </Button>
              <Button
                variant="secondary"
                size="md"
                icon={<IconArrowLeft color={prevPhase ? ICON_COLOR_ENABLED : ICON_COLOR_DISABLED} />}
                iconPosition="left"
                disabled={!prevPhase}
                aria-label={backwardLabel}
              >
                {backwardLabel}
              </Button>
              <p className={styles.selectionCount}>
                <span className={styles.selectionCountNum}>({selectedIds.size})</span>
                {' '}colaborador{selectedIds.size !== 1 ? 'es' : ''} seleccionado{selectedIds.size !== 1 ? 's' : ''}
                {' '}- fase: <span className={styles.selectionCountPhase}>{displayPhase}</span>
              </p>
            </div>
          )}
        </div>
        {selectedIds.size === 0 && (
          <div className={styles.tableSearchWrapper} role="search">
            <input
              className={styles.tableSearchInput}
              type="search"
              placeholder="Buscar contenido"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar colaborador"
            />
            <span className={styles.tableSearchIcon}>
              <IconSearch />
            </span>
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className={styles.tableScroll}>
        <table className={styles.table} aria-label="Colaboradores en monitoreo">
          <thead>
            <tr>
              <th className={`${styles.th} ${styles.thCheckbox}`} scope="col" />
              <th className={styles.th} scope="col">
                <button type="button" className={styles.thBtn} aria-label="Ordenar por Colaborador">
                  <IconSortUp />
                  Colaborador
                </button>
              </th>
              <th className={styles.th} scope="col">
                <button type="button" className={styles.thBtn} aria-label="Ordenar por Avance de formularios">
                  <IconSortUp />
                  Avance de formularios
                </button>
              </th>
              <th className={styles.th} scope="col">
                <button type="button" className={styles.thBtn} aria-label="Ordenar por Fase actual">
                  <IconSortUp />
                  Fase actual
                </button>
              </th>
              <th className={styles.th} scope="col">
                <button type="button" className={styles.thBtn} aria-label="Ordenar por Días en fase">
                  <IconSortUp />
                  Días en fase
                </button>
              </th>
              <th className={`${styles.th} ${styles.thActions}`} scope="col" />
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                className={selectedIds.has(row.id) ? styles.trSelected : styles.tr}
              >
                {/* Checkbox */}
                <td className={`${styles.td} ${styles.tdCheckbox}`}>
                  <Checkbox
                    label=""
                    checked={selectedIds.has(row.id)}
                    onChange={(checked) => onSelectRow(row.id, checked)}
                    aria-label={`Seleccionar ${row.nombre}`}
                  />
                </td>

                {/* Colaborador */}
                <td className={`${styles.td} ${styles.tdColaborador}`}>
                  <div className={styles.cellAvatar}>
                    <span
                      className={styles.avatarCircle}
                      aria-hidden="true"
                    >
                      {row.nombre.charAt(0)}
                    </span>
                    <div>
                      <p className={styles.cellName}>{row.nombre}</p>
                      <p className={styles.cellRole}>{row.cargo}</p>
                    </div>
                  </div>
                </td>

                {/* Avance de formularios */}
                <td className={`${styles.td} ${styles.tdProgress}`}>
                  <ProgressBar percent={row.avance} />
                </td>

                {/* Fase actual */}
                <td className={`${styles.td} ${styles.tdFase}`}>
                  <div className={styles.faseCell}>
                    <span className={styles.faseName}>{row.fase}</span>
                    {row.id === 1 && (
                      <span className={styles.verMovimientosBadge}>Ver movimientos</span>
                    )}
                  </div>
                </td>

                {/* Días en fase */}
                <td className={`${styles.td} ${styles.tdDias}`}>
                  {row.diasAlerta ? (
                    <div className={styles.diasCell} aria-label={`${row.diasEnFase} días, requiere atención`}>
                      <IconAlertRow />
                      <span className={styles.diasAlertaNum}>{row.diasEnFase}</span>
                    </div>
                  ) : (
                    <span className={styles.diasNormal}>{row.diasEnFase}</span>
                  )}
                </td>

                {/* Acciones */}
                <td className={`${styles.td} ${styles.tdActions}`}>
                  <button
                    type="button"
                    className={styles.moreBtn}
                    aria-label={`Más acciones para ${row.nombre}`}
                  >
                    <IconMore />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginador */}
      <div className={styles.paginator}>
        <div className={styles.paginatorPages}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              className={`${styles.pageBtn}${p === currentPage ? ` ${styles.pageBtnActive}` : ''}`}
              onClick={() => setCurrentPage(p)}
              aria-label={`Página ${p}`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className={styles.paginatorNext}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            aria-label="Siguiente página"
          >
            <IconChevronRight />
          </button>
        </div>
        <p className={styles.paginatorInfo}>{rangeText}</p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

/**
 * Página: Monitoreo y reporte — Evaluación 01
 * Frame Figma: 1000 - AD Index (node 3356:34464)
 */
export default function MonitoreoEvaluacion() {
  const [activeTab, setActiveTab] = useState('monitoreo');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filterValues, setFilterValues] = useState({});
  const [openFilterField, setOpenFilterField] = useState(null);
  const [mixedHelperVisible, setMixedHelperVisible] = useState(false);

  function handleSelectAll(checked) {
    setSelectedIds(checked ? new Set(filteredColaboradores.map((r) => r.id)) : new Set());
  }

  function handleSelectRow(id, checked) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function handleFieldClick(_key, field, e) {
    const rect = e?.currentTarget?.getBoundingClientRect() ?? null;
    setOpenFilterField({ ...field, anchorRect: rect });
  }

  function handleFilterSelect(key, value) {
    setFilterValues((prev) => {
      const next = { ...prev };
      if (value === null) delete next[key];
      else next[key] = value;
      return next;
    });
    setOpenFilterField(null);
  }

  function handleRemoveFilter(key) {
    setFilterValues((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  const filteredColaboradores = COLABORADORES.filter((r) => {
    if (filterValues['fase-actual'] && r.fase !== filterValues['fase-actual']) return false;
    if (filterValues['avance']) {
      const pct = r.avance;
      const rango = filterValues['avance'];
      if (rango === 'Sin avance (0%)' && pct !== 0) return false;
      if (rango === 'Bajo (1% – 33%)' && (pct < 1 || pct > 33)) return false;
      if (rango === 'Medio (34% – 66%)' && (pct < 34 || pct > 66)) return false;
      if (rango === 'Alto (67% – 99%)' && (pct < 67 || pct > 99)) return false;
      if (rango === 'Completado (100%)' && pct !== 100) return false;
    }
    if (filterValues['dias']) {
      const rango = filterValues['dias'];
      if (rango === 'Más de 3 días' && r.diasEnFase <= 3) return false;
      if (rango === 'Más de 7 días' && r.diasEnFase <= 7) return false;
      if (rango === 'Más de 14 días' && r.diasEnFase <= 14) return false;
      if (rango === 'Con alerta (+7 días)' && !r.diasAlerta) return false;
    }
    return true;
  });

  const isMixedPhase = (() => {
    const sel = filteredColaboradores.filter((r) => selectedIds.has(r.id));
    return sel.length > 0 && new Set(sel.map((r) => r.fase)).size > 1;
  })();

  useEffect(() => {
    if (isMixedPhase) setMixedHelperVisible(true);
    else setMixedHelperVisible(false);
  }, [isMixedPhase]);

  return (
    <div className={styles.page}>

      {/* ── Megamenu ── */}
      <nav className={styles.megamenu} aria-label="Navegación principal">
        {/* Barra superior */}
        <div className={styles.megamenuTop}>
          <div className={styles.megamenuBrand}>
            <span className={styles.brandName}>Desempeño</span>
          </div>
          <div className={styles.megamenuSearch}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke={tokens.colors.auxiliar.$value} strokeWidth="1.2" />
              <path d="M11 11l3 3" stroke={tokens.colors.auxiliar.$value} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className={styles.searchPlaceholder}>Buscar</span>
          </div>
          <div className={styles.megamenuRight}>
            <div className={styles.notifBell} aria-label="Notificaciones (1)">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 14h12M7.5 14v1a4.5 4.5 0 009 0v-1M10 3a6 6 0 00-6 6v3H4a1 1 0 01-1-1v0h14a1 1 0 01-1 1v0H16V9a6 6 0 00-6-6z"
                  stroke={tokens.colors.blanco.$value}
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
              <span className={styles.notifCount} aria-label="1 notificación">1</span>
            </div>
            <div
              className={styles.userAvatar}
              role="button"
              tabIndex={0}
              aria-label="Perfil de usuario HH"
            >
              HH
            </div>
          </div>
        </div>

        {/* Sub-barra de categorías */}
        <div className={styles.megamenuSub}>
          <div className={styles.megamenuSubLinks} role="menubar">
            <button type="button" className={styles.navItem} role="menuitem">
              Estructura organizacional
            </button>
            <button type="button" className={styles.navItem} role="menuitem">
              Desempeño
            </button>
            <button type="button" className={styles.navItem} role="menuitem">
              Colaboradores
            </button>
          </div>
          <button type="button" className={styles.nuevoProcesoBtn} aria-label="Crear nuevo proceso">
            Nuevo proceso
            <IconPlus />
          </button>
        </div>
      </nav>

      {/* ── Contenido principal ── */}
      <div className={styles.contentWrapper}>

        {/* Breadcrumb */}
        <Breadcrumb
          breadcrumb="/ Evaluaciones / Monitoreo y reporte: Evaluación 01"
          title="Monitoreo y reporte: Evaluación 01"
          badge="Activa"
          subhead="04/01/2026 → 31/01/2026"
          onBack={() => history.back()}
          backLabel="Volver a evaluaciones"
        />

        {/* Tarjeta principal */}
        <div className={styles.mainCard}>

          {/* Tabs */}
          <div className={styles.tabsWrapper}>
            <Tabs
              tabs={TABS}
              activeKey={activeTab}
              onTabClick={setActiveTab}
            />
          </div>

          {/* Banner informativo */}
          <BannerInfo text="Modalidad: Avance Diferenciado. Los colaboradores avanzan de etapa automáticamente al completar el 100% de sus tareas. No es necesario esperar al resto de la organización." />

          {/* Indicadores */}
          <div className={styles.statsRow}>
            <AvanceGlobalCard />
            <TotalParticipantesCard />
            <AtencionRequeridaCard
              active={filterValues['dias'] === 'Más de 7 días'}
              onVerCasos={() => {
                if (filterValues['dias'] === 'Más de 7 días') {
                  setFilterValues((prev) => { const next = { ...prev }; delete next['dias']; return next; });
                } else {
                  setFilterValues((prev) => ({ ...prev, dias: 'Más de 7 días' }));
                }
              }}
            />
            <FasesInfoCard />
          </div>

          {/* Filtros y tabla */}
          <div className={styles.tableSection}>
            <FilterBar
              onEnviarNotificaciones={() => {}}
              filterValues={filterValues}
              onFieldClick={handleFieldClick}
              onRemoveFilter={handleRemoveFilter}
              showMixedHelper={mixedHelperVisible}
              onCloseMixedHelper={() => setMixedHelperVisible(false)}
              selectionActive={selectedIds.size > 0}
            />
            <MonitoreoTabla
              rows={filteredColaboradores}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
            />
          </div>

        </div>
      </div>

      {openFilterField && (
        <FilterModal
          field={openFilterField}
          selectedValue={filterValues[openFilterField.key] ?? null}
          onSelect={handleFilterSelect}
          onClose={() => setOpenFilterField(null)}
          anchorRect={openFilterField.anchorRect ?? null}
        />
      )}
    </div>
  );
}
