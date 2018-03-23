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

    public function its_id_should_be_readonly()
    {
        $this->getId()->shouldReturn(null);
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

    public function its_tanggal_lahir_should_be_mutable(\DateTime $date)
    {
        $this->setTanggalLahir($date)->shouldReturn($this);
        $this->getTanggalLahir()->shouldReturn($date);
    }

    public function its_tempat_lahir_should_be_mutable()
    {
        $this->setTempatLahir('some')->shouldReturn($this);
        $this->getTempatLahir()->shouldReturn('some');
    }

    public function its_tanggal_baptis_should_be_mutable()
    {
        $date = new \DateTime();
        $this->setTanggalBaptis($date)->shouldReturn($this);
        $this->getTanggalBaptis()->shouldReturn($date);
    }

    public function its_tempat_baptis_should_be_mutable()
    {
        $this->setTempatBaptis('some')->shouldReturn($this);
        $this->getTempatBaptis()->shouldReturn('some');
    }

    public function its_wali_baptis_1_should_be_mutable()
    {
        $this->setWaliBaptis1('some')->shouldReturn($this);
        $this->getWaliBaptis1()->shouldReturn('some');
    }

    public function its_wali_baptis_2_should_be_mutable()
    {
        $this->setWaliBaptis2('some')->shouldReturn($this);
        $this->getWaliBaptis2()->shouldReturn('some');
    }

    public function its_minister_should_be_mutable()
    {
        $this->setMinister('some')->shouldReturn($this);
        $this->getMinister()->shouldReturn('some');
    }
}
