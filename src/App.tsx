import { Suspense } from 'react'
import Routes from './routes'
import { LoadingOverlay } from './components/ui'
import LoadingProvider from './providers/LoadingProvider'

function App() {
  return (
    <>
      <LoadingProvider>
        <Suspense fallback={<LoadingOverlay open />}>
          <Routes />
        </Suspense>
      </LoadingProvider>
    </>
  )
}

export default App
