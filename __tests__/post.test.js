import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import Post from '../components/post';

afterEach(cleanup);

describe('Post', () => {
  it('renders without crashing', () => {
    render(<Post />);
  });

  it('renders the default like button and the ❤️ is not visible', () => {
    render(<Post />);
    expect(screen.getByText('Like')).toBeInTheDocument();
    expect(screen.queryByText('❤️')).not.toBeInTheDocument();
  });
});