import { React, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  CircularProgress,
  CardHeader
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

  function clearError() {
    setBuildError(null);
  }

  async function makeObsidianVault() {
    setBuildingVault(true);
    try {
      clearError();
      const files = await buildVault(states, provinces, diplomacy, cultures, religions, burgs, rivers, military);
      setFileBlob(await downloadZip(files).blob())
    }
    catch (error) {
      setBuildError(error);
    }
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
          <Grid
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Card>
                <CardContent>
                  <p>
                    This tool provides a method for converting the exported CSVs from <a href="https://azgaar.github.io/Fantasy-Map-Generator/"> Azgaar's Fantasy Map Generator</a> into a linked <a href="https://obsidian.md/">Obsidian Vault</a> for whatever your purpose.
                  </p>
                  <p>
                    See each of the accordians for details on where to find the file you need to upload to that section.
                  </p>
                  <p>
                    Once you have loaded the files you want, click "Make Obsidian Vault". It may take some time to process depending on the size of your uploads. Once the files are generated, a new "Download Vault" button will appear. Click it to download the vault. Unzip the file in your Vault folder, or use the unzipped folder as the root of a new vault.
                  </p>
                  <p>
                    This tool makes no claim of licesnse or ownership of anything passed through it. The tool does and cannot store any information you pass through it.
                  </p>
                  <p>
                    If you would like to contribute to this tool, see the <a href="https://github.com/ken-bimmel/azgaar-to-obsidian"> repository</a>  for details.
                  </p>
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
            <Grid item>
              {buildError ?
                <Card style={{ "background": "#840e0e" }}>
                  <CardHeader title={buildError.name} />
                  <CardContent>
                    {buildError.message}
                  </CardContent>
                  <CardActions>
                    <Button onClick={clearError}>Clear Error</Button>
                  </CardActions>
                </Card>
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
