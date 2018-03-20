#!/usr/bin/env bash

# Argument 1: Command to run
run_command() {
    echo "> $1"

    eval "$1"
}

# Argument 1: Action
# Argument 2: Subject
print_header() {
    echo -e "$(bold "$1"): $(bold_green "$2")"
}