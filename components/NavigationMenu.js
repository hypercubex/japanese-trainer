import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useAlphabetContext} from '../hooks/useAlphabetContext';
import { AlphabetType } from '../constants/AlphabetType';

const NavigationMenu = () => {
  const { selectedAlphabetType, updateSelectedAlphabetType } = useAlphabetContext();

  const handleMenuChange = (value) => {
    updateSelectedAlphabetType(value);
  };

  const alphabetTypes = [
    { type: AlphabetType.HIRAGANA, label: 'Hiragana' },
    { type: AlphabetType.KATAKANA, label: 'Katakana' },
  ];

  const listItems = alphabetTypes.map((item) => (
    <ListItem
      button
      key={item.type}
      onClick={() => handleMenuChange(item.type)}
      selected={selectedAlphabetType === item.type}
    >
      <ListItemText primary={item.label} />
    </ListItem>
  ));

  return <List>{listItems}</List>;
};

export default NavigationMenu;