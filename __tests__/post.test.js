import { render, cleanup } from '@testing-library/react';
import Post from '../components/post';

afterEach(cleanup);

describe('Post', () => {
  it('renders without crashing', () => {
    render(<Post />);
  });
});