import React, { useState, useEffect } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MainLayout from '../layouts/MainLayout';
import alphabetData from '../data/alphabets.json';

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

const RandomContent = ({ content }) => {
  const classes = useStyles();

  return <div className={classes.randomContent}>{content}</div>;
};

const Home = () => {
  const classes = useStyles();
  const [randomAlphabet, setRandomAlphabet] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    generateRandomAlphabet();
  }, []);

  const generateRandomAlphabet = () => {
    const randomIndex = Math.floor(Math.random() * alphabetData.length);
    const newRandomAlphabet = alphabetData[randomIndex];

    if (newRandomAlphabet === randomAlphabet) {
      generateRandomAlphabet();
    } else {
      setRandomAlphabet(newRandomAlphabet);
    }
  };

  const handleNextClick = () => {
    generateRandomAlphabet();
    setIsCorrect(null);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

    if (event.key === "Enter") {
      handleSubmitClick();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmitClick();
    }
  };

  const handleSubmitClick = () => {
    if (inputValue === randomAlphabet.pronunciation) {
      setIsCorrect(true);
      setInputValue(''); // Clear the input field
      generateRandomAlphabet();
    } else {
      setIsCorrect(false);
    }
  };

  const handleMenuChange = (value) => {
    setRandomAlphabet({}); // Reset randomAlphabet to avoid errors during transition

    setTimeout(() => {
      const filteredAlphabets = alphabetData.filter(
        (alphabet) => alphabet.type === value
      );

      if (filteredAlphabets.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredAlphabets.length);
        setRandomAlphabet(filteredAlphabets[randomIndex]);
      }
    }, 0);
  };

  return (
    <ThemeProvider theme={theme}>
      <MainLayout onMenuChange={handleMenuChange}>
        <div className={classes.inputContainer}>
          <TextField
            className={classes.input}
            id="message-input"
            label="Message"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitClick}>
            Submit
          </Button>
        </div>
        {randomAlphabet.hiragana && (
          <RandomContent content={randomAlphabet.hiragana} />
        )}
        {isCorrect === true && <p>Congratulations!</p>}
        {isCorrect === false && (
          <p className={classes.warningLabel}>Wrong guess. Please enter again.</p>
        )}
        <Button variant="contained" color="primary" onClick={handleNextClick}>
          Next
        </Button>
      </MainLayout>
    </ThemeProvider>
  );
};

export default Home;