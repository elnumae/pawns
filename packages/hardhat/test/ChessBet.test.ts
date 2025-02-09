import { expect } from "chai";
import { ethers } from "hardhat";
import { ChessBet, MockERC20 } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ChessBet", function () {
  let chessBet: ChessBet;
  let mockToken: MockERC20;
  let owner: SignerWithAddress;
  let player1: SignerWithAddress;
  let player2: SignerWithAddress;

  beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners();

    // Deploy mock token
    const MockToken = await ethers.getContractFactory("MockERC20");
    mockToken = await MockToken.deploy("Mock Token", "MTK", ethers.utils.parseEther("1000000"));
    await mockToken.deployed();

    // Deploy ChessBet
    const ChessBet = await ethers.getContractFactory("ChessBet");
    chessBet = await ChessBet.deploy(mockToken.address);
    await chessBet.deployed();

    // Give tokens to players
    await mockToken.mint(player1.address, ethers.utils.parseEther("1000"));
    await mockToken.mint(player2.address, ethers.utils.parseEther("1000"));
    
    // Approve ChessBet contract to spend tokens
    await mockToken.connect(player1).approve(chessBet.address, ethers.utils.parseEther("1000"));
    await mockToken.connect(player2).approve(chessBet.address, ethers.utils.parseEther("1000"));
  });

  it("Should create a game with bet", async function () {
    const betAmount = ethers.utils.parseEther("10");
    const gameId = "test-game-1";

    await expect(chessBet.connect(player1).createGame(gameId, betAmount))
      .to.emit(chessBet, "GameCreated")
      .withArgs(gameId, player1.address, betAmount);

    const game = await chessBet.getGame(gameId);
    expect(game.player1).to.equal(player1.address);
    expect(game.betAmount).to.equal(betAmount);
  });

  it("Should allow player2 to join game", async function () {
    const betAmount = ethers.utils.parseEther("10");
    const gameId = "test-game-2";

    await chessBet.connect(player1).createGame(gameId, betAmount);

    await expect(chessBet.connect(player2).joinGame(gameId))
      .to.emit(chessBet, "GameJoined")
      .withArgs(gameId, player2.address);

    const game = await chessBet.getGame(gameId);
    expect(game.player2).to.equal(player2.address);
  });

  it("Should complete game and transfer prize to winner", async function () {
    const betAmount = ethers.utils.parseEther("10");
    const gameId = "test-game-3";

    await chessBet.connect(player1).createGame(gameId, betAmount);
    await chessBet.connect(player2).joinGame(gameId);

    const initialBalance = await mockToken.balanceOf(player1.address);
    
    await expect(chessBet.completeGame(gameId, player1.address))
      .to.emit(chessBet, "GameComplete")
      .withArgs(gameId, player1.address, betAmount.mul(2));

    const finalBalance = await mockToken.balanceOf(player1.address);
    expect(finalBalance.sub(initialBalance)).to.equal(betAmount.mul(2));
  });
}); 