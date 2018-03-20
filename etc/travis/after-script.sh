#!/usr/bin/env bash

set e

source "common-lib.sh"

if [[ $SIAP_SUITE == "coverage" ]]; then
    run_command "wget https://phar.phpunit.de/phpcov.phar"
    run_command "chmod +x phpcov.phar"
    run_command "phpcov.phar merge build/coverage --clover build/logs/backend/clover.xml"

    print_header "uploading code coverage"
    run_command "wget https://codecov.io/bash > codecov.sh"
    run_command "chmod +x codecov.sh"
    run_command "./codecov.sh -F backend -s build/logs/backend -f \"*.xml\""
    run_command "./codecov.sh -F frontend -s build/logs/frontend -f \"*.xml\""
fi