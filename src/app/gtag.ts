export const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Google Analytics ID'nizi buraya ekleyin

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const config: Record<string, string | number | boolean> = {
      event_category: category,
      event_label: label,
    }
    if (value !== undefined) {
      config.value = value
    }
    window.gtag('event', action, config)
  }
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, string | number | boolean>
    ) => void
  }
} 