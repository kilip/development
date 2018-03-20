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

# Argument 1: Text
bold() {
    echo -e "\e[1m$1\e[0;20m"
}

# Argument 1: Text
bold_green() {
    echo -e "\e[33;1m$1\e[0;20m"
}

# Argument 1: Text
red() {
    echo -e "\e[31m$1\e[0m"
}

# Argument 1: Text
bold_red() {
    echo -e "\e[31;1m$1\e[0;20m"
}