import './App.css';
import Navbar from './components/Navbar';
import Home from './Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
      <Navbar />
      <main className="flex-grow-1">
        <Home />
      </main>
      <Footer />
    </div>
  )
}

export default App
