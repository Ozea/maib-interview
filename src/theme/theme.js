import { createMuiTheme } from '@material-ui/core';
import { typography } from './typography';
import { palette } from './palette';

const theme = createMuiTheme({
  palette,
  typography
});

export default theme;