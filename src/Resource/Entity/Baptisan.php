<?php

declare(strict_types=1);

namespace Paroki\Resource\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class Baptisan.
 *
 *
 * @ORM\Entity()
 * @ORM\Table(name="adm_baptisan")
 * @ApiResource()
 */
class Baptisan
{
    const JK_PRIA = 1;
    const JK_WANITA = 2;

    /**
     * @ORM\Column(name="id",type="guid",length=32)
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @var string
     */
    private $guid;

    /**
     * @ORM\Column(name="jenis_kelamin",type="smallint",nullable=true)
     *
     * @var int
     */
    private $jenisKelamin;

    /**
     * @ORM\Column(name="nama",type="string",length=100)
     *
     * @var string
     */
    private $nama;

    /**
     * @ORM\Column(name="nama_baptis",type="string", length=50)
     *
     * @var string
     */
    private $namaBaptis;

    /**
     * @ORM\Column(name="ayah", type="string", length=100)
     *
     * @var string
     */
    private $ayah;

    /**
     * @ORM\Column(name="ibu", type="string",length=100)
     *
     * @var string
     */
    private $ibu;

    /**
     * @return null|string
     */
    public function getGuid()
    {
        return $this->guid;
    }

    /**
     * @return string
     */
    public function getNama()
    {
        return $this->nama;
    }

    /**
     * @param $nama
     *
     * @return $this
     */
    public function setNama($nama)
    {
        $this->nama = $nama;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getNamaBaptis()
    {
        return $this->namaBaptis;
    }

    /**
     * @param string $namaBaptis
     *
     * @return Baptisan
     */
    public function setNamaBaptis(string $namaBaptis): self
    {
        $this->namaBaptis = $namaBaptis;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getAyah()
    {
        return $this->ayah;
    }

    /**
     * @param string $ayah
     *
     * @return Baptisan
     */
    public function setAyah(string $ayah): self
    {
        $this->ayah = $ayah;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getIbu()
    {
        return $this->ibu;
    }

    /**
     * @param string $ibu
     *
     * @return Baptisan
     */
    public function setIbu(string $ibu): self
    {
        $this->ibu = $ibu;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getJenisKelamin()
    {
        return $this->jenisKelamin;
    }

    /**
     * @param mixed $jenisKelamin
     *
     * @return Baptisan
     */
    public function setJenisKelamin($jenisKelamin)
    {
        $this->jenisKelamin = $jenisKelamin;

        return $this;
    }
}
