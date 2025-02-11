import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
  }

  /* Custom Properties */
  :root {
    --font-primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-secondary: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Base Styles */
  body {
    background-color: #FFFFFF;
    background-image: 
      radial-gradient(circle at center, 
        rgba(0, 0, 0, 0.01) 0%,
        rgba(0, 0, 0, 0.03) 100%
      ),
      linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
    background-size: 100% 100%, 24px 24px, 24px 24px;
    background-position: center center;
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  .ant-layout {
    background: transparent;
  }

  .ant-layout-content {
    background: ${({ theme }) => theme.colors.background} !important;
  }

  .ant-card {
    background: ${({ theme }) => theme.colors.cardBg};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  .ant-typography {
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Typography */
  h1, .h1 {
    font-family: var(--font-primary);
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    line-height: ${({ theme }) => theme.typography.h1.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.h1.letterSpacing};
    margin-bottom: 0.5em;
  }

  h2, .h2 {
    font-family: var(--font-primary);
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    line-height: ${({ theme }) => theme.typography.h2.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.h2.letterSpacing};
    margin-bottom: 0.5em;
  }

  h3, .h3 {
    font-family: var(--font-primary);
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
    font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
    line-height: ${({ theme }) => theme.typography.h3.lineHeight};
    margin-bottom: 0.5em;
  }

  p, .body {
    font-family: var(--font-secondary);
    font-size: ${({ theme }) => theme.typography.body.fontSize};
    font-weight: ${({ theme }) => theme.typography.body.fontWeight};
    line-height: ${({ theme }) => theme.typography.body.lineHeight};
    margin-bottom: 1em;
  }

  /* Ant Design Overrides */
  .ant-layout {
    background: transparent !important;
  }

  .ant-layout-content {
    background: transparent !important;
  }

  .ant-card {
    background: ${({ theme }) => theme.colors.cardBg} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: ${({ theme }) => theme.shadows.card};
    }

    .ant-card-head {
      color: ${({ theme }) => theme.colors.text};
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      background: transparent;
    }

    .ant-card-body {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .ant-btn {
    font-family: var(--font-primary);
    font-weight: 500;
    height: 40px;
    padding: 0 24px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.gradients.hover};
      box-shadow: ${({ theme }) => theme.shadows.hover};
    }

    &:active {
      transform: translateY(0);
    }

    &.ant-btn-primary {
      background: ${({ theme }) => theme.gradients.primary};
      border: none;
      color: white;

      &:hover {
        opacity: 0.9;
        box-shadow: ${({ theme }) => theme.shadows.glow};
      }
    }
  }

  .ant-input,
  .ant-input-number,
  .ant-select-selector {
    height: 40px !important;
    background: ${({ theme }) => theme.colors.cardBg} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: 8px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: ${({ theme }) => theme.shadows.hover} !important;
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: ${({ theme }) => theme.shadows.glow} !important;
    }
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .slide-in {
    animation: slideIn 0.6s ease-out forwards;
  }

  .scale-in {
    animation: scaleIn 0.4s ease-out forwards;
  }

  /* Hover Transitions */
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ theme }) => theme.shadows.card};
    }
  }

  /* Theme Transition */
  body {
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Component Transitions */
  .ant-card,
  .ant-button,
  .ant-input,
  .ant-select-selector {
    transition: all 0.3s ease !important;
  }

  /* Loading Animation */
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid ${({ theme }) => theme.colors.background};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Chart Animation */
  .recharts-line-curve {
    animation: drawLine 1.5s ease-out forwards;
  }

  @keyframes drawLine {
    from {
      stroke-dashoffset: 1000;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  /* Interactive Elements */
  .ant-btn {
    font-family: var(--font-primary);
    font-weight: 500;
    height: 40px;
    padding: 0 24px;
    border-radius: 8px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.cardBg};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.gradients.hover};
      box-shadow: ${({ theme }) => theme.shadows.hover};
    }

    &:active {
      transform: translateY(0);
    }

    &.ant-btn-primary {
      background: ${({ theme }) => theme.gradients.primary};
      border: none;
      color: white;

      &:hover {
        opacity: 0.9;
        box-shadow: ${({ theme }) => theme.shadows.glow};
      }
    }
  }

  /* Form Elements */
  .ant-input,
  .ant-input-number,
  .ant-select-selector {
    height: 40px !important;
    background: ${({ theme }) => theme.colors.cardBg} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    border-radius: 8px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: ${({ theme }) => theme.shadows.hover} !important;
    }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      box-shadow: ${({ theme }) => theme.shadows.glow} !important;
    }
  }

  /* Cards */
  .ant-card {
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: ${({ theme }) => theme.gradients.card};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${({ theme }) => theme.shadows.hover};
      border-color: ${({ theme }) => theme.colors.primary};
    }

    .ant-card-head {
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
      padding: 16px 24px;
      
      .ant-card-head-title {
        font-family: var(--font-primary);
        font-weight: 500;
      }
    }

    .ant-card-body {
      padding: 24px;
    }
  }

  /* Loading States */
  .ant-spin-dot-item {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .ant-skeleton {
    .ant-skeleton-content {
      .ant-skeleton-title,
      .ant-skeleton-paragraph > li {
        background: ${({ theme }) => theme.gradients.hover};
        border-radius: 4px;
      }
    }
  }

  /* Tooltips */
  .ant-tooltip {
    .ant-tooltip-inner {
      background: ${({ theme }) => theme.colors.cardBg};
      border: 1px solid ${({ theme }) => theme.colors.border};
      border-radius: 8px;
      box-shadow: ${({ theme }) => theme.shadows.card};
      padding: 8px 12px;
      
      .ant-tooltip-arrow {
        border-color: ${({ theme }) => theme.colors.border};
      }
    }
  }
`; 