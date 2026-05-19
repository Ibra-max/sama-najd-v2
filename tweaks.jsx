/* global React, ReactDOM */
const { useEffect } = React;

function SamaTweaks() {
  const defaults = window.__TWEAKS__ || {
    accent: 'burgundy',
    divider: 'diagonal',
    lang: 'ar',
    heroStyle: 'dark-photo'
  };
  const [t, setTweak] = window.useTweaks(defaults);

  // Apply changes live
  useEffect(() => {
    window.applyTweaks && window.applyTweaks(t);
  }, [t.accent, t.divider, t.heroStyle]);

  return (
    <window.TweaksPanel title="Tweaks">
      <window.TweakSection title="Accent">
        <window.TweakColor
          label="CTA Color"
          value={accentToHex(t.accent)}
          options={['#8B2635', '#0099CC', '#1B2D5C']}
          onChange={(hex) => setTweak('accent', hexToAccent(hex))}
        />
      </window.TweakSection>

      <window.TweakSection title="Hero Style">
        <window.TweakRadio
          label="Treatment"
          value={t.heroStyle}
          options={[
            { label: 'Dark photo', value: 'dark-photo' },
            { label: 'Light', value: 'light' }
          ]}
          onChange={(v) => setTweak('heroStyle', v)}
        />
      </window.TweakSection>

      <window.TweakSection title="Section Dividers">
        <window.TweakRadio
          label="Style"
          value={t.divider}
          options={[
            { label: 'Diagonal', value: 'diagonal' },
            { label: 'Flat', value: 'flat' }
          ]}
          onChange={(v) => setTweak('divider', v)}
        />
      </window.TweakSection>
    </window.TweaksPanel>
  );
}

function accentToHex(name) {
  return { burgundy: '#8B2635', brand: '#0099CC', navy: '#1B2D5C' }[name] || '#8B2635';
}
function hexToAccent(hex) {
  return { '#8B2635': 'burgundy', '#0099CC': 'brand', '#1B2D5C': 'navy' }[hex] || 'burgundy';
}

(function mount() {
  const root = document.getElementById('tweaks-root');
  if (!root || !window.TweaksPanel) {
    // wait for tweaks-panel.jsx to define globals
    return setTimeout(mount, 50);
  }
  ReactDOM.createRoot(root).render(<SamaTweaks />);
})();
