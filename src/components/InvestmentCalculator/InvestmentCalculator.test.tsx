import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { InvestmentCalculator } from './index';
import userEvent from '@testing-library/user-event';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('InvestmentCalculator', () => {
  beforeEach(() => {
    renderWithTheme(<InvestmentCalculator />);
  });

  it('renders calculator form with all inputs', () => {
    expect(screen.getByText(/Investment Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Investment Period/i)).toBeInTheDocument();
    expect(screen.getByText(/Risk Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Condition/i)).toBeInTheDocument();
  });

  it('updates amount when slider is moved', async () => {
    const amountSlider = screen.getByRole('slider', { name: /investment amount/i });
    fireEvent.change(amountSlider, { target: { value: '20000' } });
    
    await waitFor(() => {
      expect(amountSlider).toHaveValue('20000');
    });
  });

  it('updates period when slider is moved', async () => {
    const periodSlider = screen.getByRole('slider', { name: /investment period/i });
    fireEvent.change(periodSlider, { target: { value: '24' } });
    
    await waitFor(() => {
      expect(periodSlider).toHaveValue('24');
    });
  });

  it('changes risk profile when selected', async () => {
    const riskSelect = screen.getByRole('combobox', { name: /risk profile/i });
    userEvent.click(riskSelect);
    const aggressiveOption = screen.getByText(/aggressive/i);
    userEvent.click(aggressiveOption);
    
    expect(riskSelect).toHaveValue('aggressive');
  });

  it('changes market condition when selected', async () => {
    const marketSelect = screen.getByRole('combobox', { name: /market condition/i });
    userEvent.click(marketSelect);
    const bullOption = screen.getByText(/bull market/i);
    userEvent.click(bullOption);
    
    expect(marketSelect).toHaveValue('bull');
  });

  it('calculates returns when form is submitted', async () => {
    // Set values
    const amountSlider = screen.getByRole('slider', { name: /investment amount/i });
    const periodSlider = screen.getByRole('slider', { name: /investment period/i });
    
    fireEvent.change(amountSlider, { target: { value: '10000' } });
    fireEvent.change(periodSlider, { target: { value: '12' } });
    
    // Submit form
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    userEvent.click(calculateButton);
    
    // Check results
    await waitFor(() => {
      expect(screen.getByText(/total return/i)).toBeInTheDocument();
      expect(screen.getByText(/monthly return/i)).toBeInTheDocument();
    });
  });

  it('shows error message for invalid inputs', async () => {
    const amountSlider = screen.getByRole('slider', { name: /investment amount/i });
    fireEvent.change(amountSlider, { target: { value: '-1000' } });
    
    const calculateButton = screen.getByRole('button', { name: /calculate/i });
    userEvent.click(calculateButton);
    
    await waitFor(() => {
      expect(screen.getByText(/invalid amount/i)).toBeInTheDocument();
    });
  });

  it('updates chart when inputs change', async () => {
    const amountSlider = screen.getByRole('slider', { name: /investment amount/i });
    fireEvent.change(amountSlider, { target: { value: '20000' } });
    
    await waitFor(() => {
      const chart = screen.getByRole('img', { name: /investment chart/i });
      expect(chart).toBeInTheDocument();
    });
  });

  it('maintains state between re-renders', () => {
    const amountSlider = screen.getByRole('slider', { name: /investment amount/i });
    fireEvent.change(amountSlider, { target: { value: '20000' } });
    
    // Re-render component
    renderWithTheme(<InvestmentCalculator />);
    
    expect(amountSlider).toHaveValue('20000');
  });
}); 