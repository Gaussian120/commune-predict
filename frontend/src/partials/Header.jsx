import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Modal from "antd/es/modal/Modal";
import { Button, Flex, Spin } from 'antd';
import { ApiPromise, WsProvider } from "@polkadot/api";
import MetaMaskImage from "../../public/svg/metamask.svg";
import PolkadotImage from "../../public/svg/subwallet.png";
import Phantom from "../../public/svg/phantom.png";

function Header({ sidebarOpen, setSidebarOpen }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [isShowAuthModalOpen, setIsShowAuthModalOpen] = useState(false)
  const [isShowSubstrateConnectModalOpen, setIsShowSubstrateConnectModalOpen] = useState(false)
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isShowSubstrateAuth, setIsShowSubstrateAuth] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(20);

  const [api, setApi] = useState(null);
  const [chainInfo, setChainInfo] = useState('');
  const [nodeName, setNodeName] = useState('');

  const handleAuthModal = () => {
    setIsShowAuthModalOpen(true)
  }

  const handleShowAuthModalCancel = () => {
    setIsShowAuthModalOpen(false);
  };

  const handleShowSubstrateModalCancel = () => {
    setIsShowSubstrateConnectModalOpen(false);
  };

  const responseMessage = () => {
    console.log('-----------------------This is the React component-------------------', response);
  };
  const errorMessage = () => {
    console.log('An error has occured')
  };

  const connectToSubstrate = async () => {
    const provider = new WsProvider('wss://rpc.polkadot.io');
    const substrateApi = await ApiPromise.create({ provider });
    setApi(substrateApi);
  }

  const getChainInfo = async () => {
    if (api) {
      const chain = await api.rpc.system.chain();
      setChainInfo(chain.toString())
      const nodeName = await api.rpc.system.name();
      setNodeName(nodeName.toString())
      console.log(`Connected to chain ${chain} using ${nodeName}`);
    }
  };

  useEffect(() => {
    getChainInfo()
  }, [api]);

  const getAccountBalance = async () => {
    try {
      const accountInfo = await api?.query.system.account(address);

      console.log('------------------where is the account Info---------', accountInfo)
      setIsLoggedIn(true)

    } catch (error) {
      console.error('Error getting account balance:', error);
    }
  };

  const handleLogin = async () => {
    // Perform login logic here
    // For example, check if the entered address is valid and proceed accordingly
    if (!api || !address) {
      window.alert('Substrate API not connected or address not provided');
      setIsShowSubstrateAuth(false)
      return;
    }

    // Fetch account balance as an example
    getAccountBalance();
    setIsShowSubstrateAuth(false)
  };

  const handleShowSubstrateAuth = () => {
    setIsShowSubstrateAuth(true)
  }




  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-slate-700 z-30 flex flex-row">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className=' mt-[20px] w-[80%] flex flex-row justify-end '>
        <div className='w-[30%] flex flex-row justify-between items-center'>
          <Link><div className='font-bold hover:text-slate-500'>Home</div></Link>
          <Link to={'https://www.dextools.io/app/en/ether/pair-explorer/0x4ced7fc553098cb5c23a9d8339bee8175efcb66e?t=1709284725218'} target="_blank" ><div className='font-bold  hover:text-slate-500'>Dextools</div></Link>
          <Button className="text-white" onClick={handleAuthModal} >Login</Button>
        </div>
      </div>
      {
        isShowAuthModalOpen &&
        <Modal open={isShowAuthModalOpen} onCancel={handleShowAuthModalCancel} footer={null} width={400} className="rounded" mask={true} >
          <div className='flex items-center justify-center ' >
            <span style={{ fontWeight: '500', alignItems: 'center', display: 'flex', fontSize: '2rem' }}>
              Login to Comsacnner
            </span>
          </div>
          <div className='flex items-center justify-evenly mt-14 mb-14 flex-col'>
            <div className='flex w-full items-center justify-evenly cursor-pointer'>
              <div className='flex items-center justify-center hover:bg-gray-300 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} >
                <img src={MetaMaskImage} alt='login with Metamask' width={50} height={50} className='cursor-pointer mb-1' />
                <button type="button">
                  Metamask
                </button>
              </div>
              <div className='flex items-center justify-center hover:bg-gray-300 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} >
                <img src={Phantom} alt='login with Metamask' width={50} height={50} className='cursor-pointer mb-1' />
                <button type="button">
                  Phantom
                </button>
              </div>
              <div className='flex items-center justify-center hover:bg-gray-300 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} >
                <img src={PolkadotImage} alt='login with Metamask' width={30} height={30} className='cursor-pointer mb-1' />
                <button type="button">
                  Polkadot
                </button>
              </div>
            </div>

            <div className="flex flex-col mt-4 hover:bg-gray-300 rounded-md w-[330px]" style={{ flexDirection: 'column', border: '1px solid gray' }}>
              {
                isShowSubstrateAuth ?
                  <>
                    <button onClick={connectToSubstrate} className="w-[80%] m-auto mt-2 bg-blue-400 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-500 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer">Connect to Substrate</button>
                    {
                      // chainInfo && nodeName &&
                      <div className="flex flex-col  justify-evenly mt-4">
                        <label className="ml-[10px] font-bold"> chainInfo &nbsp;&nbsp;:&nbsp; &nbsp; {chainInfo}</label>
                        <label className="ml-[10px] font-bold"> nodeName :&nbsp; &nbsp; {nodeName}</label>
                      </div>
                    }
                    <div className="flex flex-col">
                      <label>Enter Substrate Address:</label>
                      <input type="text" value={address} onChange={({ target: { value } }) => setAddress(value)} className="p-2" />
                    </div>
                    <button onClick={handleLogin} className="bg-blue-400 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-500 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer mt-2">Login</button>
                    {balance !== null && <p>Account Balance: {balance}</p>}
                  </>
                  :
                  <div className="flex flex-col items-center justify-center cursor-pointer h-[80.77px]" onClick={handleShowSubstrateAuth}>
                    <img style={{ width: "50px", height: "50px" }} src="/svg/polkadot.svg" alt="My Site Logo" className="mb-1" />
                    <span>Substrate</span>
                  </div>
              }


            </div>
          </div>
        </Modal>
      }
    </header>
  );
}


export default Header;
