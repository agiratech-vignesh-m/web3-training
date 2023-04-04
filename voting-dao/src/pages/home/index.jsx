import React, { useEffect, useState } from 'react';
import ListCard from '../../components/cards/listcard';
// import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';
// import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { selectList, walletStatus } from '../../redux/counter/counterSlice'; 
import { useSelector } from 'react-redux';
import './home.scss';
import { allProposalDetailsRead } from '../../integration/web3Client';
import ConnectWallet from '../../components/cards/connectWallet';
// import Loading from '../../components/loading';

const Home = () => {
  let [list, setList] = useState([]);
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState(true);
  const listData = useSelector(selectList);
  const isWalletConnected = useSelector(walletStatus);

  useEffect(() => {
    getProposals();
  }, [])
  async function getProposals() {
    let proposals = await allProposalDetailsRead("metamask", 1)
    setList(proposals)
  }
  
  const sty = {
    position: 'relative',
    borderRadius: '33px',
    backgroundColor: '#211f24',
    borderColor: '#2d2d2d',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '2px 5px',
    '&:hover': {
      backgroundColor: '#211f24',
      borderColor: '#8b949e',
    },
    // marginRight: theme.spacing(2),
    marginLeft: '0 !important',
    // width: '100%',
  };

  const searchList = (e) => {
    setSearch(search => search = e?.target?.value??'');
    if (!e?.target?.value) {
      setList(pre => pre = listData);
      return;
    }
    const filteredData = listData.filter(
      li => li.title.match(new RegExp(e.target.value, "i"))
    );
    setList(pre => pre = filteredData);
  }
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log('event.target.value', event.target.value);
    if(event.target.value === 'All'){
      setList(pre => pre = listData);
      return
    }
    // if(event.target.value==='')
    const filteredData = listData.filter(li => li.isActive == (event.target.value === 'Active'));
    list = filteredData
    setList(list);
  };

  const sortList = () => {
    setSort(pre => pre = !pre);
  }

  const Placeholder = ({ children }) => {
    return <div style={{ color: "#aaa"}}>{children}</div>;
  };

  return (

<div className="container" 
          style={{ margin: "1rem" }}
          >
          <Box className='user-box'
                          sx={{
                            width: '96%',
                            height: "auto",
                            overflow: 'overlay',
                            '&:hover': {
                              // backgroundColor: 'primary.whitesmoke',
                              // opacity: [0.9, 0.8, 0.7],
                            },
                      }}
                    >   
        {/* <Loading /> */}
       {/* {isWalletConnected ? <> */}
          <div className='proposal-list-head'>
              <h2>Proposals</h2>
              {/* <div> */}

                  <Stack direction="row" spacing={2} className="proposal-stack">
                  {/* <div style={sty}>
                  <InputBase
                    style={{ color: 'white' }}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search...' }}
                    onChange={searchList}
                    value={search}
                  />
                  <IconButton type="button" style={{ color: 'white' }} sx={{ p: '10px'}} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  </div> */}
                  <Box sx={{ minWidth: 120 }} className="proposal-filter-box">
                      <FormControl fullWidth>
                        {/* <InputLabel style={{ color: 'white' }}>Filter</InputLabel> */}
                        <Select
                          // labelId="demo-simple-select-label"
                          displayEmpty
                          // id="demo-simple-select"
                          value={filter}
                          // label="Filter"
                          placeholder="Select an option"
                          onChange={handleChange}
                          className="propoasl-select"
                          renderValue={
                            filter !== "" ? undefined : () => <Placeholder>Filter</Placeholder>
                          }
                          MenuProps={{
                                sx: {
                                // backgroundColor: "pink",
                              "&& .MuiList-root": {
                                backgroundColor: "#211f24",
                                color: "#8b949e"
                              }
                            }
                          }}
                        >
                          {/* <MenuItem value=""><em>Filter</em></MenuItem> */}
                          <MenuItem value={'All'}>All</MenuItem>
                          <MenuItem value={'Active'}>Active</MenuItem>
                          <MenuItem value={'Closed'}>Closed</MenuItem>
                        </Select>
                      </FormControl>
                  </Box>
                    {/* <Button className='proposal-btn' onClick={sortList} endIcon={<SortByAlphaIcon color='error' />}>
                      sort
                    </Button> */}
                  </Stack>
              {/* </div> */}
          </div>
            {!!list.length && list.map((li, i) => (
              <ListCard listItems={li} index={i} key={i}/>
            ))}
            {/* // : <ConnectWallet title="Proposal List" text="Connect your wallet to view the proposal list" />}</> */}
            </Box>
          </div>
  )
}

export default Home