// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;
contract ChessBet{
    address public player1; /// ethereum address for p1
    address public player2; /// ethereum address for p2
    address public winner;
    uint256 public betAmount; /// publically displays betting amount
    bool public gameStarted;
    bool public gameFinished;
    address randomReward;

    event GameCreated(address player1, address player2, uint256 betAmount);
    event PlayerMatched(address player1, address player2);
    event WinnerDeclared(address winner, uint256 prize);
    event BetPlaced(address indexed player, uint256 betAmount);


    /// Initial Game States
    constructor() {
        gameStarted = false;
        gameFinished = false;

    }

function register_game() external payable {
    if (player1 == address(0)) {
        /// Register Player 1
        player1 = msg.sender;



        emit GameCreated(player1, address(0), betAmount);
    } 
    else if (player2 == address(0)) {
        /// Register Player 2
        require(msg.sender !=player1);
        player2 = msg.sender;

        gameStarted = true;
        emit PlayerMatched(player1, player2);
    } 
    else {
        revert("Game already has two players.");
    }}

    function declare_winner (address _winner) external {
        require(gameStarted, "Game has not begun");
        require(!gameFinished, "Game is finished");
        require(_winner == player1 || _winner == player2, "Winner must be a valid player");

        gameFinished = true;
        winner = _winner; /// _winner is the winner based on the react app
        uint256 prize = address(this).balance;

        (bool success, ) = payable(winner).call{value: prize}("");
        require(success, "Transfer failed");

        emit WinnerDeclared(winner, prize);
    
    
     
    }

    function place_bet() external payable {
    require(msg.sender == player1 || msg.sender == player2, "Only registered players can place a bet");
    
    // If Player 1 has placed their bet, Player 2 must match it
    if (msg.sender == player1) {
        require(betAmount == 0 || msg.value == betAmount, "Player 1 must match the previous bet if placing a bet");
        betAmount = msg.value; // Store bet amount from Player 1
    } else if (msg.sender == player2) {
        require(msg.value == betAmount, "Player 2 must match Player 1's bet");
    }

    emit BetPlaced(msg.sender, msg.value);
}


    
        

    }