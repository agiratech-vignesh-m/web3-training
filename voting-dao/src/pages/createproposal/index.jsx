import React, { useState, useEffect } from 'react'
import { Box, Divider, FormControl, Grid, OutlinedInput, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import useForm from '../../helpers/useForm';
import { CreateProposalValidation } from '../../helpers/validateRules';
import moment from 'moment';
import { addList, walletStatus, getWalletData } from '../../redux/counter/counterSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './createproposal.scss';
import { createProposalSetup } from '../../integration/web3Client';
import ConnectWallet from '../../components/cards/connectWallet';

const CreateProposal = () => {
        //Custom Hook Form Initial values
        const initialValues = {
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            quorumPercentage: null,
            isActive: 1
        };
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleFileChange,
        handlePercentageNumberChange,
        resetForm,
        setUpdateValue
    } = useForm(initialValues, handleSubmitCB, CreateProposalValidation);
    const dispatch = useDispatch();
    const location = useNavigate();
    const [globalErrMsg, setGlobalErrMsg] = useState("");
    const walletData = useSelector(getWalletData);
    console.log("walletData",walletData)
    const isWalletConnected = useSelector(walletStatus);
    console.log(errors)
    console.log(values.quorumPercentage);
    
    
    
    async function handleSubmitCB() {
        console.log("values", values);
        if (isWalletConnected){
            let transaction = await createProposalSetup("metamask", walletData?.account, values.title, values.description, values.quorumPercentage, values.end_date)
            console.log("transaction", transaction)
            dispatch(addList(values));
            location('/proposals');
        }else {
            alert("Please connect wallet");
        }
    }
    
    const formSubmit = (e) => {
        console.log("forms", e);
        e.preventDefault();
        handleSubmit(e);
    }

    const allowOnlyNumericsOrDigits=(e)=> {		
		const charCode = e.which ? e.which : e.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault();
      return false;
    } else {
      return true;
    }
	}
    
  return (
    <div className="container" 
    style={{ margin: !isWalletConnected? "1rem 15rem": "1rem" }}
    >
    <Box className='user-box'
                    sx={{
                      width: '96%',
                      height:  (!isWalletConnected || walletData?.ethBalance < 1)? "auto" : '80vh',
                      overflow: 'overlay',
                }}
              >  
                    {isWalletConnected ? <>
                    {walletData?.ethBalance >= 1 ?
                    <form noValidate>
                    <div className='page-header-title pt-2 mt-6'> Create Proposal</div>
                    <div className="addConstitution-card">
                        <Grid container spacing={2} columns={12}>
                        <Grid item xs={6} style={{ paddingRight: "7%" }}>
                                <FormControl variant="standard" className='mb-5' fullWidth >
                                    <label className='field-label'>{values.constitutionType?.constitutionType} Title<span className='graymandatory'>*</span></label>
                                    <OutlinedInput
                                        name="title"
                                        placeholder= "Title"
                                        value={values?.title}
                                        autoComplete='off'
                                        size="small"
                                        className='input-field'
                                        onChange={handleChange}
                                    />
                                    {errors?.title &&
                                        <div className='mandatory'>{errors.title}</div>
                                    }
                                </FormControl>
                        </Grid>
                        <Grid item xs={6} style={{ paddingRight: "7%" }}>
                                <FormControl variant="standard" className='mb-5' fullWidth >
                                    <label className='field-label'>{values.constitutionType?.constitutionType} Set Quorum Percentage<span className='graymandatory'>*</span></label>
                                    <OutlinedInput
                                        name="quorumPercentage"
                                        placeholder= "Set Quorum Percentage"
                                        value={values?.quorumPercentage ?? null}
                                        defaultValue={values?.quorumPercentage ?? null}
                                        onKeyPress= {allowOnlyNumericsOrDigits}
                                        autoComplete='off'
                                        size="small"
                                        className='input-field'
                                        id="quorumPercentage"
                                        // type='number'
                                        onChange={handlePercentageNumberChange}
                                    />
                                    <p className='text-range'> {`Range between (1 to 100%)`}</p>
                                    {errors?.quorumPercentage &&
                                        <div className='mandatory'>{errors.quorumPercentage}</div>
                                    }
                                </FormControl>
                        </Grid>
                            <Grid item xs={6} style={{ paddingRight: "7%" }}>
                                <FormControl fullWidth className='readonly-text'>
                                    <label className='field-label readonly-text'>Start Date<span className='graymandatory'>*</span></label>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            // views={['year']}
                                            // minDate={new Date()}
                                            value={values?.start_date}
                                            // maxDate={new Date()}
                                            readOnly
                                            onChange={(newValue) => {
                                                setUpdateValue("start_date", moment(newValue));
                                            }}
                                            renderInput={(params) => <TextField {...params}
                                            inputProps={{...params.inputProps, readOnly: true,  placeholder: "Now"}}
                                            sx={{
                                                svg: { color:  "#8b949e" },
                                                input: { color:  "#8b949e", height: '1.7rem'  },
                                                label: { color:  "#8b949e" }
                                              }}
                                                size={"small"}
                                                helperText={null}
                                                className='input-field' />}
                                        />
                                    </LocalizationProvider>
                                    {/* {errors?.start_date &&
                                        <div className='mandatory'>{errors.start_date}</div>
                                    } */}
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} style={{ paddingRight: "7%" }}>
                                <FormControl fullWidth>
                                    <label className='field-label'>End Date<span className='graymandatory'>*</span></label>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DateTimePicker
                                            // views={['year']}
                                            minDate={new Date()}
                                            value={values?.end_date}
                                            // maxDate={new Date()}
                                            onChange={(newValue) => {
                                                setUpdateValue("end_date", moment(newValue));
                                            }}
                                            renderInput={(params) => <TextField {...params}
                                            inputProps={{...params.inputProps, readOnly: true, placeholder: "mm/dd/yyyy hh:mm"}}
                                            sx={{
                                                svg: { color:  "#ffffff" },
                                                input: { color:  "#ffffff", height: '1.7rem' },
                                                label: { color:  "#8b949e" },
                                                
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
                            <Grid item xs={12} style={{ paddingRight: "7%" }}>
                                <FormControl variant="standard" className='mb-5' fullWidth >
                                    <label className='field-label'>Description<span className='graymandatory'>*</span></label>
                                    <OutlinedInput
                                        name="description"
                                        rows={4}
                                        multiline
                                        placeholder="Description"
                                        value={values?.description}
                                        onChange={handleChange}
                                        autoComplete='off'
                                        size="small"
                                        className='input-field'
                                        
                                    />
                                    {errors?.description &&
                                        <div className='mandatory'>{errors.description}</div>
                                    }
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
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
                        >
                            Create
                        </Button>
                        <Button
                            disableRipple
                            className='create-btn create-cancel-btn'
                            // onClick={() => BacktoConstitution()}
                        >
                            Cancel
                        </Button>
                    </div>
            </form>:<div style={{ textAlign: 'center', color: 'red' }} > <p> You can't create proposal. Your voting power should be 1 AME Token at least. </p></div>}
             </> :
             <ConnectWallet title="Create Proposal" text="Connect your wallet to a create proposal"/>}
    </Box>
          </div>
  )
}

export default CreateProposal;