import { lightTheme } from '@storyblok/mui'
import _FieldPlugin from './components/FieldPlugin'
import CourseSelectorPlugin from './components/CourseSelector'
import { FunctionComponent } from 'react'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { useFieldPlugin } from '@storyblok/field-plugin/react'

const App: FunctionComponent = () => {
  const { type, error } = useFieldPlugin()

  if (type === 'loading') {
    return <Loading />
  } else if (type === 'error') {
    return <Error error={error} />
  } else {
    return (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: { backgroundColor: 'transparent' },
          }}
        />
        <CourseSelectorPlugin />
      </ThemeProvider>
    )
  }
}

const Loading: FunctionComponent = () => <p>Loading...</p>
const Error: FunctionComponent<{ error: Error }> = (props) => {
  console.error(props.error)
  return <p>An error occured, please see the console for more details.</p>
}

export default App
