const crypto = require('crypto')
const Tx = require('ethereumjs-tx').Transaction
const IPFS = require('ipfs')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/66a470c1158f441cac9c502cd63d4b9b')

const account = ""
const privateKey = Buffer.from("", "hex")
const contractAddress = ""
const contractABI = []
let IPFSNode = null
let txCount = 0

async function addTicket(ticket) {
    await createTransaction("register", ticket)
}

async function removeTicket(ticket) {
    await createTransaction("revoke", ticket)
}

async function createTransaction(operation, ticket) {
    const fileBytes = (ticket.id + ticket.owner)

    await web3.eth.getTransactionCount(account, 'pending', (err, count) => {
        txCount = count;
    })

    const hashFunction = crypto.createHash('sha256');
    hashFunction.update(fileBytes);
    const hash = hashFunction.digest();

    const hashBytes = '0x' + hash.toString('hex');

    const contract = new web3.eth.Contract(contractABI, contractAddress)
    let data
    if (operation === "register") {
        data = contract.methods.registerCertificate(numberId, hashBytes).encodeABI();
    } else {
        data = contract.methods.revokeCertificate(numberId, hashBytes).encodeABI();
    }

    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(3000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100','gwei')),
        to: contractAddress,
        data: data
    };

    const tx = new Tx(txObject,{'chain':'ropsten'});
    tx.sign(privateKey);
    const serializedTx = tx.serialize();

    const txData = '0x' + serializedTx.toString('hex');

    txCount++;

    web3.eth.sendSignedTransaction(txData, (err, txHash) => {
        if(err == null) console.log(err)
        else {
            console.log('Transaction hash: ', txHash);
            registerIPFS(path, fileBytes);
        }
    })
}

async function createIPFS() {
    IPFSNode = await IPFS.create({silent: true});
}

async function registerIPFS(ticket, fileBytes) {
    try
    {
        for await (const result of IPFSNode.add(fileBytes)) {
            console.log('Added file: ', ticket, ' Multihash: ', result["path"]);
        }
    } catch (error) {
        console.log(error)
    }
}