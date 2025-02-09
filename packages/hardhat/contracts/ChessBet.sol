// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ChessBet is ReentrancyGuard {
    IERC20 public immutable token;
    
    struct Game {
        address player1;
        address player2;
        uint256 betAmount;
        string lichessGameId;
        bool isComplete;
        address winner;
    }

    mapping(string => Game) public games; // lichessGameId => Game
    mapping(address => string[]) public playerGames; // player address => their game IDs

    event GameCreated(string lichessGameId, address player1, uint256 betAmount);
    event GameJoined(string lichessGameId, address player2);
    event GameComplete(string lichessGameId, address winner, uint256 prizeAmount);

    constructor(address _token) {
        token = IERC20(_token);
    }

    function createGame(string memory lichessGameId, uint256 betAmount) external nonReentrant {
        require(betAmount > 0, "Bet amount must be greater than 0");
        require(games[lichessGameId].player1 == address(0), "Game already exists");
        
        // Transfer tokens from player to contract
        require(token.transferFrom(msg.sender, address(this), betAmount), "Transfer failed");
        
        games[lichessGameId] = Game({
            player1: msg.sender,
            player2: address(0),
            betAmount: betAmount,
            lichessGameId: lichessGameId,
            isComplete: false,
            winner: address(0)
        });

        playerGames[msg.sender].push(lichessGameId);
        emit GameCreated(lichessGameId, msg.sender, betAmount);
    }

    function joinGame(string memory lichessGameId) external nonReentrant {
        Game storage game = games[lichessGameId];
        require(game.player1 != address(0), "Game does not exist");
        require(game.player2 == address(0), "Game already has two players");
        require(game.player1 != msg.sender, "Cannot join your own game");
        
        // Transfer tokens from player2 to contract
        require(token.transferFrom(msg.sender, address(this), game.betAmount), "Transfer failed");
        
        game.player2 = msg.sender;
        playerGames[msg.sender].push(lichessGameId);
        emit GameJoined(lichessGameId, msg.sender);
    }

    function completeGame(string memory lichessGameId, address winner) external nonReentrant {
        Game storage game = games[lichessGameId];
        require(!game.isComplete, "Game already complete");
        require(game.player1 != address(0) && game.player2 != address(0), "Game not ready");
        require(winner == game.player1 || winner == game.player2, "Invalid winner");
        
        game.isComplete = true;
        game.winner = winner;
        
        // Transfer total prize to winner
        uint256 totalPrize = game.betAmount * 2;
        require(token.transfer(winner, totalPrize), "Prize transfer failed");
        
        emit GameComplete(lichessGameId, winner, totalPrize);
    }

    function getGame(string memory lichessGameId) external view returns (Game memory) {
        return games[lichessGameId];
    }

    function getPlayerGames(address player) external view returns (string[] memory) {
        return playerGames[player];
    }
} 