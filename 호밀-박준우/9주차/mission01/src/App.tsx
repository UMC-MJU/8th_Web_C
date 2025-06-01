import './App.css'
import  CartList  from '../src/components/CartList'
import  Navbar  from './components/Navbar'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import PriceBox from './components/PriceBox'
import ConfirmModal from './components/ConfirmModal'

function App() {

  return (
    <Provider store={store} >
      <Navbar />
      <CartList />
      <PriceBox />
      <ConfirmModal />
      </Provider>
  )
}

export default App
