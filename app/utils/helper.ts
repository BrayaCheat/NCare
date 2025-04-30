export const ERROR_TOAST = {
  style: {
    backgroundColor: "var(--destructive)",
    color: "white",
    border: "none",
  },
}

export const DEFAULT_CATEGORIES = [
  {
    id: 1,
    label: 'Lipstick',
    value: 'Lipstick'
  },
  {
    id: 2,
    label: 'Cream',
    value: 'Cream'
  },
  {
    id: 3,
    label: 'Powder',
    value: 'Powder'
  }
]

export const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || ''

export const DISPLAY_IMAGE = (url?: string | undefined) => BUCKET_URL + url;