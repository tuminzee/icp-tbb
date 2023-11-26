import React, { useState, useEffect } from "react";
import css from "./Mint.module.css";
import { useCanister } from "@connect2ic/react"
import { Principal } from "@dfinity/principal";

const NFT = () => {
  const [nft] = useCanister("nft");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [nftList, setNftList] = useState([]);
  // num
  const [tokensMinted, setTokensMinted] = useState(); // num
  // get
  const [tokenIdUrl, setTokenIdUrl] = useState(0);
  const [tokenUrl, setTokenUrl] = useState("");
  const [tokenIdOwner, setTokenIdOwner] = useState(0);
  const [tokenOwner, setTokenOwner] = useState("");
  // status
  const [isMinting, setIsMinting] = useState(false);

  async function getName() {
    await nft.name().then((res) => setName(res));
  }

  async function getSymbol() {
    await nft.symbol().then((res) => setSymbol(res));
  }

  const linkNetwork = "http://localhost:3000";

  async function getOwnerOf() {
    await nft.ownerOf(tokenIdOwner).then((owner) => setTokenOwner(owner));
  }

  // async function getTokenUrl() {
  //   await nft.tokenURI(tokenIdUrl).then((url) => setTokenUrl(url));
  // }

  async function getNumMinted() {
    await nft.totalSupply().then((numTokensMinted) => {
      setTokensMinted(parseInt(numTokensMinted.toString()));
    });
  }

  async function allTokenMetadata() {
    await nft.allTokenMetadata().then((list) => {
      setNftList(list.ok)
    });
  }

  async function mintNFT() {
    const arr = []
    const plugPrincipal = await window.ic.plug.agent.getPrincipal();
    const principalId = Principal.fromText(plugPrincipal.toString())
    // receivePayment()
    const newId = await nft.mint(principalId, tokensMinted, []);
    if (newId != null) {
      // nftOwned(principalId)
      totalSupply()
      // const newNFT = {
      //   minted_at: newId,
      //   minted_by: principalId, 
      //   operator: arr, 
      //   owner: principalId, 
      //   properties: arr, 
      //   token_identifier: newId, 
      //   transferred_at: arr, 
      //   transferred_by: arr}
      // setList([...nftList, newNFT])
    }
    console.log({
      newId,
      nftList
    })
  }

  // // get number of tokens minted
  // useEffect(async () => {
  //   if (nf) {
  //     getNumMinted();
  //   }
  // }, [nft]);

  useEffect(() => {
    console.log("nft", nft)
    if (!nft) {
      return
    }
    getNumMinted()
    getName()
    getSymbol()
    // getTokenUrl()
    allTokenMetadata()
  }, [nft])


  console.log(nftList)

  return (
    <div className="section">
      <h2>Collection info</h2>
      <div className={css.mint__info}>
        <button onClick={() => getName()}>Query collection name</button>
        <p>collection name: {name}</p>
        <button onClick={() => getSymbol()}>Query collection symbol</button>
        <p>collection symbol: {symbol}</p>
        <p>tokens minted: {tokensMinted}/11</p>
        <p>last minted token id is {tokensMinted}</p>
        <p>you are minting this svg:</p>
        {tokensMinted >= 0 && tokensMinted <= 11 ? (
          <img
            className={css.img}
            src={`http://localhost:3000/frontend/assets/${tokensMinted + 1}.png`}
            alt=""
          />
        ) : (
          <p>all nfts have been minted</p>
        )}
        <button onClick={() => mintNFT()}>{!isMinting ? "Mint" : "Minting..."}</button>

        {/* owner */}
        <div className={css.withInput}>
          <p>get owner of token id # </p>
          <input onChange={(e) => setTokenIdOwner(parseInt(e.target.value))} type="number" />
          <button onClick={() => getOwnerOf()}>Get</button>
        </div>
        <p>token owner: </p>
        <p>{tokenOwner}</p>

        {/* url */}
        {/* <div className={css.withInput}>
          <p>get url of token id # </p>
          <input onChange={(e) => setTokenIdUrl(parseInt(e.target.value))} type="number" />
          <button onClick={() => getTokenUrl()}>Get</button>
        </div> */}
        {/* <p>token url: </p>
        <p>{tokenUrl}</p> */}
        {/* {nftList && nftList.length && nftList.map((element) => {
          return <>{element}</>
        })} */}
      </div>
    </div>
  );
};

export {NFT}
