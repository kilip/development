<?php

declare(strict_types=1);

namespace Paroki\Security\Tests\Command;

use Paroki\Security\Command\GeneratePrivateKeyCommand;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Tester\CommandTester;
use Symfony\Component\Process\Process;

class GeneratePrivateKeyCommandTest extends KernelTestCase
{
    private function getCommandTester(Command $command)
    {
        $kernel = self::bootKernel();
        $application = new Application($kernel);
        $application->add($command);

        $command = $application->find('siap:generate:key');
        $commandTester = new CommandTester($command);

        return $commandTester;
    }

    public function testExecute()
    {
        $command = new GeneratePrivateKeyCommand();
        $commandTester = $this->getCommandTester($command);
        $commandTester->execute([
            'command' => $command->getName(),
            '--private-path' => sys_get_temp_dir().'/jwt/private/private.pem',
            '--public-path' => sys_get_temp_dir().'/jwt/public/public.pem'
        ]);

        $output = $commandTester->getDisplay();
        $this->assertContains('Generated public key to',$output);
        $this->assertContains('Generated private key to',$output);
    }
}
