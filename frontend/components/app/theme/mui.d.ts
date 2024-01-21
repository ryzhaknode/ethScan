import { Button, buttonClasses } from '@mui/material';
import { Theme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        info: true;
    }
}

declare module '@mui/material/styles' {
    interface Components {
        MuiButton?: {
            variants?: Array<{
                props: { variant: 'info' };
                style: Record<string, any>;
            }>;
        };
    }
}