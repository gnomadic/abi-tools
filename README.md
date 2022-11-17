# abitools

When writing client applications for smart contracts it's useful to be able to aggregate all the necessary details out of the ABI.  ABIs have a ton of information, and usually we just care about events, functions, and their parameters.  This library provides a simple interface for extracting that information.


This is built to work with Foundry - poorly - but it works.

## Installation

```sh
npm install --save-dev abi-tools
```

## Usage
    
```sh
➜ cd <into root of current forge project, with forge.toml>
➜ forge build
➜  abitools
? Please choose which job to use (Use arrow keys)
❯ log 
  codegen 
  ```


>> Important: currently only LOG is supported.


you can also just run: 
```sh
abitools log
```

### Options

    coming soon, maybe, got some started but realistically this is a one-off tool for now.

### Example Output

There is color-coding in the console that doesn't show up here.
```sh
------------------------------------------------------
Logging events and functions for: TestToken
------------------------------------------------------
Events:
        Approval(address, address, uint256)
        Transfer(address, address, uint256)
Functions:
        allowance(address, address)
        approve(address, uint256)
        balanceOf(address)
        decimals()
        decreaseAllowance(address, uint256)
        increaseAllowance(address, uint256)
        name()
        symbol()
        totalSupply()
        transfer(address, uint256)
        transferFrom(address, address, uint256)
```

## Description

this CLI will load up your forge.toml to grab your `src` and `out` directory locations.  It will iterate through all files in the src folder, and then grab the abis out of the `out` location.

From this, it will extract all the `events` and `functions` out of the different contracts, and then the toolstack can do stuff with that information.