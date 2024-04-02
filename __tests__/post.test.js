import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
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

  it('renders the unlike button and ❤️ after the like button is clicked', () => {
    render(<Post />);
  
    const button = screen.getByText('Like');
    fireEvent.click(button);
  
    expect(screen.getByText('Unlike')).toBeInTheDocument();
    expect(screen.getByText('❤️')).toBeInTheDocument();
  });

  it('renders the like button after the unlike button is clicked', () => {
    render(<Post />);
  
    const button = screen.getByText('Like');
    fireEvent.click(button);
  
    expect(screen.getByText('Unlike')).toBeInTheDocument();
    fireEvent.click(button);

    expect(screen.getByText('Like')).toBeInTheDocument();
  });

  it('only renders the image when the media type is image', () => {
    render(<Post url='/images/scheduler-resized-compressed.jpg' title='alt' media='image'/>);
  
    expect(screen.getByTestId('image')).toBeTruthy();
    expect(screen.queryByTestId('video')).toBeNull();
  });
  
  it('only renders the video when the media type is video', () => {
    render(<Post media='video'/>);
  
    expect(screen.getByTestId('video')).toBeTruthy();
    expect(screen.queryByTestId('image')).toBeNull();
  });
});