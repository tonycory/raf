import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Market from './components/Market';
import Profile from './components/Profile';
import Instruments from './pages/Instruments';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalStyles />
        <Layout className="layout">
          <Header style={{ padding: 0, background: 'transparent' }}>
            <Navigation />
          </Header>
          <Content style={{ minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/market-ai" element={<Market />} />
              <Route path="/instruments" element={<Instruments />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
