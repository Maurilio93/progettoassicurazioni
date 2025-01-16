import './App.css'
import { LandingPage } from './landingPage'
import { Navbar } from './Navbar'
import { FileList } from './FileList'

function App() {

  return (
    <div>
      <Navbar></Navbar>
      <LandingPage>
      </LandingPage>
      <FileList></FileList>
    </div>
  )
}

export default App
