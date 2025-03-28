// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address who) external view returns (uint256);
    function decimals() external view returns (uint8);
}

contract HyperSwapRouter {
    address public owner;
    mapping(address => mapping(address => uint256)) public rates;

    event Swapped(address indexed from, address indexed to, uint256 amountIn, uint256 amountOut);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // 🧠 Set exchange rate: rate * 1e18 for precision
    function setRate(address tokenA, address tokenB, uint256 rate) external onlyOwner {
        rates[tokenA][tokenB] = rate;
    }

    // 📊 View expected output
    function getExpectedOutput(address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256) {
        uint256 rate = rates[tokenIn][tokenOut];
        require(rate > 0, "No rate set");
        return (amountIn * rate) / 1e18;
    }

    // 🔄 Execute swap
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 minOut,
        address[] calldata path,
        address recipient,
        uint deadline
    ) external returns (uint256 amountOut) {
        require(block.timestamp <= deadline, "Swap expired");
        require(path.length == 2, "Only direct pairs supported");

        address tokenIn = path[0];
        address tokenOut = path[1];
        uint256 rate = rates[tokenIn][tokenOut];
        require(rate > 0, "Rate not set");

        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        amountOut = (amountIn * rate) / 1e18;
        require(amountOut >= minOut, "Slippage exceeded");
        IERC20(tokenOut).transfer(recipient, amountOut);

        emit Swapped(tokenIn, tokenOut, amountIn, amountOut);
    }
}
