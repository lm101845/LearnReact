/**
 * @Author liming
 * @Date 2023/10/24 15:32
 **/
export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    )
}
