<?php

namespace Spec\Paroki\Resource\Entity;

use Paroki\Resource\Entity\Baptisan;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class BaptisanSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(Baptisan::class);
    }

    function its_nama_should_be_mutable()
    {
        $this->getNama()->shouldReturn(null);
        $this->setNama('some')->shouldReturn($this);
        $this->getNama()->shouldReturn('some');
    }
}
