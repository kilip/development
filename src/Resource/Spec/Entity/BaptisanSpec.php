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

    function its_guid_should_be_readonly()
    {
        $this->getGuid()->shouldReturn(null);
    }

    function its_nama_should_be_mutable()
    {
        $this->getNama()->shouldReturn(null);
        $this->setNama('some')->shouldReturn($this);
        $this->getNama()->shouldReturn('some');
    }

    function its_nama_baptis_should_be_mutable()
    {
        $this->getNamaBaptis()->shouldReturn(null);
        $this->setNamaBaptis('Fransiskus')->shouldReturn($this);
        $this->getNamaBaptis()->shouldReturn('Fransiskus');
    }

    function its_ayah_should_be_mutable()
    {
        $this->getAyah()->shouldReturn(null);
        $this->setAyah('Ayah')->shouldReturn($this);
        $this->getAyah()->shouldReturn('Ayah');
    }

    function its_ibu_should_be_mutable()
    {
        $this->getIbu()->shouldReturn(null);
        $this->setIbu('Ibu')->shouldReturn($this);
        $this->getIbu()->shouldReturn('Ibu');
    }
}
