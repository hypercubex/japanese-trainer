import { NoSsr } from '@material-ui/core';

import { AlphabetProvider } from '../hooks/useAlphabetContext';
import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home';
import Menu from '../components/Menu';

const IndexPage = () => (
  <NoSsr>
    <AlphabetProvider>
      <MainLayout menu={<Menu />}>
        <Home />
      </MainLayout>
    </AlphabetProvider>
  </NoSsr>
);

export default IndexPage;