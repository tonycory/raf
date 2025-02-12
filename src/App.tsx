import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Market from './components/Market';
import Profile from './components/Profile';
import Instruments from './pages/Instruments';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from './contexts/ThemeContext';
import styled from 'styled-components';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: transparent !important;
`;

const StyledContent = styled(Content)`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  padding: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <GlobalStyles />
        <StyledLayout>
          <Navigation />
          <StyledContent>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/market-ai" element={<Market />} />
              <Route path="/instruments" element={<Instruments />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </StyledContent>
        </StyledLayout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;
