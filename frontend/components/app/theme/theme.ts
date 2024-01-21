import {createTheme} from "@mui/material";
import {node} from "prop-types";
import type {} from '@mui/lab/themeAugmentation';

export const theme = createTheme({

    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1440,
            xl: 1920,
        },
    },

    palette: {
        primary: {
            main: '#FFC404',
        },
        secondary: {
            main: '#FFFBED',
        },
        info: {
            main: '#141414'
        },
        error: {
            main: '#FF3E3E'
        },
        success: {
            main: '#00D689'
        },
    },

    typography: {
        fontFamily: "e-Ukraine, sans-serif",
        h1: {
            fontSize: '20px',
            lineHeight: '20px',
            fontWeight: '700',
        },

        h2: {
            fontSize: '24px',
            lineHeight: '24px',
            fontWeight: '700',
        },

        h3: {
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: '500',
            color: '#141414'
        },

        h4: {
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: '400',
            color: '#6A7178'
        },

        h5: {
            fontSize: '14x',
            lineHeight: '14px',
            fontWeight: '300',
            color: '6A7178'
        },

        h6: {
            fontSize: '10x',
            lineHeight: '10px',
            fontWeight: '300',
        },

        body1: {
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: '300'

        },

        body2: {
            fontSize: '14x',
            lineHeight: '14px',
            fontWeight: '300',
        }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'info' },
                    style: {
                        backgroundColor: 'none',
                        color: '#ADB5BD',
                        fontSize: '14px',
                        lineHeight: '14px',
                        fontWeight: '300',
                        padding: '0',

                        '&:hover': {
                            backgroundColor: 'none',
                        },
                    },
                },
            ],

            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    textTransform: 'none',
                    fontWeight: '700',
                    maxHeight: '48px',
                    borderRadius: '8px',
                    padding: '16px',
                    lineHeight: '16px',

                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                text: {
                    backgroundColor: '#F1F3F5',
                    color: '#ADB5BD',

                    '&:hover': {
                        backgroundColor: '#F1F3F5',
                    },
                },
                contained: {
                    backgroundColor: '#FFC404',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#FFC404',
                    },
                },
                outlined: {
                    borderColor: '#FFC404',
                    color: '#FFC404',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 123, 255, 0.04)',
                    },
                },
            },
        },

        MuiInput: {
            styleOverrides: {
                root: {
                    // font: 'unset',
                    borderRadius: '6px',
                    border: '1px solid #CED4DA',
                    maxHeight: '48px'

                },
                input: {
                    font: 'unset',
                    padding: '16px',
                    color: '#141414',
                    fontFamily: 'e-Ukraine, sans-serif',
                    fontWeight: '400',
                    '&::placeholder': {
                        color: '#6A7178',
                    },
                },


            },
        },

        MuiTabs: {
            styleOverrides: {
                root: {
                    width: '100%'
                },


            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    color: '#6A7178',
                    borderBottom: '1px solid #CED4DA',
                    textTransform: 'none',
                    width: '120px',


                    '&.Mui-selected': {
                        color: '#141414', // Колір для активного табу
                    },
                },
            },
        },
        MuiLoadingButton: {
            styleOverrides: {
                root: {

                    '&.Mui-disabled': {
                        // color: 'rgba(0, 0, 0, 0.26)',
                        // boxShadow: 'none',
                        backgroundColor: '#FFC404',
                    },
                },


            },
        },

        MuiFormGroup: {
            styleOverrides: {
                root: {
                    margin: '0'
                },


            },
        },

        MuiFormControl: {
            styleOverrides: {
                root: {
                    margin: '0'
                },


            },
        },

        MuiFormLabel: {
            styleOverrides: {
                root: {
                   fontWeight: '300',
                    fontSize: '12px',
                    lineHeight: '12px',
                    color: '#ADB5BD',
                },


            },
        },

        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '0px',
                },
            },
        },
    }

})
