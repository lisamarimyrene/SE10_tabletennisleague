import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

// * Integration test
test('should navigate to "/newuser" when clicked', () => {
    const { getByText } = render(
        // A <Router> that keeps the history of your “URL” in memory
        <MemoryRouter> 
            <Link className="subtitle" to="/newuser">
                Not a user yet? Create account here
            </Link>
        </MemoryRouter>
    );

    const link = getByText('Not a user yet? Create account here');
    fireEvent.click(link);

    expect(link.getAttribute('href')).toBe('/newuser');
});