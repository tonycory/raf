import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Markets from './pages/Markets';
import Profile from './components/Profile';
import { InvestmentCalculator } from './components/InvestmentCalculator';
import Strategies from './pages/Strategies';
import Instruments from './pages/Instruments';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header style={{ padding: 0, background: '#fff' }}>
          <Navigation />
        </Header>
        <Content style={{ padding: '24px 50px', minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calculator" element={<InvestmentCalculator />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/instruments" element={<Instruments />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
