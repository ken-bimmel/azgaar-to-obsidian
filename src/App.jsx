import { React, useState } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Switch,
  Snackbar,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  createTheme,
  ThemeProvider
} from '@material-ui/core/styles';

function App() {
  const theme = createTheme(
    {
      palette: {
        type: 'dark'
      }
    }
  )

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing="2"
        style={{ padding: "16px" }}
      >
        <Grid item xs="9">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs="3">
          <Card>
            <CardContent>
              This is the explanation
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
