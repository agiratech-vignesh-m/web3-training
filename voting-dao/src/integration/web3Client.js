import votingAbi from './votingabi.json';
import tokenabi from './tokenabi.json';
import Web3 from 'web3';

let isVotingInitialized = false;
let votingContract;

let isTokenInitialized = false;
let tokenContract;

// internal: detect the wallet provider
export const detectCurrentProvider = (conn_provider = 'metamask') => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  }
  if (provider &&
    provider.providers &&
    provider.providers.length &&
    conn_provider === 'metamask') {
    let m_provider = window.ethereum.providers.find((x) => x.isMetaMask);
    if (m_provider) provider = m_provider;
  }
  return provider;
};

// main: initiate the metamask wallet (used it in header part)
export const initiateNetwork = async (provider) => {
  try {
    const currentProvider = detectCurrentProvider(provider);
    if (currentProvider) {
      await currentProvider.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      const networkId = await web3.eth.net.getId();

      if (userAccount.length === 0) {
        return new Error('Please connect to Metamask');
      } else {
        const account = userAccount[0];
        // console.log("Account", account);
        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); //Convert balance to wei

        return {ethBalance, account, chainId, networkId};
      }
    } else return new Error('Non-Ethereum browser detected. You should consider trying Metamask')
  } catch (err) {
    console.log(err);
    return new Error(
      'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
    );
  }
}

// common: initiate Voting contract
export const initiateVotingContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);
    votingContract = new web3.eth.Contract(
      votingAbi,
      process.env.REACT_APP_VOTING_CONTRACT_ADDRESS
    );

    isVotingInitialized = true;
  }
}

// common: initiate the AME Token contract
export const initiateTokenContract = async (conn_provider) => {
  let provider = detectCurrentProvider(conn_provider)

  if (provider) {
    const web3 = new Web3(provider);
    tokenContract = new web3.eth.Contract(
    tokenabi,
      process.env.REACT_APP_AME_TOKEN_CONTRACT_ADDRESS
    );

    isTokenInitialized = true;
  }
}

export const createProposalSetup = async (conn_provider, w_address, title, description, setQuorum, endDate ) => {
  console.log("Final", conn_provider, w_address, title, description, setQuorum, endDate)
  let provider = detectCurrentProvider(conn_provider);

  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }

  if (provider) {
    const web3 = new Web3(provider);
    let quorumToWei = web3.utils.toWei(setQuorum.toString(), 'ether');
    // console.log("quorumToWei",quorumToWei)

    let unixDate = new Date(endDate.toString()).valueOf();
    unixDate = unixDate.toString().substring(0, unixDate.toString().length - 3);
    // console.log("unixDate",unixDate);
    // console.log("Data", title, description, setQuorum, quorumToWei, unixDate);
    return await votingContract.methods.createProposal({
      title : title,
      description : description,
      setQuorum : quorumToWei,
      endDate : unixDate
    }).send({
      from: w_address
    })
  }
}

export const allProposalDetailsRead = async (conn_provider, _sort) => {
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.allProposalDetails(_sort)
  .call()
  .then((allPropDetails) => {
    // console.log(JSON.stringify(allPropDetails), allPropDetails, "allProposalDetails")
    // console.log(allPropDetails[0].againstVotes, allPropDetails[0].forVotes, allPropDetails[0].status, "Data 2 ")
    // console.log(allPropDetails[0].ps.title, allPropDetails[0].ps.description, allPropDetails[0].ps.setQuorum, allPropDetails[0].ps.timestamp, allPropDetails[0].ps.proposalId, allPropDetails[0].ps.startDate, allPropDetails[0].ps.endDate, "Data 3 ")
    let proposals = [];
    for (let i = 0; i < allPropDetails.length; i++) {
    	let prop = {
    		title: allPropDetails[i].ps.title,
    		description: allPropDetails[i].ps.description,
    		setQuorum: allPropDetails[i].ps.setQuorum,
    		timestamp: allPropDetails[i].ps.timestamp * 1000,
    		proposalId: allPropDetails[i].ps.proposalId,
    		start_date: allPropDetails[i].ps.startDate *1000,
    		end_date: allPropDetails[i].ps.endDate *1000,
    		againstVotes: allPropDetails[i].againstVotes,
    		forVotes: allPropDetails[i].forVotes,
    		isActive: allPropDetails[i].status
    	}
    	proposals.push(prop);
    }
    return proposals;
  })
}

export const getProposalDetailsRead = async (conn_provider, proposalId) => {
  // console.log("proposalId", proposalId)
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.getProposalDetails(proposalId)
  .call()
  .then((propDetails) => {
    console.log(propDetails, "proposalDetails")
    return propDetails
  })
}

export const voteProposal = async (conn_provider, w_address, voteDecision, proposalId) => {
  let provider = detectCurrentProvider(conn_provider);

  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  if (provider) {
    const web3 = new Web3(provider);
    return await votingContract.methods.castVote(voteDecision, proposalId).send({
      from: w_address
    })
  }
}
