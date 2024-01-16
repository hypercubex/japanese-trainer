import React, { useState, useEffect } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MainLayout from '../layouts/MainLayout';
import alphabetData from '../data/alphabets.json';
import { useAlphabetContext} from '../hooks/useAlphabetContext';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  input: {
    height: '38px',
  },
  randomContent: {
    fontSize: '48px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
  },
  hintLabel: {
    fontSize: '16px',
    marginTop: theme.spacing(1),
  },
  warningLabel: {
    color: 'red',
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0),
    },
  },
  button: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: theme.spacing(1, 0),
    },
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="message-input"
            label="Message"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={classes.input}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
            className={classes.button}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            className={classes.button}
          >
            Next
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleHintClick}
            className={classes.button}
          >
            Hint
          </Button>
        </Grid>
        {randomAlphabet && (
          <Grid item xs={12}>
            <RandomAlphabet content={randomAlphabet[selectedAlphabetType]} />
            {showHint && (
              <Typography variant="body2" className={classes.hintLabel}>
                Hint: {randomAlphabet.romaji}
              </Typography>
            )}
          </Grid>
        )}
        {isCorrect && (
          <Grid item xs={12}>
            <Typography variant="body2">
              Congratulations!
            </Typography>
          </Grid>
        )}
        {isCorrect === false && (
          <Grid item xs={12}>
            <Typography variant="body2" className={classes.warningLabel}>
              Wrong guess. Please try again.
            </Typography>
          </Grid>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Home;