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
  Grid,
  CardActionArea,
  CircularProgress
} from '@material-ui/core';
import {
  createTheme,
  ThemeProvider
} from '@material-ui/core/styles';

import InputAccordian from "./InputAccordian";

function App() {
  const theme = createTheme(
    {
      palette: {
        type: 'dark'
      }
    }
  )

  const [states, setStates] = useState(null);
  const [provinces, setProvinces] = useState(null);
  const [diplomacy, setDiplomacy] = useState(null);
  const [cultures, setCultures] = useState(null);
  const [zones, setZones] = useState(null);
  const [religions, setReligions] = useState(null);
  const [burgs, setBurgs] = useState(null);
  const [rivers, setRivers] = useState(null);
  const [military, setMilitary] = useState(null);

  const [buildingVault, setBuildingVault] = useState(false);

  function makeObsidianVault() {
    setBuildingVault(true);

  }

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
          <InputAccordian title="States" changeCallback={setStates} />
          <InputAccordian title="Provinces" changeCallback={setProvinces} />
          <InputAccordian title="Diplomacy" changeCallback={setDiplomacy} />
          <InputAccordian title="Cultures" changeCallback={setCultures} />
          <InputAccordian title="Zones" changeCallback={setZones} />
          <InputAccordian title="Religions" changeCallback={setReligions} />
          <InputAccordian title="Burgs" changeCallback={setBurgs} />
          <InputAccordian title="Rivers" changeCallback={setRivers} />
          <InputAccordian title="Military" changeCallback={setMilitary} />
        </Grid>
        <Grid item xs="3">
          <Card>
            <CardContent>
              This is the explanation
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={makeObsidianVault}
              >
                Make Obsidian Vault
              </Button>
              {buildingVault ? <CircularProgress /> : null}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
