import { React, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  CircularProgress
} from '@material-ui/core';
import {
  createTheme,
  ThemeProvider
} from '@material-ui/core/styles';
import { downloadZip } from "client-zip";

import InputAccordian from "./InputAccordian";
import { buildVault } from "./process";

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
  const [religions, setReligions] = useState(null);
  const [burgs, setBurgs] = useState(null);
  const [rivers, setRivers] = useState(null);
  const [military, setMilitary] = useState(null);

  const [buildingVault, setBuildingVault] = useState(false);
  const [buildError, setBuildError] = useState(null);

  const [fileBlob, setFileBlob] = useState(null);

  async function makeObsidianVault() {
    setBuildingVault(true);
    try {
      const files = await buildVault(states, provinces, diplomacy, cultures, religions, burgs, rivers, military);
      setFileBlob(await downloadZip(files).blob())
    }
    // catch (error) {
    //   setBuildError(error.message);
    // }
    finally {
      setBuildingVault(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={2}
        style={{ padding: "16px" }}
      >
        <Grid item xs={9}>
          <InputAccordian title="States" changeCallback={setStates} />
          <InputAccordian title="Provinces" changeCallback={setProvinces} />
          <InputAccordian title="Diplomacy" changeCallback={setDiplomacy} />
          <InputAccordian title="Cultures" changeCallback={setCultures} />
          <InputAccordian title="Religions" changeCallback={setReligions} />
          <InputAccordian title="Burgs" changeCallback={setBurgs} />
          <InputAccordian title="Rivers" changeCallback={setRivers} />
          <InputAccordian title="Military" changeCallback={setMilitary} />
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              This is the explanation.
              If error on find one value in parsing file, remove trailing newline
              <br />
              {buildError}
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
              {fileBlob ?
                <Button
                  color="primary"
                  variant="contained"
                  href={URL.createObjectURL(fileBlob)}
                  download="vault.zip"
                >
                  Download Vault
                </Button>
                : null}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
