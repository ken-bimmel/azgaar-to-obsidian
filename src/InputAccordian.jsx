import { React, useState, useEffect } from 'react';
import {
    Accordion as MuiAccordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
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
        changeCallback(event.target.value);
        setValue(event.target.value);
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
                <TextField
                    label={`Paste the contents of the ${title} CSV here`}
                    variant="outlined"
                    multiline
                    maxRows="4"
                    fullWidth
                    onChange={handleChange}
                />
            </AccordionDetails>
        </Accordion>
    );
}

export default InputAccordian;
