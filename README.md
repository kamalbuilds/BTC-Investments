# OneClickBTCInvestments 🚀

> *Democratizing Bitcoin Asset Investments through Smart Risk Management"*

## Problem Statement
- High gas fees and complex transaction processes on Bitcoin's native chain discourage retail investors from investing in Runes & BRC-20s.
- Limited accessibility to diversified Bitcoin asset portfolios
- Complex bridging mechanisms between Bitcoin and Layer 2 solutions.
- Lack of risk-adjusted investment options for different investor profiles
- High barrier to entry for new users wanting to invest in Bitcoin assets

## Solution

OneClickBTCInvestments simplifies Bitcoin asset investments through smart basket technology and seamless cross-chain integration. We leverage Layer 2 solutions (Rootstock & BOB) and implement ERC-7621 standard to create risk-adjusted, diversified portfolios of Bitcoin assets.

## Features
- **Risk-Categorized Investments**
  - Degen (High Risk/High Reward)
  - Moderate (Balanced)
  - Conservative (Low Risk/Stable)
  
- **Smart Basket Technology**
  - ERC-7621 compliant token baskets
  - Automated weight rebalancing
  - Customizable portfolio allocation
  
- **Cross-Chain Integration**
  - Seamless Bitcoin ↔ Rootstock bridging
  - Bitcoin ↔ BOB Chain integration
  - tBTC v2 integration for trustless bridging
  
- **User-Friendly Interface**
  - One-click investment process
  - Telegram bot integration
  - Real-time portfolio tracking

## Benefits 💪

1. For Users
  - Simplified investment process
  - Risk-adjusted returns
  - Lower transaction costs
Diversified exposure to Bitcoin assets

2. For Ecosystem
  - Increased L2 liquidity
  - Greater adoption of Bitcoin assets
  - Enhanced cross-chain interoperability

## Architecture

<img width="577" alt="Screenshot 2024-11-12 at 11 25 51 AM" src="https://github.com/user-attachments/assets/fac260d9-4f19-4414-9c0e-d9d19cb35647">


### Key Components:

1. **Smart Basket Controller**
   - Manages basket creation and rebalancing
   - Implements risk assessment algorithms
   - Handles weight distributions
   
```61:70:frontend/app/api/swapBob/route.ts
    const quoteParams: GatewayQuoteParams = {
      fromChain: "Bitcoin",
      fromToken: "BTC",
      fromUserAddress: "tb1qrpdxac4tx7atld37stgmt3ywfjk76efd9050rl",
      toChain: "bob-sepolia",
      toUserAddress: "0xCCBb7511D2b13939b86C2C784eA86ef17B927d76",
      toToken: "0x6744babdf02dcf578ea173a9f0637771a9e1c4d0",
      amount: 100, // 0.001 BTC
      gasRefill: 1000,
    }
```


2. **ERC-7621 Implementation**
   - Basket token standard
   - LP token management
   - Weight adjustments
   
```12:96:runes-basket-contracts/BasketTokenStandard/contracts/BTS.sol
contract BasketTokenStandard is ERC721URIStorageUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    uint private _autoRebalanceTime;

    address public btsPair;
    address public owner;
    address public factory;
    bool public autoRebalanceEnabled;
    uint256 public upperLimit;
    uint256 public lowerLimit;
    string description;

    mapping(address => bool) private _isTokenPresent;

    struct TokenDetails {
        address[] tokens;
        uint[] weights;
    }

    TokenDetails private _tokenDetails;

    modifier checkLength(uint lengthOne, uint lengthTwo) {
        if (lengthOne != lengthTwo) revert InvalidLength();
        _;
    }

    modifier onlyOwner() {
        if (ownerOf(0) != msg.sender) revert InvalidOwner();
        _;
    }

    event ContributedToBTS(address bts, address sender, uint amount);
    event WithdrawnFromBTS(
        address bts,
        address sender,
        address[] tokens,
        uint[] amounts
    );
    event WithdrawnETHFromBTS(address bts, address sender, uint amount);
    event RebalanceBTS(
        address bts,
        address[] tokens,
        uint[] oldWeights,
        uint[] newWeights
    );
    event UpdatedUpperLimit(uint indexed upperLimit);
    event UpdatedLowerLimit(uint indexed lowerLimit);
    event UpdatedAutoRebalanceEnabled(bool _autoRebalanceEnabled);

    function initialize(
        string memory _name,
        string memory _symbol,
        address _owner,
        address _factory,
        address[] memory _tokens,
        uint[] memory _weights,
        address _btsPair,
        string memory _tokenURI,
        bool _enableAutoRebalance,
        string memory _description
    ) external checkLength(_tokens.length, _weights.length) initializer {
        __ERC721_init(_name, _symbol);

        owner = _owner;
        factory = _factory;

        _checkValidTokensAndWeights(_tokens, _weights);

        btsPair = _btsPair;

        _tokenDetails.tokens = _tokens;
        _tokenDetails.weights = _weights;

        autoRebalanceEnabled = _enableAutoRebalance;

        _autoRebalanceTime = block.timestamp;

        description = _description;
        upperLimit = 10500;
        lowerLimit = 9500;

        _mint(_owner, 0);
        _setTokenURI(0, _tokenURI);
    }
```


3. **Cross-Chain Bridge Integration**

  - BOB Gateway for Bitcoin → BOB chain transfers
  - Threshold BTC for trustless Bitcoin → Ethereum bridges
  - Custom bridge interfaces for Rootstock integration

4. **Portfolio Management**
   - Automated rebalancing
   - Risk assessment
   - Performance tracking
   
```119:151:runes-basket-contracts/BasketTokenStandardPair/contracts/tokens/BTSPair.sol

    function calculateShareETH(
        uint _amountLP
    ) public view returns (uint amountETH) {
        for (uint i = 0; i < reserves.length; ) {
            amountETH += Helper.getAmountsOut(
                (_amountLP *
                    IERC20Upgradeable(tokens[i]).balanceOf(address(this))) /
                    totalSupply(),
                Helper.getPath(tokens[i], Constants.WETH)
            );

            unchecked {
                ++i;
            }
        }
    }

    function calculateShareTokens(
        uint _amountLP
    ) public view returns (uint[] memory amountTokens) {
        amountTokens = new uint[](tokens.length);
        for (uint i = 0; i < reserves.length; ) {
            amountTokens[i] =
                (_amountLP *
                    IERC20Upgradeable(tokens[i]).balanceOf(address(this))) /
                totalSupply();

            unchecked {
                ++i;
            }
        }
    }
```


## How It Works

1. **User Investment Flow**
   - Connect wallet
   - Select risk category
   - Choose investment amount
   - Receive LP tokens representing basket share

2. **Behind the Scenes**
   - Smart contract validates investment
   - Assets are bridged using BOB Gateway/tBTC
   - ERC-7621 contracts create basket tokens
   - Automatic weight distribution based on risk profile

3. **Portfolio Management**
   - Regular rebalancing checks
   - APR calculations
   - Risk assessment updates through telegram bot
   - Real-time performance monitoring

## Technical Implementation

The system leverages several key technologies:

- **Smart Contracts**: ERC-7621 implementation for basket management
- **Bridges**: BOB Gateway and tBTC v2 for cross-chain transactions
- **Risk Assessment**: Proprietary algorithms for portfolio optimization
- **Frontend**: React-based interface with Web3 integration
- **Monitoring**: Telegram bot integration for real-time updates

## Future Roadmap

- Mobile app development
- Additional L2 integrations
- Advanced portfolio analytics
- DAO governance implementation
- Automated investment strategies

## Contributing

We welcome contributions! Please check our contribution guidelines and feel free to submit pull requests.

## License

MIT License

This project aims to bridge the gap between traditional Bitcoin holders and the emerging world of Bitcoin assets, making investments more accessible, secure, and user-friendly.
