# Pokémon Battle SmartContract App with Chainlink Functions

Leverage the power of Chainlink Functions to battle Pokémon on the blockchain. This application allows users to select two Pokémon and initiate a battle via smart contracts.

## Table of Contents

- [Overview](#overview)
- [Objective](#objective)
- [Prerequisites](#prerequisites)
- [Setup & Deployment](#setup--deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

In this application, users select their favorite Pokémon to go head-to-head in a blockchain battle, with outcomes determined by Chainlink Functions.

## Objective

To showcase the integration of Chainlink Functions in a gaming scenario where Pokémon engage in battles on the Ethereum blockchain.

## Prerequisites

- Familiarity with Ethereum and smart contracts.
- MetaMask or another Ethereum wallet.
- Ethereum (for gas fees) and test LINK tokens for Chainlink functions.

## Setup & Deployment

1. **Clone the Repository**

    ```bash
    git clone https://github.com/[your-github-username]/pokemon-battle-smartcontract.git
    cd pokemon-battle-smartcontract
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set up Environment Variables**

    Create a `.env` file in the root directory and add the necessary configurations.

    ```plaintext
    PRIVATE_KEY=Your_Ethereum_Wallet_Private_Key
    INFURA_API_KEY=Your_Infura_Key
    CHAINLINK_NODE_URL=Your_Chainlink_Node_URL
    ```

4. **Deploy the SmartContract**

    ```bash
    truffle migrate --network [desired-network]
    ```

    Remember to replace `[desired-network]` with the network you want to deploy to (e.g., `rinkeby`, `kovan`, `mainnet`).

5. **Run the App Locally**

    ```bash
    npm start
    ```

    This will launch the app on your local server, usually at `http://localhost:3000/`.

## Usage

1. Visit the deployed web app.
2. Connect your Ethereum wallet (e.g., MetaMask).
3. Select two Pokémon from the provided list.
4. Click on the 'Battle on SmartContract' button.
5. Approve the transaction in your Ethereum wallet.
6. Watch as Chainlink Functions determine the battle outcome and display it on the app.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/[your-github-username]/pokemon-battle-smartcontract/issues) if you want to contribute.

## License

Distributed under the MIT License. See `LICENSE` for more information.
