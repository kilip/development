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
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class GeneratePrivateKeyCommand extends Command
{
    private $publicKeyPath;

    private $privateKeyPath;

    private $passPhrase;

    protected function configure()
    {
        $this
            ->setName('siap:generate:key')
            ->setDescription('Generate a new private key')
            ->addOption('secret', 's', InputArgument::OPTIONAL, 'Key secret', getenv('JWT_PASSPHRASE'))
            ->addOption('private-path', 'p', InputArgument::OPTIONAL, 'Private key path', getenv('JWT_PRIVATE_KEY_PATH'))
            ->addOption('public-path', 'b', InputArgument::OPTIONAL, 'Public key path', getenv('JWT_PUBLIC_KEY_PATH'))
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->passPhrase = $input->getOption('secret');
        $this->privateKeyPath = $input->getOption('private-path');
        $this->publicKeyPath = $input->getOption('public-path');

        $output->writeln('passphrase: <comment>'.$this->passPhrase.'</comment>');
        if (!is_dir($dir = dirname($this->publicKeyPath))) {
            mkdir($dir, 0777, true);
        }

        if (!is_dir($dir = dirname($this->privateKeyPath))) {
            mkdir($dir, 0777, true);
        }

        $this->generatePrivateKey($output);
        $this->generatePublicKey($output);
    }

    protected function generatePrivateKey(OutputInterface $output)
    {
        $privateKeyPath = $this->privateKeyPath;
        $passPhrase = $this->passPhrase;
        $command = "openssl genrsa -passout stdin -out $privateKeyPath -aes256 4096 <<PASS\n$passPhrase\nPASS";
        $process = new Process($command);
        $process->run();
        $this->checkProcess($process);
        $output->writeln("Generated private key to: <comment>$privateKeyPath</comment>");
    }

    protected function generatePublicKey(OutputInterface $output)
    {
        $privatePath = $this->privateKeyPath;
        $publicPath = $this->publicKeyPath;
        $passPhrase = $this->passPhrase;
        $command = "openssl rsa -pubout -in $privatePath -out $publicPath -passin stdin <<PASS\n$passPhrase\nPASS";
        $process = new Process($command);
        $process->run();
        $this->checkProcess($process);
        $output->writeln("Generated public key to: <comment>$publicPath</comment>");
    }

    public function checkProcess(Process $process)
    {
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return true;
    }
}
