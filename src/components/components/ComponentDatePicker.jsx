import { Autocomplete, Checkbox, DatePicker, TextField, useSnackbar, useValidatableForm } from 'comfort-react';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import ExampleUsageWrapper from '../ExampleUsageWrapper';
import { useState } from 'react';
import jsxToString from 'jsx-to-string';
import CurrentRulesInfo from '../CurrentRulesInfo';
import CurrentComponentApiInfo from '../CurrentComponentApiInfo';
import { customErrorMessageRenderer } from './CustomErrorMessageRenderer';
import { customErrorMessageJsx } from '../../constants/JsxConstants';

const VARIANT_OPTIONS = ['outlined', 'filled', 'standard'];
const INPUT_FORMAT_OPTIONS = [
    'dd/MMM/yyyy',
    'dd/MM/yyyy',
    'yyyy-MM-dd',
    'dd.MM.yyyy',
    'dd-MM-yyyy',
    'MM/dd/yyyy',
    'MM-dd-yyyy',
    'do MMM yyyy',
    'dd/MM/yyyy HH:mm',
];
const INPUT_STYLE = { color: 'red' };
const PLACEHOLDER_TEXT = 'custom placeholder';

const DEFAULT_DATE = new Date();

const rules = [{ path: 'val', ruleSet: [{ rule: 'required' }] }];

const ComponentDatePicker = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = useState(DEFAULT_DATE);
    const [selectedVariant, setSelectedVariant] = useState(VARIANT_OPTIONS[0]);
    const [selectedDisabled, setSelectedDisabled] = useState(false);
    const [selectedFullWidth, setSelectedFullWidth] = useState(false);
    const [selectedBlur, setSelectedBlur] = useState(false);
    const [selectedInputStyle, setSelectedInputStyle] = useState(false);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [selectedRenderErrorMessage, setSelectedRenderErrorMessage] = useState(false);
    const [enableUseValidatableForm, setEnableUseValidatableForm] = useState(false);
    const [selectedFocusedLabel, setSelectedFocusedLabel] = useState(false);
    const [format, setFormat] = useState();
    const [enableTime, setEnableTime] = useState(false);
    const [okText, setOkText] = useState();
    const [cancelText, setCancelText] = useState();
    const { setPathValue, setPathIsBlurred, getValue, getError } = useValidatableForm({
        rules,
    });

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleBlur = () => {
        enqueueSnackbar('DatePicker is blurred', { variant: 'info' });
    };

    const datePickerElementJsx = (
        <DatePicker
            label="DatePicker"
            path="val"
            format={format}
            placeholder={selectedPlaceholder ? PLACEHOLDER_TEXT : null}
            value={!enableUseValidatableForm ? value : getValue('val')}
            onChange={!enableUseValidatableForm ? handleChange : null}
            onBlur={selectedBlur ? (!enableUseValidatableForm ? handleBlur : null) : null}
            errorMessage={enableUseValidatableForm ? getError('val') : errorMessage}
            setPathValue={enableUseValidatableForm ? setPathValue : null}
            setPathIsBlurred={enableUseValidatableForm ? setPathIsBlurred : null}
            variant={selectedVariant}
            disabled={selectedDisabled}
            fullWidth={selectedFullWidth}
            textFieldProps={{
                sx: selectedInputStyle ? { input: INPUT_STYLE } : null,
            }}
            renderErrorMessage={selectedRenderErrorMessage ? customErrorMessageRenderer : undefined}
            focusedLabel={selectedFocusedLabel ? 'Focused DatePicker' : null}
            enableTime={enableTime}
            okText={okText}
            cancelText={cancelText}
        />
    );

    let currentJsx = jsxToString(datePickerElementJsx, {
        displayName: 'DatePicker',
        useFunctionCode: true,
        keyValueOverride: {
            renderErrorMessage: selectedRenderErrorMessage ? customErrorMessageJsx : undefined,
        },
    });
    currentJsx = "import { DatePicker } from 'comfort-react';\n\n" + currentJsx;

    return (
        <ExampleUsageWrapper header="DatePicker" codeUrl={'components/components/ComponentDatePicker.jsx'}>
            {datePickerElementJsx}
            <Grid container spacing={2} marginTop={2}>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={selectedVariant}
                        options={VARIANT_OPTIONS}
                        onChange={(val) => {
                            setSelectedVariant(val);
                        }}
                        label={'variant'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'disabled'}
                            value={selectedDisabled}
                            onChange={(newValue) => {
                                setSelectedDisabled(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'fullWidth'}
                            value={selectedFullWidth}
                            onChange={(newValue) => {
                                setSelectedFullWidth(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable input style'}
                            value={selectedInputStyle}
                            onChange={(newValue) => {
                                setSelectedInputStyle(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'blur'}
                            value={selectedBlur}
                            onChange={(newValue) => {
                                setSelectedBlur(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'placeholder'}
                            value={selectedPlaceholder}
                            onChange={(newValue) => {
                                setSelectedPlaceholder(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={errorMessage}
                        onChange={(val) => {
                            setErrorMessage(val);
                        }}
                        label="errorMessage"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'renderErrorMessage'}
                            value={selectedRenderErrorMessage}
                            onChange={(newValue) => {
                                setSelectedRenderErrorMessage(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable useValidatableForm'}
                            value={enableUseValidatableForm}
                            onChange={(newValue) => {
                                setEnableUseValidatableForm(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enable focusedLabel'}
                            value={selectedFocusedLabel}
                            onChange={(newValue) => {
                                setSelectedFocusedLabel(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete
                        value={format}
                        options={INPUT_FORMAT_OPTIONS}
                        onChange={(val) => {
                            setFormat(val);
                        }}
                        label={'format'}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup>
                        <Checkbox
                            label={'enableTime'}
                            value={enableTime}
                            onChange={(newValue) => {
                                setEnableTime(newValue);
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={okText}
                        onChange={(val) => {
                            setOkText(val);
                        }}
                        label="okText"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        value={cancelText}
                        onChange={(val) => {
                            setCancelText(val);
                        }}
                        label="cancelText"
                    />
                </Grid>
            </Grid>
            <CurrentRulesInfo currentRules={currentJsx} dontStringify={true} header="Current Jsx" />
            <CurrentComponentApiInfo
                currentApiInfo={DateApiInfo}
                currentApiLinks={'https://mui.com/x/api/date-pickers/date-picker/#main-content'}
                header={'DatePicker'}
            />
        </ExampleUsageWrapper>
    );
};

export default ComponentDatePicker;

const DateApiInfo = [
    {
        name: 'id',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'path',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'label',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'focusedLabel',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'value',
        type: 'oneOfType [Object, String]',
        defaultValue: '',
        description: '',
    },
    {
        name: 'className',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'setPathValue',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'errorMessage',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'setPathIsBlurred',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onChange',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'onBlur',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'noHelperText',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'fullWidth',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
    {
        name: 'placeholder',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'textFieldProps',
        type: 'Object',
        defaultValue: '',
        description: '',
    },
    {
        name: 'format',
        type: 'String',
        defaultValue: '',
        description: (
            <span className={'moreInformationLink'}>
                <a href={'https://date-fns.org/v2.29.3/docs/format'} target="_blank" rel="noreferrer">
                    More Information{' '}
                </a>
            </span>
        ),
    },
    {
        name: 'okText',
        type: 'string',
        defaultValue: '',
        description: '',
    },
    {
        name: 'cancelText',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'variant',
        type: 'String',
        defaultValue: '',
        description: '',
    },
    {
        name: 'renderErrorMessage',
        type: 'Func',
        defaultValue: '',
        description: '',
    },
    {
        name: 'enableTime',
        type: 'Bool',
        defaultValue: '',
        description: '',
    },
];
