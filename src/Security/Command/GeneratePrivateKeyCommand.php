<?php

declare(strict_types=1);

/*
 * This file is part of the Paroki project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Paroki\Security\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class GeneratePrivateKeyCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('siap:generate:key')
            ->setDescription('Generate a new private key')
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $passphrase = getenv('APP_SECRET');
        $privatePath = getenv('JWT_PRIVATE_KEY_PATH');
        $publicPath = getenv('JWT_PUBLIC_KEY_PATH');

        if (!is_dir($dir = dirname($publicPath))) {
            mkdir($dir, 0777, true);
        }

        passthru("openssl genrsa -passout stdin -out $privatePath -aes256 4096 <<PASS\n$passphrase\nPASS");
        $output->writeln("Generated private key to: <comment>$privatePath</comment>");

        passthru("openssl rsa -pubout -in $privatePath -out $publicPath -passin stdin <<PASS\n$passphrase\nPASS");
        $output->writeln("Generated public key to: <comment>$publicPath</comment>");
    }
}
