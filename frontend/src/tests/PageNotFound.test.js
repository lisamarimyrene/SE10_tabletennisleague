import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

// All existing paths
const paths = [
    "/",
    "/players/",
    "/players/leaderboard",
    "/players/favorites",
    "/players/editPlayer/:id",
    "/matches",
    "/matches/:id",
    "/profile/",
    "/profile/ProfileInfo",
    "/profile/ProfileOldMatches",
    "/login",
    "/newuser"
]

//* Unit test that checks the routing behavior in a React application.
test('renders "404 page not found" for undefined path', () => {
    const nonExistentPath = '/nonexistent-path';

    const { container } = render(
        <MemoryRouter initialEntries={[nonExistentPath]}>
            <Routes>
                {paths.map(path => (
                    <Route key={path} path={path}>
                        <Route data-testid={path} />
                    </Route>
                ))}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </MemoryRouter>
    );

    const pathExists = container.querySelector(`[data-testid="${nonExistentPath}"]`);
    const notFoundText = screen.getByTestId('notfound-text');

    expect(pathExists).toBeNull(); // Confirm the non-existent path does not exist
    expect(notFoundText.textContent).toBe('404 Page Not found!'); // Confirm the PageNotFound component is rendered
});
