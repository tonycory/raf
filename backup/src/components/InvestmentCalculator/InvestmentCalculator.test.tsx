import { render, screen, fireEvent } from '@testing-library/react';
import { InvestmentCalculator } from './index';

describe('InvestmentCalculator', () => {
  it('renders calculator form', () => {
    render(<InvestmentCalculator />);
    
    // Проверяем наличие основных элементов
    expect(screen.getByText('Investment Calculator')).toBeInTheDocument();
    expect(screen.getByText('Investment Amount ($)')).toBeInTheDocument();
    expect(screen.getByText('Investment Period (months)')).toBeInTheDocument();
    expect(screen.getByText('Risk Profile')).toBeInTheDocument();
    expect(screen.getByText('Market Condition')).toBeInTheDocument();
  });

  it('calculates returns correctly', () => {
    render(<InvestmentCalculator />);
    
    // Вводим тестовые данные
    const amountInput = screen.getByRole('spinbutton', { name: /investment amount/i });
    fireEvent.change(amountInput, { target: { value: '1000' } });

    const periodInput = screen.getByRole('spinbutton', { name: /investment period/i });
    fireEvent.change(periodInput, { target: { value: '12' } });

    // Нажимаем кнопку расчета
    const calculateButton = screen.getByRole('button', { name: /calculate returns/i });
    fireEvent.click(calculateButton);

    // Проверяем результаты
    expect(screen.getByText(/total return/i)).toBeInTheDocument();
    expect(screen.getByText(/monthly return/i)).toBeInTheDocument();
  });

  it('updates risk profile and market condition', () => {
    render(<InvestmentCalculator />);
    
    // Находим селекты
    const riskSelect = screen.getByRole('combobox', { name: /risk profile/i });
    const marketSelect = screen.getByRole('combobox', { name: /market condition/i });

    // Меняем значения
    fireEvent.mouseDown(riskSelect);
    fireEvent.click(screen.getByText('Aggressive'));

    fireEvent.mouseDown(marketSelect);
    fireEvent.click(screen.getByText('Bull Market'));

    // Проверяем, что значения изменились
    expect(riskSelect).toHaveValue('aggressive');
    expect(marketSelect).toHaveValue('bull');
  });
}); 