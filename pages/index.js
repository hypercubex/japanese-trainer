import { NoSsr } from '@material-ui/core';

import { AlphabetProvider } from '../hooks/useAlphabetContext';
import MainLayout from '../layouts/MainLayout';
import Home from '../components/Home';

const IndexPage = () => (
  <NoSsr>
    <AlphabetProvider>
      <MainLayout>
        <Home />
      </MainLayout>
    </AlphabetProvider>
  </NoSsr>
);

export default IndexPage;