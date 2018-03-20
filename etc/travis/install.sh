#!/usr/bin/env bash

set e

code=0

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/common.sh"

print_header "install backend dependencies"

run_command "composer update --prefer-dist --no-progress --no-suggest --ansi"
run_command "./vendor/bin/simple-phpunit install"
run_command "bin/console doctrine:database:create -n --if-not-exists"
run_command "bin/console doctrine:schema:create -n"
run_command "bin/console siap:generate:key"
run_command "bin/console doctrine:schema:update -n --force"

if [ $SIAP_SUITE == "deploy" ] || [ $SIAP_SUITE == "frontend" ] || [ $SIAP_SUITE == "coverage" ]; then
    print_header "install frontend dependencies"
    run_command "yarn install --dev"
    run_command "yarn build"
fi

run_command "mkdir -p build/logs"

exit ${code}