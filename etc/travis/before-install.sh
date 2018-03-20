#!/usr/bin/env bash

set -e

code=0

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib/common.sh"

print_header "disabled php memory limit"
run_command "echo \"memory_limit=-1\" >> ~/.phpenv/versions/$(phpenv version-name)/etc/conf.d/travis.ini"

run_command "export PATH=\"$PATH:$HOME/.composer/vendor/bin\""

if [[ $SIAP_SUITE != "coverage" ]]; then
    print_header "disable xdebug"
    run_command "phpenv config-rm xdebug.ini || echo \"xdebug not available\""
fi

if [[ ${TRAVIS_PHP_VERSION:0:3} == "7.1" ]]; then
    run_command "echo yes | pecl install apcu"
else
    run_command "echo \"extension = apcu.so\" >> ~/.phpenv/versions/$(phpenv version-name)/etc/php.ini"
fi

if [[ $SIAP_SUITE == "deploy" ]] || [[ $SIAP_SUITE == "coverage" ]] || [[ $SIAP_SUITE == "frontend" ]]; then
    print_header "install node dependencies"
    set -ev
    sudo apt-get -y install software-properties-common python-software-properties
    sudo -E apt-add-repository -y ppa:ubuntu-toolchain-r/test
    sudo apt update -y
    sudo apt-get -yq --no-install-suggests --no-install-recommends --force-yes install g++-4.9
    export CC=gcc-4.9
    export CXX=g++-4.9
    mkdir -p build/coverage/php
fi

exit ${code}