#!/bin/sh

PWD=$(pwd)
SESSION=$(basename "$PWD")

tmux new-session -s "$SESSION" -d

# initial window for client generate
tmux split-window -v -t "$SESSION" # for client start
tmux split-window -v -t "$SESSION" # for server generate
tmux split-window -v -t "$SESSION" # for server start

tmux send-keys -t "$SESSION":0.0 '(cd client && npm run codegen)' C-m
tmux send-keys -t "$SESSION":0.1 '(cd client && npm start)' C-m
tmux send-keys -t "$SESSION":0.2 '(cd server && npm run codegen)' C-m
tmux send-keys -t "$SESSION":0.3 '(cd server && npm start)' C-m

# Set the even-vertical layout 
tmux send-keys -t "$SESSION" M-2

tmux attach -t "$SESSION"
