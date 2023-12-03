import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer.jsx';

// * Unit test
test('should render the footer component', () => {
    render(<Footer/>);
    const footerElement = screen.getByTestId('footer-authors');
    expect(footerElement).toBeTruthy();
    expect(footerElement.textContent).toBe('Lisa Mari Myrene, Anosh Chaudhry & Alexandra Eloise Vanje');
})