import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { GlobalStyle } from './styles/GlobalStyle';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './components/NavigationBar';

function App() {
  const state = useSelector((state) => state.themeSlice);
  const themeObject = state.theme === 'light' ? lightTheme : darkTheme;

  return (
    <BrowserRouter>
      <GlobalStyle theme={themeObject} />
      <Router />
    </BrowserRouter>
  );
}

export default App;
