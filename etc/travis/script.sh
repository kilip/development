#!/usr/bin/env bash

set e

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/common.sh"

if [ $SIAP_SUITE == "coverage"  ]; then
    run_command "./vendor/bin/phpspec run --ansi -c etc/phpspec-coverage.yml"
    run_command "./vendor/bin/simple-phpunit --coverage-php=build/coverage/php/phpunit.cov"
    run_command "./vendor/bin/behat -p coverage"
    run_command "yarn test --coverage"
fi

if [ $SIAP_SUITE == "backend" ]; then
    run_command "./vendor/bin/simple-phpunit"
    run_command "./vendor/bin/phpspec run"
    run_command "./vendor/bin/behat -fprogress"
fi

if [ $SIAP_SUITE == "frontend" ] || [ $SIAP_SUITE == "deploy" ]; then
    run_command "yarn test"
fi