import React, { useEffect, useState } from 'react';
import ListCard from '../../components/cards/listcard';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import { allProposalDetailsRead } from '../../integration/web3Client';
import { ProposalStatus } from '../../constant/helpText';
import './home.scss';
import { getisConnectAMENetwork, getLoading } from '../../redux/counter/counterSlice';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Navigationbar from '../../container/layout/navigationbar';

const Home = () => {
  let [list, setList] = useState([]);
  let [listData, setListData] = useState([]);
  const [filter, setFilter] = React.useState('');
  const isConnectAMENetwork = useSelector(getisConnectAMENetwork);
  const [loading, setLoading] = useState(false);
  const connectLoading = useSelector(getLoading);

  // useEffect(() => {
  //   getProposals();
  // }, []);

  useEffect(() => {
    if(connectLoading) return
    if(isConnectAMENetwork)
        getProposals();
      else {
        setList(pre => pre =[]);
        setListData(pre => pre =[]);
      }
  }, [isConnectAMENetwork])

  async function getProposals() {
    try {
      setLoading(true);
      let proposals = await allProposalDetailsRead("metamask", 0);
      console.log('proposals', proposals);
      setList(proposals);
      setListData(proposals);
      setLoading(false);
    } catch (error) {
      console.log('getProposals error', error);
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === 'All') {
      setList(pre => pre = listData);
      return
    }
    const filteredData = listData.filter(li => li.isActive == event.target.value);
    list = filteredData
    setList(list);
  };

  const Placeholder = ({ children }) => {
    return <div className='filter-defalt-select'>{children}</div>;
  };
  return (
    <>
      <Navigationbar />
      <div className="container">
        <Box className='user-box'
            style={{ padding: '0% 2% 2% 2%'}}
          sx={{
            width: '96%',
            height: "auto",
            overflow: 'overlay',
          }}
        >
          {loading && <Loading />}
          
          <div className='proposal-list-head'>
            <h2>Proposals</h2>

            {!!listData.length && <Stack direction="row" spacing={2} className="proposal-stack">
              <Box sx={{ minWidth: 120 }} className="proposal-filter-box">
                <FormControl sx={{ m: 1, minWidth: 80 }} className="filter-select" >
                <FilterAltIcon style={{ color:'#e4681f' }} />
                  <Select
                    autoWidth
                    displayEmpty
                    value={filter}
                    placeholder="Select an option"
                    onChange={handleChange}
                    className="propoasl-select"
                    renderValue={
                      filter !== "" ? undefined : () => <Placeholder>Filter</Placeholder>
                    }
                    sx= {{
                      "&& .MuiSelect-select": {
                        color: "#1f1f1f", 
                        fontSize: '18px', 
                        fontFamily: 'CircularStdMedium',
                        minHeight: 'unset',
                        '&:hover': {
                          color: "#f46228"
                        }
                      },
                    "& .MuiSvgIcon-root": {
                      color: "#1f1f1f",
                      '&:hover': {
                        color: "#f46228"
                      }
                    },
                    }}
                    MenuProps={{
                      sx: {
                        "&& .MuiList-root": {
                          color: "#1f1f1f", 
                          fontSize: '18px', 
                          fontFamily: 'CircularStdMedium'
                          // backgroundColor: "#211f24",
                          // color: "red"
                        },
                        '&& .MuiButtonBase-root': {
                          '&:hover': {
                            color: 'white',
                            background: "#f46228"
                          }
                        }
                      }
                    }}
                  >
                    <MenuItem value={'All'}>All</MenuItem>
                    {ProposalStatus.map((li, i) => (
                      <MenuItem key={`filter-${i}`} value={li.id}>{li.status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Stack>}
          </div>
          {!!list.length && list.map((li, i) => (
            <ListCard listItems={li} index={i} key={i} />
          ))}
          {(!isConnectAMENetwork && !connectLoading) && <div style={{ textAlign: 'center', color: 'red' }} > <p> Please switch to AME network. </p></div>}
        </Box>
      </div>
    </>
  )
}

export default Home