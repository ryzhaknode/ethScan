import cls from './StatusBlock.module.scss'
import {classNames} from "../../lib/classNames";
import {Box, Typography} from "@mui/material";
import LdsSpinner from "../LdsSpinner/LdsSpinner";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

interface StatusBlockProps {
    className?: string;
    status: string;
    rightVariant?: boolean;
}

const StatusBlock = ({className, status, rightVariant = false}: StatusBlockProps) => {

    return (
        <Box className={classNames(cls.StatusBlock, {
            selectedDone: status === 'approved',
            selectedRejected: status === 'rejected'
        })}

        >
            {status === 'pending_approve' &&
                <Box className='pendingBlock' position={'relative'}>
                    <LdsSpinner/>
                    {!rightVariant ? <Box className='message'>
                            <Typography width={'110px'} className='message__text' fontWeight={'400'}
                                        variant='body2'
                                        lineHeight='12px' fontSize='10px'>Очікує підтвердження</Typography>
                        </Box>
                        :
                        <Box className='message2'>
                            <Typography width={'110px'} className='message__text' fontWeight={'400'}
                                        variant='body2'
                                        lineHeight='12px' fontSize='10px'>Очікує підтвердження</Typography>
                        </Box>}
                </Box>
            }


            {status === 'approved' &&
                <Box className='approvedBlock' position={'relative'}>
                    <DoneIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>
                    {!rightVariant ? <Box className='messageDone'>
                            <Typography width={'70px'} color={'#00D689'} className='message__text'
                                        fontWeight={'400'}
                                        variant='body2' lineHeight='11px'
                                        fontSize='10px'>Підтверджено</Typography>
                        </Box>
                        :
                        <Box className='messageDone2'>
                            <Typography width={'70px'} color={'#00D689'} className='message__text'
                                        fontWeight={'400'}
                                        variant='body2' lineHeight='11px'
                                        fontSize='10px'>Підтверджено</Typography>
                        </Box>}
                </Box>
            }
            {status === 'rejected' &&
                <Box className='rejectedBlock' position={'relative'}>
                    <CloseIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>
                    {!rightVariant ? <Box className='messageReject'>
                            <Typography width={'50px'} color={'#FF3E3E'} className='message__text'
                                        fontWeight={'400'}
                                        variant='body2' lineHeight='11px' fontSize='10px'>Відхилено</Typography>
                        </Box>
                        :
                        <Box className='messageReject2'>
                            <Typography width={'50px'} color={'#FF3E3E'} className='message__text'
                                        fontWeight={'400'}
                                        variant='body2' lineHeight='11px'
                                        fontSize='10px'>Відхилено</Typography>
                        </Box>}
                </Box>
            }
        </Box>
    );
};

export default StatusBlock;