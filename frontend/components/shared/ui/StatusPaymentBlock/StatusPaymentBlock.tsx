import cls from './StatusPaymentBlock.module.scss'
import {classNames} from "../../lib/classNames";
import {Box, Typography} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface StatusPaymentBlockProps {
    status: string;
}

export const StatusPaymentBlock = ({status}: StatusPaymentBlockProps) => {

    return (
        <Box className={classNames(cls.StatusBlockBackground, {
            selectedDone: status === 'paid_in_full',
            selectedRejected: status === 'canceled',
            waitingBill: status === 'waiting_for_payment'
        })}

        >

            {status === 'paid_in_full' &&
                <Box className={cls.StatusBlock} position={'relative'}>
                    <DoneIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>
                    <Box className={cls.messageStatus}>
                        <Typography  color={'#00D689'} className={cls.messageStatus__text}
                                    fontWeight={'400'}
                                    variant='body2' lineHeight='11px'
                                    fontSize='10px'>Сплачено повністю</Typography>
                    </Box>
                </Box>
            }
            {status === 'canceled' &&
                <Box className={cls.StatusBlock} position={'relative'}>
                    <CloseIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>
                    <Box className={cls.messageStatusSmall}>
                        <Typography  color={'#FF3E3E'} className={cls.messageStatusSmall__text}
                                    fontWeight={'400'}
                                    variant='body2' lineHeight='11px' fontSize='10px'>Не сплачено</Typography>
                    </Box>
                </Box>
            }

            {status === 'waiting_for_payment' &&
                <Box className={cls.StatusBlock} position={'relative'}>
                    {/*<CloseIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>*/}
                    <Image height={12} width={12}
                           src={'/images/icons/money.svg'}
                           alt='image'
                    />
                    <Box className={cls.messageStatus}>
                        <Typography color={'#FFC404'} className={cls.messageStatus__text}
                                    fontWeight={'400'}
                                    variant='body2' lineHeight='11px' fontSize='10px'>Виставлений рахунок</Typography>
                    </Box>
                </Box>
            }

            {status === 'not_exhibited' &&
                <Box className={cls.StatusBlock} position={'relative'}>
                    {/*<CloseIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>*/}
                    <Image height={12} width={12}
                           src={'/images/icons/moneyGray.svg'}
                           alt='image'
                    />
                    <Box className={cls.messageStatusSmall}>
                        <Typography color={'#141414'} className={cls.messageStatusSmall__text}
                                    fontWeight={'400'}
                                    variant='body2' lineHeight='11px' fontSize='10px'>Не виставлено</Typography>
                    </Box>
                </Box>
            }

            {status === 'partially_paid' &&
                <Box className={cls.StatusBlock} position={'relative'}>
                    {/*<CloseIcon sx={{width: '20px', height: '16px', color: '#FFFFFF', cursor: 'pointer'}}/>*/}
                    <Image height={12} width={12}
                           src={'/images/icons/doneParth.svg'}
                           alt='image'
                    />
                    <Box className={cls.messageStatus}>
                        <Typography  color={'#141414'} className={cls.messageStatus__text}
                                    fontWeight={'400'}
                                    variant='body2' lineHeight='11px' fontSize='10px'>Сплачено частково</Typography>
                    </Box>
                </Box>
            }
        </Box>
    );
};