import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
// import Product from './components/Product'

// ABIs
import Blockcart from './abis/Blockcart.json'

// Config
// import config from './config.json'

function App() {

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [blockcart, setBlockcart] = useState(null)
  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)
    toggle ? setToggle(false) : setToggle(true)
  }

  console.log(provider, blockcart, item)

  const BlockChainData = async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork() 
    console.log(network)
    const blockcart = new ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3", Blockcart, provider)
    setBlockcart(blockcart)
    const items = []
    for (var i = 0; i < 9; i++) {
      const item = await blockcart.items(i + 1)
      items.push(item)
    }
    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')
    console.log("ELECTRONICS: ");
    console.log(electronics)
    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }
  useEffect(()=>{
    BlockChainData();
  },[])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount}></Navigation>
      <h2>Welcome to Blockcart</h2>
      {electronics && clothing && toys && (
        <>
          <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop} />
          <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop} />
          <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
        </>
      )}
    </div>
  );
}

export default App;
