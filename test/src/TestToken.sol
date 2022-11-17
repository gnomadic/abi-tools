// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @custom:security-contact contracts@metricsdao.com
contract TestToken is ERC20 {
    constructor() ERC20("TEST", "TEST") {
        _mint(_msgSender(), 1000000000 * 10**decimals());
    }
}
