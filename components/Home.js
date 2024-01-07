import React, { useState, useEffect } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MainLayout from '../layouts/MainLayout';
import alphabetData from '../data/alphabets.json';
import { useAlphabetContext } from '../hooks/useAlphabetContext';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  input: {
    marginRight: theme.spacing(2),
  },
  randomContent: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  warningLabel: {
    color: 'red',
  },
}));

const RandomAlphabet = ({ content: alphabet }) => {
    const classes = useStyles();
    return <div className={classes.randomContent}>{alphabet}</div>;
  };

const Home = () => {
  const classes = useStyles();
  const { selectedAlphabetType } = useAlphabetContext();
  const [randomAlphabet, setRandomAlphabet] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    generateRandomAlphabet();
  }, [selectedAlphabetType]);

  const generateRandomAlphabet = () => {
    const randomIndex = Math.floor(Math.random() * alphabetData.length);
    const randomAlphabet = alphabetData[randomIndex];

    setRandomAlphabet(randomAlphabet);
  };

  const handleNextClick = () => {
    generateRandomAlphabet();
    setIsCorrect(null);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmitClick();
    }
  };

  const handleSubmitClick = () => {
    if (inputValue === randomAlphabet.pronunciation) {
      setIsCorrect(true);
      setInputValue('');
      generateRandomAlphabet();
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <div>
          <TextField
            id="message-input"
            label="Message"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitClick}>
            Submit
          </Button>
        </div>
        {randomAlphabet && (
          <RandomAlphabet content={randomAlphabet[selectedAlphabetType]} />
        )}

        {isCorrect ? (
          <p>Congratulations!</p>
        ) : isCorrect === false ? (
          <p className={classes.warningLabel}>Wrong guess. Please enter again.</p>
        ) : null}

        <Button variant="contained" color="primary" onClick={handleNextClick}>
          Next
        </Button>
      </MainLayout>
    </ThemeProvider>
  );
};

export default Home;