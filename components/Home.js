import React, { useState, useEffect } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    height: '38px', // Adjust the height as needed
  },
  submitButton: {
    marginLeft: theme.spacing(1), // Add a 5px margin to the left
  },
  randomContent: {
    fontSize: '48px',
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  hintButton: {
    marginLeft: theme.spacing(2), // Add some spacing between the buttons
  },
  hintLabel: {
    fontSize: '16px',
    marginTop: theme.spacing(1),
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
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    generateRandomAlphabet();
  }, [selectedAlphabetType]);

  const generateRandomAlphabet = () => {
    const randomIndex = Math.floor(Math.random() * alphabetData.length);
    const randomAlphabet = alphabetData[randomIndex];

    setRandomAlphabet(randomAlphabet);
    setShowHint(false);
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
    if (inputValue === randomAlphabet.romaji) {
      setIsCorrect(true);
      setInputValue('');
      generateRandomAlphabet();
    } else {
      setIsCorrect(false);
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <MainLayout>
        <div className={classes.inputContainer}>
          <TextField
            id="message-input"
            label="Message"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={classes.input}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitClick} className={classes.submitButton}>
            Submit
          </Button>
        </div>
        {randomAlphabet && (
          <>
            <RandomAlphabet content={randomAlphabet[selectedAlphabetType]} />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNextClick}
              >
                Next
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className={classes.hintButton}
                onClick={handleHintClick}
              >
                Hint
              </Button>
            </div>
            {showHint && (
              <Typography variant="body2" className={classes.hintLabel}>
                Hint: {randomAlphabet.romaji}
              </Typography>
            )}
          </>
        )}

        {isCorrect ? (
          <p>Congratulations!</p>
        ) : isCorrect === false ? (
          <p className={classes.warningLabel}>Wrong guess. Please enter again.</p>
        ) : null}
      </MainLayout>
    </ThemeProvider>
  );
};

export default Home;