import { NoSsr } from '@material-ui/core';

import { AlphabetProvider } from '../../hooks/usePracticeContext'
import MainLayout from '../../layouts/MainLayout';
import RomajiPractice from './romaji';
import NavigationMenu from '../../components/NavigationMenu';

const IndexPage = () => (
  <NoSsr>
    <AlphabetProvider>
      <MainLayout menu={<NavigationMenu />}>
        <RomajiPractice />
      </MainLayout>
    </AlphabetProvider>
  </NoSsr>
);

export default IndexPage;