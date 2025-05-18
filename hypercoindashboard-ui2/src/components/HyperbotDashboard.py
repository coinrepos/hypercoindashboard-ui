import os
import json
import time
import threading
from flask import Flask, request, jsonify
from web3 import Web3
from dotenv import load_dotenv
from eth_account import Account

# Load .env variables
load_dotenv()

# Flask app
app = Flask(__name__)

# Connect to RSK Testnet
w3 = Web3(Web3.HTTPProvider(os.getenv("RSK_TESTNET_RPC_URL")))

PRIVATE_KEY = os.getenv("TESTNET_PRIVATE_KEY")
ACCOUNT = Account.from_key(PRIVATE_KEY)

# Contract Setup
with open("abi/wrappedHyperCoinABI.json") as f:
    CONTRACT_ABI = json.load(f)

CONTRACT_ADDRESS = os.getenv("HYPERCOIN_CONTRACT")
contract = w3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=CONTRACT_ABI)

# Dynamic lock contract
LOCK_CONTRACT = None

@app.route("/dashboard", methods=["GET"])
def dashboard():
    return jsonify({
        "status": "HyperBot Running",
        "account": ACCOUNT.address,
        "contract": CONTRACT_ADDRESS,
        "timestamp": time.time()
    })

@app.route("/mint", methods=["POST"])
def mint():
    data = request.get_json()
    to = data.get("to")
    amount = int(data.get("amount"))
    tx = contract.functions.mint(to, amount).build_transaction({
        'from': ACCOUNT.address,
        'nonce': w3.eth.get_transaction_count(ACCOUNT.address),
        'gas': 200000,
        'gasPrice': w3.eth.gas_price
    })
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return jsonify({"tx_hash": tx_hash.hex()})

@app.route("/burn", methods=["POST"])
def burn():
    data = request.get_json()
    amount = int(data.get("amount"))
    tx = contract.functions.burn(amount).build_transaction({
        'from': ACCOUNT.address,
        'nonce': w3.eth.get_transaction_count(ACCOUNT.address),
        'gas': 200000,
        'gasPrice': w3.eth.gas_price
    })
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return jsonify({"tx_hash": tx_hash.hex()})

@app.route("/setLockContract", methods=["POST"])
def set_lock():
    global LOCK_CONTRACT
    data = request.get_json()
    LOCK_CONTRACT = data.get("lock_address")
    tx = contract.functions.setEthereumLockContract(LOCK_CONTRACT).build_transaction({
        'from': ACCOUNT.address,
        'nonce': w3.eth.get_transaction_count(ACCOUNT.address),
        'gas': 200000,
        'gasPrice': w3.eth.gas_price
    })
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
    return jsonify({"tx_hash": tx_hash.hex()})

# Start scheduled task thread
def run_scheduled_tasks():
    while True:
        print("[HyperBot] Daily Maintenance Running...")
        time.sleep(86400)

if __name__ == "__main__":
    print("[HyperBot] Launching...")
    threading.Thread(target=run_scheduled_tasks, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
