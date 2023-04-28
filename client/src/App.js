import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Nav from "./Components/Nav";
import upload from "./artifacts/contracts/upload.sol/upload.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Display from "./Components/Display";
import ModalComp from "./Components/ModalComp";
import { Toaster, toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import NotConnected from "./Components/NotConnected";



function App() {
  const { ethereum } = window;
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [images, setImages] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [list, setList ] = useState([]);

  const { address } = useAccount({
    onConnect: (address) => {
      toast.success("Wallet Connected!");
      setAccount(address);
      console.log("address is", address.address);
      DisplayImages(address.address);
    },
    onDisconnect: () => {
      toast.success("Logged Out Successfully!");
    },
  });

  const UploadFile = async (_IPFShash) => {
    const signer = contract.connect(provider.getSigner());
    const receipt = await signer.add(address, _IPFShash);
    console.log(receipt);
    const tx = await receipt.wait();

    console.log("Added", tx);
    toast.success("File Uploaded Successfully!");
  };

  const DisplayImages = async () => {
    const signer = contract.connect(provider.getSigner());
    const images = await signer.display(address);
    setImages(images);
    console.log(images);
  };

  const allow = async (address) =>{
    const signer = contract.connect(provider.getSigner());
    const add = await signer.allow(address);
    toast.success("Shared Access");
  }

  const fetch = async() =>{
    const signer = contract.connect(provider.getSigner());
    const list = await signer.shareAccess();
    setList(list);
    toast.success("List Fetched!")
    // console.log(list);
  }

  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = "0xA3C843304113F62ce64a6332115ECe891a6c90fc";
      try {
        if (ethereum) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            upload.abi,
            signer
          );
          setContract(contract);
          setProvider(provider);
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadProvider();
  }, []);

  
  
  return (
    <div>      
      <Nav />
  
      <Toaster position="top-right" />
      {address ? (<>
       { !modalOpen && (<button
        data-modal-target="staticModal"
        data-modal-toggle="staticModal"
        className="drop-shadow-lg block ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 px-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-12"
        type="button"
        onClick={() =>{ 
          setModalOpen(true);
        }}
      >
        Share Access
      </button>)}
      
        <Display
          UploadFile={UploadFile}
          Images={images}
          account={account}
          contract={contract}
        />
        </>
      ) : (
        <NotConnected />
      )}
      
       {modalOpen && <ModalComp setModalOpen={setModalOpen} allow={allow} fetch={fetch} list={list}/>}
    </div>
  );
}

export default App;
