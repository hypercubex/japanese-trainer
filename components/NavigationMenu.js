import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { usePracticeContext } from '../hooks/usePracticeContext';
import { AlphabetType } from '../constants/AlphabetType';
import { PracticeType } from '../constants/PracticeType';

const NavigationMenu = () => {
  const { selectedAlphabetType, selectedPracticeType, updateSelectedAlphabetType } = usePracticeContext();

  const handleMenuChange = (value) => {
    updateSelectedAlphabetType(value);
  };

  const alphabetTypes = [
    { type: AlphabetType.HIRAGANA, label: 'Hiragana' },
    { type: AlphabetType.KATAKANA, label: 'Katakana' },
  ];

  const practiceTypes = [
    { type: PracticeType.ROMAJI, label: 'Romaji' },
    { type: PracticeType.KANA, label: 'Kana' },
  ];

  const listItems = practiceTypes.map((practiceType) => [
    <ListItem key={practiceType.label}>
      <ListItemText
        primary={practiceType.label}
        primaryTypographyProps={{
          style: {
            fontWeight: 'bold',
            fontSize: 'larger',
          },
        }}
      />
    </ListItem>,
    alphabetTypes.map((item) => (
      <ListItem
        button
        key={`${practiceType}-${item.type}`}
        onClick={() => handleMenuChange({ practiceType, alphabetType: item.type })}
        data-practicetype={practiceType}
        data-alphabettype={item.type}
      >
        <ListItemText primary={item.label} />
      </ListItem>
    )),
  ]);

  return <List>{listItems}</List>;
};

export default NavigationMenu;