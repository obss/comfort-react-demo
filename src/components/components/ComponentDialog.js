import { useState } from 'react';
import { Button, Checkbox, useSnackbar, Dialog } from 'comfort-react';
import { Grid, Typography } from '@mui/material';
import jsxToString from 'jsx-to-string';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import CurrentRulesInfo from '../CurrentRulesInfo';
import FormGroup from '@mui/material/FormGroup';

const ComponentDialog = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [secondaryDialogOpen, setSecondartDialogOpen] = useState(false);
    const [selectedDraggable, setSelectedDraggable] = useState(false);
    const [selectedFullScreen, setSelectedFullScreen] = useState(false);
    const [selectedHideCloseButton, setSelectedHideCloseButton] = useState(false);

    const onClose = () => {
        enqueueSnackbar('Dialog Closed');
        setOpen(false);
    };

    const onCloseSecondary = () => {
        enqueueSnackbar('Secondary Dialog Closed');
        setSecondartDialogOpen(false);
    };

    const openSecondaryDialog = () => {
        setSecondartDialogOpen(true);
    };

    const draggableDialogElementJsx = (
        <Dialog
            fullScreen={selectedFullScreen}
            open={open}
            draggable={selectedDraggable}
            onClose={onClose}
            title={<Typography> Dialog Title </Typography>}
            hideCloseButton={selectedHideCloseButton}
            actions={<Button onClick={onClose}>Close Dialog</Button>}
        >
            <Typography>Dialog Content</Typography>
            <Button variant={'contained'} onClick={openSecondaryDialog}>
                Open Another Dialog
            </Button>
        </Dialog>
    );

    const draggableSecondaryDialogElementJsx = (
        <Dialog
            fullScreen={selectedFullScreen}
            open={secondaryDialogOpen}
            draggable={selectedDraggable}
            onClose={onCloseSecondary}
            title={<Typography> Dialog Title </Typography>}
            hideCloseButton={selectedHideCloseButton}
            actions={<Button onClick={onCloseSecondary}>Close Dialog</Button>}
        >
            <Typography>Dialog Another Content</Typography>
        </Dialog>
    );

    let currentJsx = jsxToString(draggableDialogElementJsx, {
        displayName: 'Draggable Dialog',
        useFunctionCode: true,
    });

    currentJsx = "import { DraggableDialog } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper>
            {draggableDialogElementJsx}
            {draggableSecondaryDialogElementJsx}
            <Button variant={'contained'} onClick={() => setOpen(true)}>
                Open Dialog
            </Button>
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'draggable'}
                            value={selectedDraggable}
                            onChange={(newValue) => {
                                setSelectedDraggable(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'fullScreen'}
                            value={selectedFullScreen}
                            onChange={(newValue) => {
                                setSelectedFullScreen(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'hide close button'}
                            value={selectedHideCloseButton}
                            onChange={(newValue) => {
                                setSelectedHideCloseButton(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
        </ExampleUsageWrapper>
    );
};

export default ComponentDialog;