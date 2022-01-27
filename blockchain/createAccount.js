const fs = require('fs')
const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/66a470c1158f441cac9c502cd63d4b9b')
const result = web3.eth.accounts.create()

web3.eth.accounts.wallet.create(1)
web3.eth.accounts.wallet.add(result.privateKey)

const encWallet = web3.eth.accounts.wallet.encrypt("TicketChain");
console.log(encWallet);
fs.writeFileSync("keystore", JSON.stringify(encWallet))

const account = result.address
const privateKey = Buffer.from(result.privateKey, 'hex')

web3.eth.getTransactionCount(account, (err, txCount) => {
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(3000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('800','gwei')),
        data: web3.eth.getCode(account)
    };

    const tx = new Tx(txObject,{ 'chain': 'ropsten' })
    tx.sign(privateKey)
    const serializedTx = tx.serialize()

    const txData = '0x' + serializedTx.toString('hex')

    web3.eth.sendSignedTransaction(txData, (err, txHash) => {
        if (err) console.log(err)
        else console.log(`Transaction hash: ${txHash}`)
    })
})
