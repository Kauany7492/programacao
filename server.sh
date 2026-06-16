#!/bin/bash

# Simple script to start a local HTTP server for the project
# This script will start a server on port 8000 and open the project in your default browser

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "Error: index.html not found. Make sure you run this script from the project root directory."
    exit 1
fi

# Try different methods to start a server
if command -v python3 &> /dev/null; then
    echo "Starting server with Python 3..."
    echo "Opening http://localhost:8000 in your browser..."
    echo "Press Ctrl+C to stop the server."
    python3 -m http.server 8000 &
    sleep 2
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000
    elif command -v open &> /dev/null; then
        open http://localhost:8000
    fi
    wait
elif command -v python &> /dev/null; then
    echo "Starting server with Python 2..."
    echo "Opening http://localhost:8000 in your browser..."
    echo "Press Ctrl+C to stop the server."
    python -m SimpleHTTPServer 8000 &
    sleep 2
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000
    elif command -v open &> /dev/null; then
        open http://localhost:8000
    fi
    wait
elif command -v php &> /dev/null; then
    echo "Starting server with PHP..."
    echo "Opening http://localhost:8000 in your browser..."
    echo "Press Ctrl+C to stop the server."
    php -S localhost:8000 &
    sleep 2
    if command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000
    elif command -v open &> /dev/null; then
        open http://localhost:8000
    fi
    wait
else
    echo "Error: No HTTP server found."
    echo "Please install Python, PHP, or Node.js to run this script."
    echo ""
    echo "Alternatively, you can:"
    echo "1. Open index.html directly in your browser"
    echo "2. Use: python -m http.server 8000"
    echo "3. Use: php -S localhost:8000"
    echo "4. Use: npx http-server"
    exit 1
fi
