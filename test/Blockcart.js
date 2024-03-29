const { expect } = require("chai")
const exp = require("constants")
const { ethers } = require("hardhat")
const { func } = require("prop-types")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg"
const COST = tokens(1)
const RATING = 4
const STOCK = 5

describe("Blockcart", () => {

  let blockcart
  let deployer, buyer
  beforeEach(async ()=>{
    [deployer, buyer] = await ethers.getSigners()

    const Blockcart = await ethers.getContractFactory("Blockcart")
    blockcart = await Blockcart.deploy();
  })

  describe('Deployment', () => {
    it("sets the owner", async ()=>{
      expect(await blockcart.owner()).to.equal(deployer.address)
    })
  })

  describe('Listing', () => {
    let transaction
    beforeEach(async ()=>{
      transaction = await blockcart.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait();
    })
    it("Return items", async ()=>{
      const item = await blockcart.items(ID)

      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })
    it("Emits List event", () => {
      expect(transaction).to.emit(blockcart, "List")
    })
  })
  
})
