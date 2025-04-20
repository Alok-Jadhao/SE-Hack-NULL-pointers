import "./style.css"

export const metadata = {
  title: "Online Learning Platform",
  description: "A platform for online courses and learning",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
