import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Actions } from "./Actions/userActions"
import { Provider } from "./Context"

const App = () => {
  const routing = useRoutes(routes);
  const data = Actions();

  return (
    <Provider value={data}>
    <ThemeProvider theme={theme} value={data}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </Provider>
  );
};

export default App;
