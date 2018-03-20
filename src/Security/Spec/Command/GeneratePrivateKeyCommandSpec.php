<?php

namespace Spec\Paroki\Security\Command;

use Paroki\Security\Command\GeneratePrivateKeyCommand;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class GeneratePrivateKeyCommandSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(GeneratePrivateKeyCommand::class);
    }

    function it_should_check_process(Process $process)
    {
        $process->isSuccessful()
            ->shouldBeCalled()
            ->willReturn(true)
        ;
        $this->checkProcess($process);

        $process->isSuccessful()
            ->shouldBeCalled()
            ->willReturn(false)
        ;
        $process->getCommandLine()
            ->willReturn('some command')
        ;
        $process->getExitCodeText()->willReturn('some text');
        $process->getExitCode()->willReturn(0);
        $process->getWorkingDirectory()->willReturn(getcwd());
        $process->isOutputDisabled()->willReturn(true);
        $this->shouldThrow(ProcessFailedException::class)
            ->duringCheckProcess($process)
        ;

    }
}
