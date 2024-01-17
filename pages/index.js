import { NoSsr } from '@material-ui/core';

import { AlphabetProvider } from '../hooks/usePracticeContext';
import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home';
import NavigationMenu from '../components/NavigationMenu';

const IndexPage = () => (
  <NoSsr>
    <AlphabetProvider>
      <MainLayout menu={<NavigationMenu />}>
        <Home />
      </MainLayout>
    </AlphabetProvider>
  </NoSsr>
);

export default IndexPage;