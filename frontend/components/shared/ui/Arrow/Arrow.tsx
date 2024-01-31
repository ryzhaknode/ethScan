import {Box} from "@mui/material";

interface ArrowProps {
    className?: string;
    color: string;
    onClick?: any;
}

export const MyArrow = ({className, color, onClick}: ArrowProps) => (
        <svg  cursor={'pointer'} onClick={onClick} className={className} width="14" height="8"
             viewBox="0 0 14 8" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M13 1L7 7L1 1" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
);
