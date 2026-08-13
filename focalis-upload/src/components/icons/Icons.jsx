/**
 * Set d'icônes ligne maison (style cohérent, sans emoji).
 * viewBox 24x24, trait currentColor — la couleur/taille se pilotent via className.
 */
function Icon({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

/* --- Types de photo --- */

export function IconPortrait(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M5 20c0-3.7 3.1-6.2 7-6.2s7 2.5 7 6.2" />
    </Icon>
  );
}

export function IconAnimal(props) {
  return (
    <Icon {...props}>
      <path d="M6.5 9L8 5l2 3M17.5 9L16 5l-2 3" />
      <circle cx="12" cy="13.5" r="5" />
      <circle cx="10" cy="12.8" r="0.4" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12.8" r="0.4" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconLandscape(props) {
  return (
    <Icon {...props}>
      <circle cx="17.5" cy="6.5" r="2" />
      <path d="M3 18.5l4.8-6.8 2.8 2.8L15 8l6 10.5z" />
    </Icon>
  );
}

export function IconMountain(props) {
  return (
    <Icon {...props}>
      <path d="M12 4.5l7.5 14H4.5z" />
      <path d="M9.3 13.8l1.1-1.4 1.1 1.1 1.1-1.7 1.1 2" />
    </Icon>
  );
}

export function IconCity(props) {
  return (
    <Icon {...props}>
      <rect x="4" y="10.5" width="4.2" height="9.5" />
      <rect x="9.9" y="6" width="4.2" height="14" />
      <rect x="15.8" y="12.5" width="4.2" height="7.5" />
    </Icon>
  );
}

export function IconArchitecture(props) {
  return (
    <Icon {...props}>
      <path d="M4 9.5l8-5.5 8 5.5" />
      <path d="M4 9.5h16M6.2 9.5v9.3M10.1 9.5v9.3M13.9 9.5v9.3M17.8 9.5v9.3M4 19.5h16" />
    </Icon>
  );
}

export function IconSport(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="13" r="7" />
      <path d="M12 13V9M9.5 3h5M12 3v2" />
    </Icon>
  );
}

export function IconCar(props) {
  return (
    <Icon {...props}>
      <path d="M4 16l1.4-4.8A2.2 2.2 0 0 1 7.5 9.6h9a2.2 2.2 0 0 1 2.1 1.6L20 16" />
      <path d="M3 16h18v1.8a1 1 0 0 1-1 1h-1.7a1 1 0 0 1-1-1v-.8H6.7v.8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <circle cx="7.5" cy="16.6" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16.6" r="1.1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconOther(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 4.3v4.4M12 15.3v4.4M5.2 8l3.8 2.2M15 13.8l3.8 2.2M5.2 16l3.8-2.2M15 10.2l3.8-2.2" />
    </Icon>
  );
}

/* --- Distance --- */

export function IconDistanceNear(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconDistanceMedium(props) {
  return (
    <Icon {...props}>
      <rect x="3.2" y="9.5" width="17.6" height="5.5" rx="1" />
      <path d="M7.2 9.5v2.6M11 9.5v2.6M14.8 9.5v2.6M18.6 9.5v2.6" />
    </Icon>
  );
}

export function IconDistanceFar(props) {
  return (
    <Icon {...props}>
      <path d="M5.3 20.5l1-8.2A2 2 0 0 1 8.3 10.5h1a2 2 0 0 1 2 1.8v.9h1.4v-.9a2 2 0 0 1 2-1.8h1a2 2 0 0 1 2 1.8l1 8.2" />
      <circle cx="7.8" cy="18.3" r="2" />
      <circle cx="16.2" cy="18.3" r="2" />
    </Icon>
  );
}

export function IconDistanceVeryFar(props) {
  return (
    <Icon {...props}>
      <path d="M3.3 17.5l8.4-8.4 8.4 4.6-12 6.4z" />
      <path d="M11.7 9.1l2.6-3.6" />
      <circle cx="14.9" cy="4.5" r="1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/* --- Mouvement --- */

export function IconMovementStatic(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="7.5" r="2.6" />
      <path d="M12 10.3v8M8 20h8" />
    </Icon>
  );
}

export function IconMovementSlow(props) {
  return (
    <Icon {...props}>
      <path d="M4 12h9M9.5 8l3.8 4-3.8 4" />
    </Icon>
  );
}

export function IconMovementFast(props) {
  return (
    <Icon {...props}>
      <path d="M2.5 12h6M7.5 8l3.6 4-3.6 4M12.7 8l3.6 4-3.6 4" />
    </Icon>
  );
}

export function IconMovementUnpredictable(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 17l4.3-4.3-3-3 5-4 3 4-4 3.2 5.2 4.1" />
    </Icon>
  );
}

/* --- Lumière --- */

export function IconSunny(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4.3" />
      <path d="M12 2.5v3M12 18.5v3M4.4 4.4l2.1 2.1M17.5 17.5l2.1 2.1M2 12h3M19 12h3M4.4 19.6l2.1-2.1M17.5 6.5l2.1-2.1" />
    </Icon>
  );
}

export function IconGoldenHour(props) {
  return (
    <Icon {...props}>
      <path d="M3 17h18" />
      <circle cx="12" cy="14" r="4" />
      <path d="M12 6.5v2.2M6.8 9.4l1.5 1.5M17.2 9.4l-1.5 1.5" />
    </Icon>
  );
}

export function IconCloudy(props) {
  return (
    <Icon {...props}>
      <path d="M7.2 17a4 4 0 0 1-.5-8 5 5 0 0 1 9.7-1.5A4.4 4.4 0 0 1 17 17z" />
    </Icon>
  );
}

export function IconIndoor(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="9.5" r="5" />
      <path d="M9.7 20h4.6M10.2 17h3.6M12 4.5v-2" />
    </Icon>
  );
}

export function IconLowLight(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2" />
    </Icon>
  );
}

export function IconNight(props) {
  return (
    <Icon {...props}>
      <path d="M15.5 3.3a7.2 7.2 0 1 0 0 14.4 7.2 7.2 0 0 1 0-14.4z" />
      <path d="M19.3 5.6l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3-1.3-.6 1.3-.6z" />
    </Icon>
  );
}

/* --- Contraintes --- */

export function IconGlassPane(props) {
  return (
    <Icon {...props}>
      <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="1.2" />
      <path d="M12 4.2v15.6M4.2 12h15.6" />
    </Icon>
  );
}

export function IconFence(props) {
  return (
    <Icon {...props}>
      <path d="M5.5 4v16M9.7 4v16M14.3 4v16M18.5 4v16M3 8.2h18M3 14.5h18" />
    </Icon>
  );
}

export function IconBacklight(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="9.5" r="3.4" />
      <path d="M4.2 20c1.5-4 4.2-5.2 7.8-5.2s6.3 1.2 7.8 5.2" />
      <path d="M2 9.5h2M20 9.5h2M12 2.8v2" />
    </Icon>
  );
}

export function IconSparkle(props) {
  return (
    <Icon {...props}>
      <path d="M12 3.2l1.9 5.4L19.2 10.5l-5.3 1.9L12 17.8l-1.9-5.4L4.8 10.5l5.3-1.9z" />
    </Icon>
  );
}

/* --- Trépied --- */

export function IconTripod(props) {
  return (
    <Icon {...props}>
      <rect x="9" y="2.2" width="6" height="4" rx="1" />
      <path d="M12 6.2v6M12 12.2l-5 9M12 12.2l5 9M7 21.2h10" />
    </Icon>
  );
}

export function IconHandheld(props) {
  return (
    <Icon {...props}>
      <path d="M6 13.5V7.3a1.9 1.9 0 1 1 3.8 0v5.4M9.8 12.7V5.3a1.9 1.9 0 1 1 3.8 0V12M13.6 12.4V6.6a1.9 1.9 0 1 1 3.8 0v8.6a5 5 0 0 1-5 5h-1.6a5 5 0 0 1-4.4-2.6L4 13.8" />
    </Icon>
  );
}

export function IconLeg3(props) {
  return (
    <Icon {...props}>
      <path d="M12 2.5v19" />
      <path d="M12 2.5h3M12 8.7h3M12 14.9h3" />
    </Icon>
  );
}

export function IconLeg4(props) {
  return (
    <Icon {...props}>
      <path d="M12 2v20" />
      <path d="M12 2h3M12 6.7h3M12 11.3h3M12 16h3" />
    </Icon>
  );
}

/* --- Navigation & UI --- */

export function IconBackpack(props) {
  return (
    <Icon {...props}>
      <path d="M8.2 8.2V6a3.8 3.8 0 1 1 7.6 0v2.2" />
      <rect x="5" y="8.2" width="14" height="12.6" rx="3" />
      <path d="M9 12h6M9 15.7h6" />
    </Icon>
  );
}

/* --- Rendu artistique --- */

export function IconBokeh(props) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="7.5" r="2.1" opacity="0.35" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="6.5" r="1.5" opacity="0.3" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="15" r="2.6" opacity="0.3" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12.5" r="3" />
    </Icon>
  );
}

export function IconDeepFocus(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="3.5" width="18" height="17" rx="1.6" />
      <path d="M4.5 15.5l4.3-4.3 3.4 3.4 4.3-5.2 3.5 3.5" />
    </Icon>
  );
}

export function IconMotionBlur(props) {
  return (
    <Icon {...props}>
      <path d="M3 8h10M3 12.5h14M3 17h8" />
    </Icon>
  );
}

export function IconFrozen(props) {
  return (
    <Icon {...props}>
      <path d="M12 3v18M5 6.5l14 11M19 6.5L5 17.5" />
    </Icon>
  );
}

export function IconContrast(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconAiry(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6.3 6.3l1.6 1.6M16.1 16.1l1.6 1.6M6.3 17.7l1.6-1.6M16.1 7.9l1.6-1.6" />
    </Icon>
  );
}

export function IconSpontaneous(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <path d="M13.2 2.2L4.6 13.4a.6.6 0 0 0 .5 1h5l-1 7.4a.5.5 0 0 0 .9.4l8.6-11.2a.6.6 0 0 0-.5-1h-5l1-7.3a.5.5 0 0 0-.9-.5z" />
    </svg>
  );
}

export function IconManualControl(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 12l3.6-3.6" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/* --- Fiche de recommandation --- */

export function IconLens(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </Icon>
  );
}

export function IconShutterSpeed(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12.5" r="8" />
      <path d="M12 12.5V7.5M12 12.5l4.5 2.2M9.5 2.5h5" />
    </Icon>
  );
}

export function IconIso(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.4" opacity="0" />
      <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {[6.5, 12, 17.5].flatMap((x) =>
        [6.5, 12, 17.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" />)
      )}
    </svg>
  );
}

export function IconWarning(props) {
  return (
    <Icon {...props}>
      <path d="M12 3.4l9 15.6H3z" />
      <path d="M12 9.8v4M12 16.8h.01" />
    </Icon>
  );
}

/* --- Presets --- */

export function IconBookmark(props) {
  return (
    <Icon {...props}>
      <path d="M6.5 4h11a1 1 0 0 1 1 1v15l-6.5-4.3L5.5 20V5a1 1 0 0 1 1-1z" />
    </Icon>
  );
}

export function IconThumbUp(props) {
  return (
    <Icon {...props}>
      <path d="M7 11v9H4.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />
      <path d="M7 11l3.6-6.8a1.8 1.8 0 0 1 1.8 1.8v3h5.4a1.6 1.6 0 0 1 1.55 1.98l-1.3 5.5A2 2 0 0 1 16.1 20H10a3 3 0 0 1-3-3" />
    </Icon>
  );
}

export function IconThumbDown(props) {
  return (
    <Icon {...props}>
      <path d="M7 13V4h2.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1z" />
      <path d="M7 13l3.6 6.8a1.8 1.8 0 0 0 1.8-1.8v-3h5.4a1.6 1.6 0 0 0 1.55-1.98l-1.3-5.5A2 2 0 0 0 16.1 6H10a3 3 0 0 0-3 3" />
    </Icon>
  );
}

export function IconTrash(props) {
  return (
    <Icon {...props}>
      <path d="M4.5 7h15" />
      <path d="M9 7V4.6A1.6 1.6 0 0 1 10.6 3h2.8A1.6 1.6 0 0 1 15 4.6V7" />
      <path d="M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12" />
      <path d="M10 11v6M14 11v6" />
    </Icon>
  );
}

export function IconCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}
