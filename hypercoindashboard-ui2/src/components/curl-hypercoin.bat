@echo off
set /p action=Choose action (mint/burn/lock): 
set /p address=Enter wallet address: 
set /p amount=Enter amount (in HYPERCOIN):

if /I "%action%"=="mint" (
  curl -X POST http://localhost:5000/mint -H "Content-Type: application/json" -d "{\"to\": \"%address%\", \"amount\": %amount%}"
) else if /I "%action%"=="burn" (
  curl -X POST http://localhost:5000/burn -H "Content-Type: application/json" -d "{\"amount\": %amount%}"
) else if /I "%action%"=="lock" (
  curl -X POST http://localhost:5000/setLockContract -H "Content-Type: application/json" -d "{\"lock_address\": \"%address%\"}"
) else (
  echo Invalid action
)
pause
