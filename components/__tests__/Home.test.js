import { render } from '@testing-library/react';
import Home from '../Home'

describe('Home', () => {
  it('should render Home correctly', () => {
    const result = render(<Home />)
    expect(result.err)
  })
})