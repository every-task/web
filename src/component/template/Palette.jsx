import { alpha, createTheme, getContrastRatio } from '@mui/material/styles';
import { grey, indigo } from '@mui/material/colors';


const blueBase = indigo.A700;
const blueMain = alpha(blueBase, 0.9);

const whiteBase = '#ffffff';
const blackBase = grey[900]
const blackMain = alpha(blackBase, 0.9);

const redBase = '#777777';

export const MyCustomTheme = createTheme({
  palette: {
    mode: 'light',


    common: {
      white: whiteBase,
      black: blackBase
    },
    primary: {
      main: blueMain,
      light: alpha(blueBase, 0.9),
      dark: alpha(blueBase, 0.9),
      contrastText: getContrastRatio(blueMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
    secondary: {
      main: redBase,
      light: alpha(redBase, 0.5),
      dark: alpha(redBase, 0.9),
    },
    info: {
      main: whiteBase
    },
    text: {
      main: blackMain,
      light: alpha(blackMain, 0.9),
      dark: alpha(blackMain, 0.9),
      contrastText: getContrastRatio(blackMain, '#fff') > 4.5 ? '#fff' : '#111',

    }
  },
  typography: {
    poster: {
      fontFamily: 'Nanum Gothic',
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: '5rem'
    },
    content: {
      fontFamily: 'Nanum Gothic',
      fontSize: '1.5rem',
      lineHeight: '2.5rem'
    },
    category: {
      fontFamily: 'Nanum Gothic',
      fontSize: '1.5rem',
      lineHeight: '2.5rem',
      fontWeight: 500
    }
  },
  card: {
    noOutline: {
      bold: 'none'
    }
  }
});