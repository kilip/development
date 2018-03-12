<?php

namespace Spec\Paroki\Resource\Entity;

use Paroki\Resource\Entity\User;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class UserSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(User::class);
    }

    function its_id_should_be_readonly()
    {
        $this->getId()->shouldReturn(null);
    }

    function its_fullname_should_be_mutable()
    {
        $this->getFullName()->shouldReturn(null);
        $this->setFullName('Some Name')->shouldReturn($this);
        $this->getFullName()->shouldReturn('Some Name');
    }
}
