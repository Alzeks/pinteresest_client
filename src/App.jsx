import './app.css'
import Galery from './components/galery/galery'
import LeftBar from './components/leftBar/leftBar'
import TopBar from './components/topBar/topBar'

const App = () => {
  return (
    <div  className='app'>
      <LeftBar />
      <div className="content">
        <TopBar />
        <Galery />
      </div>
    </div>
  )
}

export default App