import React, { useState, useEffect } from 'react'
import { Box, FormControl, Grid, OutlinedInput, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import useForm from '../../helpers/useForm';
import { CreateProposalValidation } from '../../helpers/validateRules';
import moment from 'moment';
import { walletStatus, getWalletData, setWalletDataBalance, getLoading } from '../../redux/counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './createproposal.scss';
import { allProposalDetailsRead, balanceUpdate, createProposalSetup } from '../../integration/web3Client';
import ConnectWallet from '../../components/cards/connectWallet';
import Loading from '../../components/loading';
import dayjs from 'dayjs';
import Navigationbar from '../../container/layout/navigationbar';

const CreateProposal = () => {
    //Custom Hook Form Initial values
    const initialValues = {
        title: "",
        description: "",
        start_date: null,
        end_date: null,
        quorumPercentage: null,
        isActive: 1
    };
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handlePercentageNumberChange,
        setUpdateValue,
        isSubmitting
    } = useForm(initialValues, handleSubmitCB, CreateProposalValidation);
    const dispatch = useDispatch();
    const location = useNavigate();
    const [globalErrMsg, setGlobalErrMsg] = useState("");
    const [startDateErrMsg, setstartDateErrMsg] = useState("");
    const [isTitleExistErrMsg, setTitleExistErrMsg] = useState("");
    const walletData = useSelector(getWalletData);
    const isWalletConnected = useSelector(walletStatus);
    const connectLoading = useSelector(getLoading);
    const [isSubmited, setSubmited] = useState(false);
    let [list, setList] = useState([]);
  // const [loading, setLoading] = useState(true);

    // let [tokenBalance, setTokenBalance] = useState();

    // useEffect(() => {
    //     getProposals();
    // }, [walletData]);

    // const initialFuncion = async () => {
    //     if (Object.keys(walletData)?.length)
    //         await ameTokenBalance();
    //     else 
    //     setLoading(false);
    // }
    // async function ameTokenBalance() {
    //     return new Promise(async (resolve) => {
    //         tokenBalance = await balanceOfAmeToken("metamask", walletData?.account);
    //         setTokenBalance(tokenBalance);
    //         setLoading(false);
    //         resolve(true);
    //     })
    // }

        async function checkTitleExist() {
        return new Promise(async (resolve) => {
            list = await allProposalDetailsRead("metamask", 0);
            setList(list);
            console.log(list)
            let isTitleExist = list.filter(l => l.title.toLowerCase().trim() === values.title.toLowerCase().trim());
            if(isTitleExist.length >= 2) {
                setTitleExistErrMsg('Title already exist');
                resolve(1);
            } else setTitleExistErrMsg('');
            resolve(0);
        })
    }

    // async function getProposals() {
    //     list = await allProposalDetailsRead("metamask", 0);
    //     setList(list);
    //   }
      
    async function ameBalance() {
        try {
            let getBalance = await balanceUpdate("metamask", walletData?.account);
            dispatch(setWalletDataBalance(getBalance));
            location('/proposals');
            setSubmited(false);
        } catch (error) {
            setSubmited(false);
        }
    }

    async function handleSubmitCB() {
        const check = await checkStartDate();
        if(!check) return;
        let isTitleExisting = await checkTitleExist();
        if(isTitleExisting) return;
        setstartDateErrMsg(err => err = '');
        if (isWalletConnected) {
            // await ameTokenBalance();
            if (+walletData?.ameBalance < +process.env.REACT_APP_CREATE_PROPOSAL_BALANCE) return
            setSubmited(true);
            createProposalSetup("metamask", walletData?.account, values.title, values.description, values.quorumPercentage, values.start_date, values.end_date).then(transaction => {
                ameBalance();
            }).catch(err => {
                console.log('err', err);
                setSubmited(false);
            })
        } else {
            alert("Please connect wallet");
        }
    }

    useEffect(() => {
        if(isSubmitting) 
        setTimeout(() => {
            checkStartDate();
        }, 1000);
    }, [values.start_date])
    
    const checkStartDate = () => {
        return new Promise((resolve, reject) => {
            const current = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
            const start_date = moment(moment(values.start_date).format("YYYY-MM-DD"), "YYYY-MM-DD");
            const currentTime = moment(moment().format("HH:mm"), "HH:mm");
            const start_date_time = moment(moment(values.start_date).format("HH:mm"), "HH:mm");
            if(current.isSameOrAfter(start_date)) {
                if(currentTime.isAfter(start_date_time)){
                    setstartDateErrMsg(err => err = 'Start Date must be greater than current date and time');
                    resolve(0);
                } else { setstartDateErrMsg(err => err = ''); resolve(1)};
            } else setstartDateErrMsg(err => err = '');
            resolve(1);
         })
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        await checkStartDate();
        handleSubmit(e);
    }

    const allowOnlyNumericsOrDigits = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            e.preventDefault();
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
        <Navigationbar />
        <div className="container">
            {/* <Loading />  */}
            {isSubmited && <Loading />}
            {(connectLoading) ? <Loading /> : <Box className='user-box'
                style={{padding: '1% 6%'}}
                sx={{
                    width: '88%',
                    height: (!isWalletConnected && +walletData?.ameBalance >= +process.env.REACT_APP_CREATE_PROPOSAL_BALANCE) ? '80vh' : "auto",
                    overflow: 'overlay',
                }}
            >
                {isWalletConnected ? <>
                    {+walletData?.ameBalance >= +process.env.REACT_APP_CREATE_PROPOSAL_BALANCE ?
                        <form noValidate>
                            <div className='page-header-title pt-2 mt-6'> Create Proposal</div>
                            <p className='helper-text'>{`To create a proposal you need to hold 1 Million+ AME.`}</p>
                            <div className="addConstitution-card">
                                <Grid container spacing={2} columns={12}>
                                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingRight: "4%", paddingLeft: '4%', paddingTop: '8px' }}>
                                        <FormControl variant="standard" className='mb-5' fullWidth >
                                            <label className='field-label'>{values.constitutionType?.constitutionType} Title<span className='graymandatory'>*</span></label>
                                            <OutlinedInput
                                                name="title"
                                                placeholder="Title"
                                                value={values?.title}
                                                autoComplete='off'
                                                size="small"
                                                className='input-field'
                                                onChange={handleChange}
                                                onBlur={()=> {
                                                    handleChange({target: { name: 'title', value: values.title.trim() }});
                                                    checkTitleExist();
                                                }}
                                                readOnly={isSubmited}
                                            />
                                            {(errors?.title || isTitleExistErrMsg) &&
                                                <div className='mandatory'>{errors.title?? isTitleExistErrMsg}</div>
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingRight: "4%", paddingLeft: '4%', paddingTop: '8px' }}>
                                        <FormControl variant="standard" className='mb-5' fullWidth >
                                            <label className='field-label'>{values.constitutionType?.constitutionType} Set Quorum Percentage<span className='graymandatory'>*</span></label>
                                            <OutlinedInput
                                                name="quorumPercentage"
                                                placeholder="Set Quorum Percentage"
                                                value={values?.quorumPercentage ?? null}
                                                defaultValue={values?.quorumPercentage ?? null}
                                                onKeyPress={allowOnlyNumericsOrDigits}
                                                autoComplete='off'
                                                size="small"
                                                className='input-field'
                                                id="quorumPercentage"
                                                readOnly={isSubmited}
                                                // type='number'
                                                onChange={handlePercentageNumberChange}
                                            />
                                            <p className='text-range'> {`Range between (1 to 100%)`}</p>
                                            {errors?.quorumPercentage &&
                                                <div className='mandatory'>{errors.quorumPercentage}</div>
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingRight: "4%", paddingLeft: '4%', paddingTop: '8px' }}>
                                        <FormControl fullWidth>
                                            <label className='field-label'>Start Date<span className='graymandatory'>*</span></label>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DateTimePicker
                                                    ampm={undefined}
                                                    readOnly={isSubmited}
                                                    inputFormat="MM/DD/YYYY HH:mm Z"
                                                    // views={['year']}
                                                    // minDate={new Date()}
                                                    // minTime={dayjs(new Date())}
                                                    minDateTime={dayjs(new Date())}
                                                    value={values?.start_date}
                                                    // maxDateTime={dayjs(values?.end_date ?? )}
                                                    onChange={(newValue) => {
                                                        setUpdateValue("start_date", moment(newValue));
                                                    }}
                                                    renderInput={(params) => <TextField {...params}
                                                        inputProps={{ ...params.inputProps, readOnly: true, placeholder: "mm/dd/yyyy HH:mm z" }}
                                                        sx={{
                                                            svg: { color: "#8b949e" },
                                                            input: { color: "#1f1f1f", height: '1.7rem' },
                                                            label: { color: "#8b949e" }
                                                        }}
                                                        size={"small"}
                                                        helperText={null}
                                                        className='input-field' />}
                                                />
                                            </LocalizationProvider>
                                            {(errors?.start_date || startDateErrMsg) &&
                                                <div className='mandatory'>{errors.start_date?? startDateErrMsg}</div>
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingRight: "4%", paddingLeft: '4%', paddingTop: '8px' }}>
                                        <FormControl fullWidth>
                                            <label className={values?.start_date?'field-label': 'field-label readonly-text'}  >End Date<span className='graymandatory'>*</span></label>
                                            <LocalizationProvider dateAdapter={AdapterMoment}  adapterLocale={"ru"}>
                                                <DateTimePicker
                                                    ampm={undefined}
                                                    readOnly={isSubmited || !values?.start_date}
                                                    // views={['year']}
                                                    minDateTime={dayjs(values.start_date ? values.start_date: new Date())}
                                                    // minTime={dayjs(values.start_date ? values.start_date: new Date())}
                                                    // minDate={values.start_date ? values.start_date: new Date()}
                                                    value={values?.end_date}
                                                    // maxDate={new Date()}
                                                    onChange={(newValue) => {
                                                        setUpdateValue("end_date", moment(newValue));
                                                    }}
                                                    inputFormat="MM/DD/YYYY HH:mm Z"
                                                    renderInput={(params) => <TextField {...params}
                                                        inputProps={{ ...params.inputProps, readOnly: true, placeholder: "mm/dd/yyyy HH:mm z" }}
                                                        sx={{
                                                            svg: { color: "#8b949e" },
                                                            input: { color: "#1f1f1f", height: '1.7rem' },
                                                            label: { color: "#8b949e" },

                                                        }}
                                                        size={"small"}
                                                        helperText={null}
                                                        className='input-field' />}
                                                />
                                            </LocalizationProvider>
                                            {errors?.end_date &&
                                                <div className='mandatory'>{errors.end_date}</div>
                                            }
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ paddingRight: "4%", paddingLeft: '4%', paddingTop: '8px' }}>
                                        <FormControl variant="standard" className='mb-5' fullWidth >
                                            <label className='field-label'>Description<span className='graymandatory'>*</span></label>
                                            <OutlinedInput
                                                name="description"
                                                rows={4}
                                                multiline
                                                placeholder="Description"
                                                value={values?.description}
                                                onChange={handleChange}
                                                onBlur={()=> handleChange({target: { name: 'description', value: values.description.trim() }})}
                                                autoComplete='off'
                                                size="small"
                                                className='input-field'
                                                readOnly={isSubmited}
                                            />
                                            {errors?.description &&
                                                <div className='mandatory'>{errors.description}</div>
                                            }
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                {globalErrMsg && (
                                <div
                                    style={{ textAlign: "center", margin: "15px 0px 15px 0px" }}
                                    className="mandatory"
                                >
                                    {globalErrMsg}
                                </div>
                            )}
                            <div className='create-action'>
                                <Button
                                    disableRipple
                                    type='button'
                                    onClick={formSubmit}
                                    className='create-btn'
                                    disabled={isSubmited}
                                >
                                    Create
                                </Button>
                                {/* <Button
                                    disableRipple
                                    className='create-btn create-cancel-btn'
                                >
                                    Cancel
                                </Button> */}
                            </div>
                            </div>
                        </form> : <div style={{ textAlign: 'center', color: 'red' }} > {walletData?.ameBalance && <p> {`To create a proposal you need to hold 1 Million+ AME.`} </p>}</div>}
                </> :
                    <ConnectWallet title="Create Proposal" text="Connect your wallet to a create proposal" />}
            </Box>}
        </div>
        </>
    )
}

export default CreateProposal;