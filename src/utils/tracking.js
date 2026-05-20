export function trackWhatsAppClick() {
  try {
    if (window.fbq) fbq('track', 'Contact');
    if (window.snaptr) snaptr('track', 'START_CHECKOUT');
    if (window.gtag) gtag('event', 'whatsapp_click');
  } catch (_) {}
}

export function trackFormSubmit(service) {
  try {
    if (window.fbq) fbq('track', 'Lead');
    if (window.snaptr) snaptr('track', 'SIGN_UP');
    if (window.gtag) gtag('event', 'form_submit', { service });
    window.dataLayer?.push({ event: 'lead_submit', service });
  } catch (_) {}
}
