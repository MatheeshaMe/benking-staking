import "./App.css";
import Home from "./Pages/Home/Home";
import { useState, useEffect } from "react";
import Claim from "./Pages/Claim/Claim";
import { Routes, Route, useNavigate } from "react-router-dom";
import Stake from "./Pages/Stake/Stake";
import Unstake from "./Pages/Unstake/Unstake";

//blockchain
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

import RunningMan from "./abi/Collection.sol/RunningMan.json";
import RewardToken from "./abi/RewardToken.sol/Reward.json";
import StakeContract from "./abi/Stake.sol/NFTStaking.json";

import WLDRHorses from "./abi/WLDRNFT.json";
import WLDRToken from "./abi/WLDRToken.json";
import WLDRStaking from "./abi/WLDRStaking.json";

//wallet
const providerOptions = {
  binancechainwallet: {
    package: true,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "b96f71ee9b5b4ffca551daff9cb658a3",
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      appName: "NFT-staking",
      infuraId: "b96f71ee9b5b4ffca551daff9cb658a3",
      rpc: "",
      chainId: 4,
      appLogoUrl: null,
      darkMode: true,
    },
  },
};

//contract config
// const tokenAbi = RewardToken.abi;
// const collectionAbi = RunningMan.abi;
// const stakingAbi = StakeContract.abi;

const tokenAbi = WLDRToken.abi;
const collectionAbi = WLDRHorses.abi;
const stakingAbi = WLDRStaking.abi;
// const stakingContractad = "0x017ad80f2F4B0CA1D83f143D9a4e80a0AA0aE6aD";
// const collectionContractad = "0xA21F7a2b092fe1f31Dcd9224fb1EFaD18736d834";
// const rewardTokenContractad = "0x6F2F99f3C2C02AB774f3C2e7B3745C31e19Bd42C";

const stakingContractad = "0xf36ebb24B9948cab0eFb4EACD255f9b93Be9799B";
const collectionContractad = "0x4f39ebe194f3fb8939755db0c8e7c7a4f3120a73";
const rewardTokenContractad = "0xd2fcc2c88bc32a431961714D289059DFF116C335";

const openseaapi = "https://testnets-api.opensea.io/api/v1/assets";
// const etherScanApiKey = "UTGVN4WFF74Q2RWW1SF4MQV87HQD9Q6QZH";
// const endpoint = "https://api-rinkeby.etherscan.io/api";

const web3Modal = new Web3Modal({
  network: "rinkeby",
  theme: "dark",
  cacheProvider: true,
  providerOptions,
});

function App() {
  const navigate = useNavigate();

  const [claimValue, setClaimValue] = useState(10000);
  const [stakeId, setStakeId] = useState(null);
  const [unstakeId, setUnstakeId] = useState(null);
  const [stakes, setStake] = useState([]);
  const [unstakes, setUnstake] = useState([]);

  //blockchain

  const [account, setAccount] = useState("");
  const [tokenContract, setTokenContract] = useState(null);
  const [collectionContract, setcollectionContract] = useState(null);
  const [stakingContract, setstakingContract] = useState(null);
  const [earnings, setEarnings] = useState(0);
  const [balance, setBalance] = useState(0);
  const [nftData, setNftData] = useState([]);
  const [state, setState] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [nftAssets, setNftAssets] = useState([]);
  const [stakedIds, setStakedTokenIds] = useState([]);
  const [stakedNftsData, setStakedNftsData] = useState([]);

  async function connectwallet() {
    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    await provider.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const tokenContract = new web3.eth.Contract(
      tokenAbi,
      rewardTokenContractad
    );
    const collectionContract = new web3.eth.Contract(
      collectionAbi,
      collectionContractad
    );
    const stakingContract = new web3.eth.Contract(
      stakingAbi,
      stakingContractad
    );
    setTokenContract(tokenContract);
    setcollectionContract(collectionContract);
    setstakingContract(stakingContract);
    // await getTotalSupply();
    const totalSup = Number(
      await collectionContract.methods.totalSupply().call()
    );
  }

  async function setApprove() {
    if (!account) console.log("thissssssssssssssssssssssss");
    account &&
      (await collectionContract.methods
        .setApprovalForAll(stakingContractad, true)
        .send({ from: account }));
  }
  async function stake() {
    console.log("Stake getting called!");
    await setApprove();
    await stakingContract.methods.stake([stakeId]).send({ from: account });
  }

  async function unstake() {
    stakingContract.methods.unstake([unstakeId]).send({ from: account });
  }

  async function unstakeMany(unstakeArr) {
    stakingContract.methods.unstake(unstakeArr).send({ from: account });
  }

  async function earningInfo() {
    const earnings = await stakingContract.methods
      .earningInfo(account, stakedIds)
      .call();
    setEarnings(earnings);
    console.log(`earnings${earnings}`);
  }

  async function getStakedNfts() {
    const stakedTokenIds = await stakingContract.methods
      .tokensOfOwner(account)
      .call();
    console.log("stakedTokenIds==>", stakedTokenIds);
    setStakedTokenIds(stakedTokenIds);
  }
  const onClcikClaim = () => {
    console.log("on click claim");
  };
  async function claim() {
    console.log("claiming");
    console.log(unstakeId);
    const ids = await stakingContract.methods.tokensOfOwner(account).call();
    // unstakeId &&
    console.log(`claim Ids ${typeof ids}`);
    ids.length > 0 &&
      stakingContract.methods.claim([ids]).send({ from: account });
  }

  const getassets = async () => {
    await axios
      .get(
        openseaapi +
          `?asset_contract_addresses=${collectionContractad}&format=json&order_direction=asc&offset=0&limit=20`
      )
      .then((outputb) => {
        setNftData(outputb.data);
        console.log("nft data======>", outputb.data);
      });
  };
  useEffect(() => {
    getassets();
    stakingContract && getStakedNfts();
  }, [account]);

  useEffect(() => {
    if (nftData) {
      setStake(
        nftData.assets?.filter(
          (el) => el.owner.address === account.toLowerCase()
        )
      );
    }
  }, [nftData]);

  console.log("nft data for stake section===>", stakes);

  useEffect(() => {
    if (stakedIds && stakes) {
      console.log("stakedIds are here\n\n\n", stakedIds, "\nStakes", stakes);
      if (!collectionContract) console.log("no collection ocntract \n\n");
      if (collectionContract)
        console.log("collection ocntract \n\n", collectionContract);
      stakedIds.forEach((element) => {
        collectionContract &&
          axios
            .get(
              // `https://bafybeihkjkso5uohmem7ndin33vjhlc7qve33lehqeuerfkpidqwmlb3aa.ipfs.dweb.link/${element}.json`
              `https://opensea.mypinata.cloud/ipfs/bafybeic66oa474umvd7uwttkb4kqybmkrnicxjhnqi3vpuhg4qkf5vleha/${element}.json` //token metadata
            )
            .then((response) => {
              console.log("response,,,,===>", response);
              setUnstake((pre) => {
                console.log("this is pre in useEffect hook", pre);
                console.log("this is data in useEffect hook", response.data);
                return [...pre, response.data];
              });
            });
      });
    } else {
      console.log("No staked ids or stakes\n\n\n");
    }
  }, [stakedIds, account]);

  console.log("staked nfts data for unstake section===>", unstakes); //stakedNftsData

  useEffect(() => {
    // default navigation to home page
    if (!account) {
      navigate("/");
    }
  }, [account, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Home connectwallet={connectwallet} account={account} />}
        />

        <Route
          path="/stake"
          element={
            <Stake
              stakeId={stakeId} // selected stake card id
              setStakeId={setStakeId}
              stake={stake} // onClick stake button in the card
              stakes={stakes} // stake data array ( cards )
              account={account}
            />
          }
        />

        <Route
          path="/unstake"
          element={
            <Unstake
              unstakeId={unstakeId} // selected unstake card id
              setUnstakeId={setUnstakeId}
              unstake={unstake} // onClick unstake button in the card
              unstakes={unstakes} // unstake data array ( cards )
              account={account}
              unstakeMany={unstakeMany}
            />
          }
        />

        <Route
          path="/claim"
          element={
            <Claim
              onClcikClaim={onClcikClaim}
              claimValue={claimValue}
              earnings={earnings}
              earningInfo={earningInfo}
              claim={claim}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
