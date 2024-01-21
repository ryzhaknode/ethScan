import {Box} from "@mui/material";

interface MyLoadingProps {
    big?: boolean;

}
const MyLoading = ({big}: MyLoadingProps) => {
    return (
        <Box className={`lds-dual-ring ${big ? 'big': ""}`}></Box>
    );
};

export default MyLoading;