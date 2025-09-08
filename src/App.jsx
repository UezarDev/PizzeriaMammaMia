import './App.css';
import Navbar from './components/Navbar';
import Home from './Home';
// import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
      <Navbar />
      <main className="flex-grow-1">
  <Home />
  {/* <Register /> */}
  {/* <Login /> */}
      </main>
      <Footer />
    </div>
  )
}

export default App
