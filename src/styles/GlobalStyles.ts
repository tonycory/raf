import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Custom Properties */
  :root {
    --color-background: #0B0B0F;
    --color-background-secondary: #1F1F2B;
    --color-primary: #00F2FE;
    --color-text: #FFFFFF;
    --color-text-secondary: rgba(255, 255, 255, 0.8);
    --font-primary: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-secondary: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* Base Styles */
  body, #root, .ant-layout {
    background: ${({ theme }) => `linear-gradient(180deg, ${theme.colors.background} 0%, ${theme.colors.backgroundSecondary} 100%)`};
    color: ${({ theme }) => theme.colors.text};
    font-family: var(--font-secondary);
    min-height: 100vh;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    transition: all 0.3s ease;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-primary);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text};
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
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);

    .ant-card-head {
      color: ${({ theme }) => theme.colors.text};
      border-bottom-color: ${({ theme }) => theme.colors.border};
      background: transparent;
    }

    .ant-card-body {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .ant-typography {
    color: ${({ theme }) => theme.colors.text} !important;
    transition: color 0.3s ease;

    &.ant-typography-secondary {
      color: ${({ theme }) => theme.colors.textSecondary} !important;
    }
  }

  .ant-input, 
  .ant-input-number,
  .ant-select-selector,
  .ant-btn {
    background: ${({ theme }) => theme.colors.cardBg} !important;
    border: 1px solid ${({ theme }) => theme.colors.border} !important;
    color: ${({ theme }) => theme.colors.text} !important;
    transition: all 0.3s ease;
    
    &:hover, &:focus {
      border-color: ${({ theme }) => theme.colors.primary} !important;
      background: ${({ theme }) => theme.colors.cardBgHover} !important;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .ant-input-number-handler-wrap {
    background: ${({ theme }) => theme.colors.cardBg};
    border-left: 1px solid ${({ theme }) => theme.colors.border};

    .ant-input-number-handler {
      border-color: ${({ theme }) => theme.colors.border};
      
      &:hover {
        .ant-input-number-handler-up-inner,
        .ant-input-number-handler-down-inner {
          color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  .ant-select-dropdown {
    background: ${({ theme }) => theme.colors.cardBg} !important;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.card};
    
    .ant-select-item {
      color: ${({ theme }) => theme.colors.text};
      transition: all 0.3s ease;
      
      &-option-selected,
      &-option-active {
        background: ${({ theme }) => theme.colors.cardBgHover};
        color: ${({ theme }) => theme.colors.primary};
      }
      
      &:hover {
        background: ${({ theme }) => theme.colors.cardBgHover};
      }
    }
  }

  .ant-btn-primary {
    background: ${({ theme }) => theme.colors.primary} !important;
    border-color: ${({ theme }) => theme.colors.primary} !important;
    color: #FFFFFF !important;

    &:hover {
      opacity: 0.9;
    }
  }

  /* Animations */
  @keyframes glow {
    0% {
      filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.primary});
    }
    50% {
      filter: drop-shadow(0 0 10px ${({ theme }) => theme.colors.primary});
    }
    100% {
      filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.primary});
    }
  }
`; 