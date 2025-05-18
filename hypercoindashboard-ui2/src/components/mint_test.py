import requests
from web3 import Web3

# Valid RSK testnet address
to_address = "0xb83b08bd688739dcf499091B7596931c2DD8835F"

# Convert 0.1 HyperCoin to Wei
amount = Web3.to_wei(0.1, 'ether')

# Send the POST request to mint
response = requests.post("http://127.0.0.1:5000/mint", json={
    "to": to_address,
    "amount": amount
})

# Output results
print("Status Code:", response.status_code)
try:
    print("Response JSON:", response.json())
except Exception:
    print("Raw Response:", response.text)
