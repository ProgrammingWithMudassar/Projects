import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { ethers } from 'ethers';
import contractABI from './SpheraKitBag1.json'
import Web3 from 'web3';
import './App.css';

function App() {
  const [web, setWeb3 ] = useState(0);

  // Set up the provider and contract
  const web3 = new Web3(window.ethereum);
  setWeb3(web3);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const provider = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/123abc456def789ghi012jkl');
  const contractAddress = '0x1234567890123456789012345678901234567890'; I
  const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

  // Example function to interact with the contract
  const openPeriod = async () => {
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    try {
      const tx = await contractWithSigner.openPeriod(1);
      await tx.wait();
      console.log('Period opened successfully');
    } catch (error) {
      console.error('Error opening period:', error);
    }
  };

  return (
    <>
      <p className='text-[50px] font-bold bg-red-500'>This is Tailwind integration</p>
      <button onClick={openPeriod}>Open Period</button>
    </>
  );
}

export default App;
