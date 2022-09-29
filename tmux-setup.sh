#!/bin/sh

tmux new-session -s development -d
tmux split-window -v -t development # for client generate
tmux split-window -v -t development # for client start
tmux split-window -v -t development # for server generate
tmux split-window -v -t development # for server start
tmux send-keys -t development:0.0 '(cd client && npm run generate)' C-m
tmux send-keys -t development:0.1 '(cd client && npm start)' C-m
tmux send-keys -t development:0.2 '(cd server && npm run generate)' C-m
tmux send-keys -t development:0.3 '(cd server && npm start)' C-m
