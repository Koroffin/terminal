import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Terminal } from './index';
import { TerminalService } from 'Services/terminal';

describe('Terminal', () => {
  it('should render correctly', () => {
    const { container } = render(<Terminal />);
    expect(container).toMatchSnapshot();
  });
  it('should call TerminalService.init()', () => {
    const spyOnInit = jest.spyOn(TerminalService, 'init');
    render(<Terminal />);
    expect(spyOnInit).toHaveBeenCalled();
  });
});
