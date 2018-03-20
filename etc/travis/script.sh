#!/usr/bin/env bash

set e

code=0

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/common.sh"

if [ $SIAP_SUITE == "coverage"  ]; then
    run_command "./vendor/bin/phpspec run --ansi -c etc/phpspec-coverage.yml" || code=$?
    run_command "./vendor/bin/simple-phpunit --coverage-php=build/coverage/php/phpunit.cov" || code=$?
    run_command "./vendor/bin/behat -p coverage" || code=$?
    run_command "yarn test --coverage" || code=$?
fi

if [ $SIAP_SUITE == "backend" ]; then
    run_command "touch public/build/manifest.json" || code=$?
    run_command "./vendor/bin/simple-phpunit" || code=$?
    run_command "./vendor/bin/phpspec run" || code=$?
    run_command "./vendor/bin/behat -fprogress" || code=$?
fi

if [ $SIAP_SUITE == "frontend" ] || [ $SIAP_SUITE == "deploy" ]; then
    run_command "yarn test" || code=$?
fi

exit ${code}