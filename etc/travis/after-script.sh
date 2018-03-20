#!/usr/bin/env bash

set -e

code=0

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/common.sh"

if [[ $SIAP_SUITE == "coverage" ]]; then
    run_command "wget https://phar.phpunit.de/phpcov.phar"
    chmod +x phpcov.phar
    ./phpcov.phar merge build/coverage --clover build/logs/backend/clover.xml

    print_header "uploading code coverage"
    wget https://codecov.io/bash
    chmod +x bash
    ./bash -F backend -s build/logs/backend -f "*.xml"
    ./bash -F frontend -s build/logs/frontend -f "*.xml"
fi

exit ${code}