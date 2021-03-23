import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import '../css/style.css'
import '../css/form.css'
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
