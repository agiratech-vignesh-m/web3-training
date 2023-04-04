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
        let ameBalance = await web3.eth.getBalance(account); // Get wallet balance
        ameBalance = web3.utils.fromWei(ameBalance, 'ether'); //Convert balance to wei

        return { ameBalance, account, chainId, networkId };
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

export const createProposalSetup = async (conn_provider, w_address, title, description, setQuorum, startDate, endDate) => {
  console.log("Final", conn_provider, w_address, title, description, setQuorum, startDate, endDate)
  let provider = detectCurrentProvider(conn_provider);

  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }

  if (provider) {
    const web3 = new Web3(provider);
    let quorumToWei = web3.utils.toWei(setQuorum.toString(), 'ether');

    let unixDate = new Date(endDate.toString()).valueOf();
    unixDate = unixDate.toString().substring(0, unixDate.toString().length - 3);

    let unixDate1 = new Date(startDate.toString()).valueOf();
    unixDate1 = unixDate1.toString().substring(0, unixDate1.toString().length - 3);
    console.log("unixDate1 and unixDate", unixDate1, unixDate)
    return await votingContract.methods.createProposal({
      title: title,
      description: description,
      setQuorum: quorumToWei,
      startDate: unixDate1,
      endDate: unixDate
    }).send({
      from: w_address
    })
  }
}

export const allProposalDetailsRead = async (conn_provider, _sort) => {
  console.log('allProposalDetailsRead');
  if (!isVotingInitialized) {
    console.log('start isVotingInitialized');
    await initiateVotingContract(conn_provider);
    console.log('end isVotingInitialized');
  }
  return await votingContract.methods.allProposalDetails(_sort)
    .call()
    .then((allPropDetails) => {
      let proposals = [];
      for (let i = 0; i < allPropDetails.length; i++) {
        let prop = {
          title: allPropDetails[i].ps.title,
          description: allPropDetails[i].ps.description,
          setQuorum: allPropDetails[i].ps.setQuorum,
          timestamp: allPropDetails[i].ps.timestamp * 1000,
          proposalId: allPropDetails[i].ps.proposalId,
          start_date: allPropDetails[i].ps.startDate * 1000,
          end_date: allPropDetails[i].ps.endDate * 1000,
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

export const balanceOfAmeToken = async (conn_provider, w_address) => {
  let provider = detectCurrentProvider(conn_provider);
  const web3 = new Web3(provider);
  if (!isTokenInitialized) {
    await initiateTokenContract(conn_provider)
  }
  return await tokenContract.methods.balanceOf(w_address)
    .call()
    .then((balOf) => {
      let balanceInEther = web3.utils.fromWei(balOf, 'ether');
      console.log(balanceInEther, "Balance of AME");
      return balanceInEther
    })
}

export const isUserVotedRead = async (conn_provider, voterAddress, proposal_id) => {
  console.log('voterAddress, proposal_id', voterAddress, proposal_id)
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.isUserVoted(voterAddress, proposal_id)
    .call()
    .then((isVoted) => {
      console.log(isVoted, "isUserVotedDetails")
      return isVoted
    })
}

export const balanceUpdate = async (provider) => {
  try {
    const currentProvider = detectCurrentProvider(provider);
    if (currentProvider) {
      await currentProvider.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();

      if (userAccount.length === 0) {
        return new Error('Please connect to Metamask');
      } else {
        const account = userAccount[0];
        let ameBalance = await web3.eth.getBalance(account); // Get wallet balance
        ameBalance = web3.utils.fromWei(ameBalance, 'ether'); //Convert balance to wei

        return ameBalance;
      }
    } else return new Error('Non-Ethereum browser detected. You should consider trying Metamask')
  } catch (err) {
    console.log(err);
    return new Error(
      'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
    );
  }
}

export const getForVotersDetailsRead = async (conn_provider, proposalId) => {
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.returnAllForVoteDetails(proposalId)
    .call()
    .then((forDetails) => {
      console.log("ForDetails", forDetails)
      return forDetails;
    })
    .catch((err) => {
      console.log("Error ForVoters", err);
    })
}

export const getAgainstVotersDetailsRead = async (conn_provider, proposalId) => {
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.returnAllAgainstVoteDetails(proposalId)
    .call()
    .then((againstDetails) => {
      console.log("AgainstDetails", againstDetails)
      return againstDetails;
    })
    .catch((err) => {
      console.log("Error AgainstVoters", err);
    })
}

export const getVotePercentageRead = async (conn_provider, proposalId) => {
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.VotePercentagePerProposal(proposalId)
  .call()
  .then((bothVotes) => {
    console.log("For/Against vote percentage", bothVotes)
    return bothVotes;
  })
  .catch((err) => {
    console.log("Error", err)
  })
}

export const quantityOfForVotes = async (conn_provider, proposalId) => {
  let provider = detectCurrentProvider(conn_provider);
  const web3 = new Web3(provider);
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.returnAllForVoteDetails(proposalId)
  .call()
  .then((forQuantityDetails) => {
    let forQuantity = [];
      for (let i = 0; i < forQuantityDetails.length; i++) {
        console.log('forQuantityDetails[i]._balance', forQuantityDetails[i]._balance)
        let bal = web3.utils.fromWei(forQuantityDetails[i]._balance, 'ether');
        console.log('bal', bal);
        let prop = {
          address: forQuantityDetails[i]._add,
          timestamp: forQuantityDetails[i]._timeStamp,
          balance: parseFloat(bal).toFixed(2)
          // forQuantityDetails[i]._balance,
        }
        forQuantity.push(prop);
      }
    console.log(forQuantity, "forQuantity--Status")
    return forQuantity;
  })
}


export const quantityOfAgainstVotes = async (conn_provider, proposal_id) => {
  let provider = detectCurrentProvider(conn_provider);
  const web3 = new Web3(provider);
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.returnAllAgainstVoteDetails(proposal_id)
  .call()
  .then((againstQuantityDetails) => {
    let againstQuantity = [];
      for (let i = 0; i < againstQuantityDetails.length; i++) {
        console.log('againstQuantityDetails[i]._balance', againstQuantityDetails[i]._balance)
        let bal = web3.utils.fromWei(againstQuantityDetails[i]._balance, 'ether');
        let prop = {
          address: againstQuantityDetails[i]._add,
          timestamp: againstQuantityDetails[i]._timeStamp,
          balance: parseFloat(bal).toFixed(2),
        }
        againstQuantity.push(prop);
      }
    console.log(againstQuantity, "forQuantity--Status")
    return againstQuantity;
  })
}

export const votesPercentageRead = async (conn_provider, proposalId) => {
  let provider = detectCurrentProvider(conn_provider);
  const web3 = new Web3(provider);
  if (!isVotingInitialized) {
    await initiateVotingContract(conn_provider)
  }
  return await votingContract.methods.VotePercentagePerProposal(proposalId)
  .call()
  .then((votesQuantityDetails) => {
        let votesQuantity = {
          forVotes: parseFloat(web3.utils.fromWei(votesQuantityDetails['forVotes'], 'ether')).toFixed(2),
          againstVotes: parseFloat(web3.utils.fromWei(votesQuantityDetails['againstVotes'], 'ether')).toFixed(2),
        }
    console.log('votesQuantity', votesQuantity);
    return votesQuantity;
  })
}