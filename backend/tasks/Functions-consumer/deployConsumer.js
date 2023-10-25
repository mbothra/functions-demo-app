const { types } = require("hardhat/config")
const { networks } = require("../../networks")
const { setRequest } = require("./setRequest")
const { SubscriptionManager } = require("@chainlink/functions-toolkit")

task("functions-deploy-consumer", "Deploys the FunctionsConsumer contract")
  .addOptionalParam("verify", "Set to true to verify contract", false, types.boolean)
  .addParam("subid", "Billing subscription ID used to pay for Functions requests")
  .addOptionalParam(
    "gaslimit",
    "Maximum amount of gas that can be used to call fulfillRequest in the client contract",
    250000,
    types.int
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying FunctionsConsumer contract to ${network.name}`)
    const signer = await ethers.getSigner()
    const linkTokenAddress = networks[network.name]["linkToken"]
    const functionsRouterAddress = networks[network.name]["functionsRouter"]
    const txOptions = { confirmations: networks[network.name].confirmations }

    const functionsRouter = networks[network.name]["functionsRouter"]
    const donIdBytes32 = hre.ethers.utils.formatBytes32String(networks[network.name]["donId"])
    const subManager = new SubscriptionManager({ signer, linkTokenAddress, functionsRouterAddress })
    await subManager.initialize()

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const overrides = {}
    // If specified, use the gas price from the network config instead of Ethers estimated price
    if (networks[network.name].gasPrice) {
      overrides.gasPrice = networks[network.name].gasPrice
    }
    // If specified, use the nonce from the network config instead of automatically calculating it
    if (networks[network.name].nonce) {
      overrides.nonce = networks[network.name].nonce
    }

    const consumerContractFactory = await ethers.getContractFactory("FunctionsConsumer")
    const consumerContract = await consumerContractFactory.deploy(functionsRouter, donIdBytes32, overrides)

    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${
        consumerContract.deployTransaction.hash
      } to be confirmed...`
    )
    await consumerContract.deployTransaction.wait(networks[network.name].confirmations)
    const consumerAddress = consumerContract.address
    const subscriptionId = taskArgs.subid

    console.log(`\nAdding ${consumerAddress} to subscription ${subscriptionId}...`)
    const addConsumerTx = await subManager.addConsumer({ subscriptionId, consumerAddress, txOptions })
    console.log(`\nAdded consumer contract ${consumerAddress} in Tx: ${addConsumerTx.transactionHash}`)

    console.log("\nDeployed FunctionsConsumer contract to:", consumerContract.address)

    if (network.name === "localFunctionsTestnet") {
      return
    }

    taskArgs.contract = consumerContract.address
    await setRequest(consumerContract.address, taskArgs)

    const verifyContract = taskArgs.verify
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...")
        await run("verify:verify", {
          address: consumerContract.address,
          constructorArguments: [functionsRouter, donIdBytes32],
        })
        console.log("Contract verified")
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          )
          console.log(error)
        } else {
          console.log("Contract already verified")
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      )
    }

    console.log(`\nFunctionsConsumer contract deployed to ${consumerContract.address} on ${network.name}`)
  })
