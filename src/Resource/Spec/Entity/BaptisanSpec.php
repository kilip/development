<?php

namespace Spec\Paroki\Resource\Entity;

use Paroki\Resource\Entity\Baptisan;
use PhpSpec\ObjectBehavior;

class BaptisanSpec extends ObjectBehavior
{
    public function it_is_initializable()
    {
        $this->shouldHaveType(Baptisan::class);
    }

    public function its_guid_should_be_readonly()
    {
        $this->getGuid()->shouldReturn(null);
    }

    public function its_nama_should_be_mutable()
    {
        $this->getNama()->shouldReturn(null);
        $this->setNama('some')->shouldReturn($this);
        $this->getNama()->shouldReturn('some');
    }

    public function its_nama_baptis_should_be_mutable()
    {
        $this->getNamaBaptis()->shouldReturn(null);
        $this->setNamaBaptis('Fransiskus')->shouldReturn($this);
        $this->getNamaBaptis()->shouldReturn('Fransiskus');
    }

    public function its_ayah_should_be_mutable()
    {
        $this->getAyah()->shouldReturn(null);
        $this->setAyah('Ayah')->shouldReturn($this);
        $this->getAyah()->shouldReturn('Ayah');
    }

    public function its_ibu_should_be_mutable()
    {
        $this->getIbu()->shouldReturn(null);
        $this->setIbu('Ibu')->shouldReturn($this);
        $this->getIbu()->shouldReturn('Ibu');
    }

    public function its_jenis_kelamin_should_be_mutable()
    {
        $this->getJenisKelamin()->shouldReturn(null);
        $this->setJenisKelamin(Baptisan::JK_PRIA)->shouldReturn($this);
        $this->getJenisKelamin()->shouldReturn(Baptisan::JK_PRIA);
    }
}
