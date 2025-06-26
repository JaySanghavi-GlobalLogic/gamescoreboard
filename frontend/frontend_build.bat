cd frontend
if exist "package-lock.json" del .\package-lock.json
start "" cmd /c "npm install && npm run build & npm run test & npm start"