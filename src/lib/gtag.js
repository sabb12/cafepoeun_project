export const GA_TRACKING_ID = "G-3X3RVRKVGQ";
// process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window === "undefined") return;
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window === "undefined") return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
