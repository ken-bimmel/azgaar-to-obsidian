import { React, useState } from 'react';
import {
    Accordion as MuiAccordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Input,
    TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Accordion = withStyles({
    root: {
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

function InputAccordian(props) {
    const { title, changeCallback } = props;
    const [value, setValue] = useState(null);

    function handleChange(event) {
        const files = event.target.files;
        if (files.length === 0) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function (event) {
            const text = event.target.result;
            changeCallback(text);
            setValue(text);
        }
        reader.readAsText(files[0]);

    }

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        {value ? "☑️ " : null}{title}
                    </Grid>
                    <Grid item>
                        {value ? "☑️ Complete" : ""}
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                <Input
                    label={`Paste the contents of the ${title} CSV here`}
                    // variant="outlined"
                    // multiline
                    // maxRows="4"
                    // fullWidth
                    onChange={handleChange}
                    type="file"
                    inputProps={{ accept: ".csv" }}
                />
            </AccordionDetails>
        </Accordion>
    );
}

export default InputAccordian;
