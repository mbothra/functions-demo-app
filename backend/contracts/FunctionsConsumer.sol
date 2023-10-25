// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

/**
 * @title Chainlink Functions example on-demand consumer contract example
 */
contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
  using FunctionsRequest for FunctionsRequest.Request;

  bytes32 public donId; // DON ID for the Functions DON to which the requests are sent

  bytes32 public s_lastRequestId;
  bytes public s_lastResponse;
  bytes public s_lastError;
  string public requestSource;
  struct Pokemon {
      uint a;
      uint d;
      uint h;
      uint sa;
      uint sd;
      uint s;
  }

  event DataReceived(bytes32 requestId, bytes response, bytes error);

  constructor(address router, bytes32 _donId) FunctionsClient(router) ConfirmedOwner(msg.sender) {
    donId = _donId;
  }

  /**
   * @notice Set the DON ID
   * @param newDonId New DON ID
   */
  function setDonId(bytes32 newDonId) external onlyOwner {
    donId = newDonId;
  }

    function setSource(
        string calldata source
    ) public onlyOwner {
        requestSource = source;
    }

  /**
   * @notice Triggers an on-demand Functions request using remote encrypted secrets
   * @param source JavaScript source code
   * @param secretsLocation Location of secrets (only Location.Remote & Location.DONHosted are supported)
   * @param encryptedSecretsReference Reference pointing to encrypted secrets
   * @param args String arguments passed into the source code and accessible via the global variable `args`
   * @param bytesArgs Bytes arguments passed into the source code and accessible via the global variable `bytesArgs` as hex strings
   * @param subscriptionId Subscription ID used to pay for request (FunctionsConsumer contract address must first be added to the subscription)
   * @param callbackGasLimit Maximum amount of gas used to call the inherited `handleOracleFulfillment` method
   */
  function sendRequest(
    string calldata source,
    FunctionsRequest.Location secretsLocation,
    bytes calldata encryptedSecretsReference,
    string[] calldata args,
    bytes[] calldata bytesArgs,
    uint64 subscriptionId,
    uint32 callbackGasLimit
  ) external onlyOwner {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, requestSource);
    req.secretsLocation = secretsLocation;
    req.encryptedSecretsReference = encryptedSecretsReference;
    if (args.length > 0) {
      req.setArgs(args);
    }
    if (bytesArgs.length > 0) {
      req.setBytesArgs(bytesArgs);
    }
    s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, callbackGasLimit, donId);
  }

  /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    s_lastResponse = response;
    s_lastError = err;
    emit DataReceived(requestId, response, err);
  }

  function battle(
      Pokemon memory pokemon1,
      Pokemon memory pokemon2
  ) public pure returns (string memory) {

      uint totalStatsPokemon1 = pokemon1.a + pokemon1.d + pokemon1.h +
                                  pokemon1.sa + pokemon1.sd + pokemon1.s;

      uint totalStatsPokemon2 = pokemon2.a + pokemon2.d + pokemon2.h +
                                  pokemon2.sa + pokemon2.sd + pokemon2.s;

      if (totalStatsPokemon1 > totalStatsPokemon2) {
          return "Pokemon 1 Won!";
      } else if (totalStatsPokemon1 < totalStatsPokemon2) {
          return "Pokemon 2 Won!";
      } else {
          return "It's a Tie!";
      }
  }

  function sendRequestNew(
    string calldata source,
    string[] calldata args,
    uint64 subscriptionId
  ) external onlyOwner {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, requestSource);
    if (args.length > 0) {
      req.setArgs(args);
    }
    s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, 100_000, donId);
  }
}
