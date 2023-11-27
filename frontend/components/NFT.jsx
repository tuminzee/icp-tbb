import React, { useState, useEffect } from "react";
import { useCanister } from "@connect2ic/react"
import { Principal } from "@dfinity/principal";

const NFT = () => {
  const [nft] = useCanister("nft");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [nftList, setNftList] = useState([]);
  // num
  const [tokensMinted, setTokensMinted] = useState(); // num
  const [tokenIdOwner, setTokenIdOwner] = useState(0);
  // status
  const [isMinting, setIsMinting] = useState(false);

  async function getName() {
    await nft.name().then((res) => setName(res));
  }

  async function getSymbol() {
    await nft.symbol().then((res) => setSymbol(res));
  }

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

    setIsMinting(true);

    const arr = []
    const plugPrincipal = await window.ic.plug.agent.getPrincipal();
    const principalId = Principal.fromText(plugPrincipal.toString())
    const newId = await nft.mint(principalId, tokensMinted, []);
    setIsMinting(false);
    getNumMinted()

  }


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
  }, [nft, isMinting])

  return (
    <div className="section">
      {/* <button onClick={() => getName()}>Query collection name</button> */}
      <h1>Collection name: {name}</h1>
      {/* <button onClick={() => getSymbol()}>Query collection symbol</button> */}
      <h1>Collection symbol: {symbol}</h1>
      <h1>Tokens minted: {tokensMinted}/18</h1>
      <h1>Last minted token id is {tokensMinted}</h1>
      <h1>You are minting this nft:</h1>
      {tokensMinted >= 0 && tokensMinted <= 18 ? (
        <img
          src={`https://a6iv4-kaaaa-aaaak-qctuq-cai.icp0.io/${tokensMinted + 1}.png`}
          alt="nft"
          height={200}
          width={200}
        />
      ) : (
        <p>all nfts have been minted</p>
      )}
      <button onClick={() => mintNFT()}>{!isMinting ? "Mint" : "Minting..."}</button>
    </div>
  );
};

export { NFT }
