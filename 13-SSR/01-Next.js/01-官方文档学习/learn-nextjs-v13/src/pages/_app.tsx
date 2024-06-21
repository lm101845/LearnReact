/**
 * @Author liming
 * @Date 2023/10/24 15:39
 **/

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
