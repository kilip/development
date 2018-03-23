<?php

declare(strict_types=1);

namespace Paroki\Resource\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Baptisan.
 *
 *
 * @ORM\Entity()
 * @ORM\Table(name="adm_baptisan")
 * @ApiResource(
 *     attributes= {
 *         {"access_control"="has_role('ADMIN_PAROKI')"}
 *     },
 *     collectionOperations={
 *         "get"={"method"="GET","access_control"="has_role('ADMIN_PAROKI')"},
 *         "post"={"method"="POST","access_control"="has_role('ADMIN_PAROKI')"}
 *     }
 * )
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
    private $id;

    /**
     * @ORM\Column(name="nama",type="string",length=100)
     * @Assert\NotBlank
     *
     * @var string
     */
    private $nama;

    /**
     * @ORM\Column(name="jenis_kelamin",type="smallint",nullable=true)
     *
     * @var int
     */
    private $jenisKelamin;

    /**
     * @ORM\Column(name="tempat_lahir",type="string",nullable=true)
     *
     * @var string
     */
    private $tempatLahir;

    /**
     * @ORM\Column(name="tanggal_lahir",type="date",nullable=true)
     *
     * @var \DateTime
     */
    private $tanggalLahir;

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
     * @ORM\Column(name="nama_baptis",type="string", length=50)
     * @Assert\NotBlank
     *
     * @var string
     */
    private $namaBaptis;

    /**
     * @ORM\Column(name="tanggal_baptis", type="date", nullable=true)
     *
     * @var \DateTime
     */
    private $tanggalBaptis;

    /**
     * @ORM\Column(name="tempat_baptis", type="string", nullable=true)
     *
     * @var null|string
     */
    private $tempatBaptis;

    /**
     * @ORM\Column(name="minister", type="string", nullable=true)
     *
     * @var null|string
     */
    private $minister;

    /**
     * @ORM\Column(name="wali_baptis_1", type="string", nullable=true)
     *
     * @var null|string
     */
    private $waliBaptis1;

    /**
     * @ORM\Column(name="wali_baptis_2", type="string", nullable=true)
     *
     * @var null|string
     */
    private $waliBaptis2;

    /**
     * @return null|string
     */
    public function getId()
    {
        return $this->id;
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
    public function getTempatLahir()
    {
        return $this->tempatLahir;
    }

    /**
     * @param string $tempatLahir
     *
     * @return Baptisan
     */
    public function setTempatLahir(string $tempatLahir): self
    {
        $this->tempatLahir = $tempatLahir;

        return $this;
    }

    /**
     * @return null|\DateTime
     */
    public function getTanggalLahir(): ?\DateTime
    {
        return $this->tanggalLahir;
    }

    /**
     * @param \DateTime $tanggalLahir
     *
     * @return Baptisan
     */
    public function setTanggalLahir(\DateTime $tanggalLahir): self
    {
        $this->tanggalLahir = $tanggalLahir;

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
    public function getAyah(): ?string
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

    public function getTanggalBaptis(): ?\DateTime
    {
        return $this->tanggalBaptis;
    }

    /**
     * @param \DateTime $tanggalBaptis
     *
     * @return Baptisan
     */
    public function setTanggalBaptis(\DateTime $tanggalBaptis): self
    {
        $this->tanggalBaptis = $tanggalBaptis;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getTempatBaptis(): ?string
    {
        return $this->tempatBaptis;
    }

    /**
     * @param null|string $tempatBaptis
     *
     * @return Baptisan
     */
    public function setTempatBaptis(?string $tempatBaptis): self
    {
        $this->tempatBaptis = $tempatBaptis;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getMinister(): ?string
    {
        return $this->minister;
    }

    /**
     * @param null|string $minister
     *
     * @return Baptisan
     */
    public function setMinister(?string $minister): self
    {
        $this->minister = $minister;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getWaliBaptis1(): ?string
    {
        return $this->waliBaptis1;
    }

    /**
     * @param null|string $waliBaptis1
     *
     * @return Baptisan
     */
    public function setWaliBaptis1(?string $waliBaptis1): self
    {
        $this->waliBaptis1 = $waliBaptis1;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getWaliBaptis2(): ?string
    {
        return $this->waliBaptis2;
    }

    /**
     * @param null|string $waliBaptis2
     *
     * @return Baptisan
     */
    public function setWaliBaptis2(?string $waliBaptis2): self
    {
        $this->waliBaptis2 = $waliBaptis2;

        return $this;
    }

    /**
     * @return null|string
     */
    public function getIbu(): ?string
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
     * @return null|int
     */
    public function getJenisKelamin(): ?int
    {
        return $this->jenisKelamin;
    }

    /**
     * @param int $jenisKelamin
     *
     * @return Baptisan
     */
    public function setJenisKelamin($jenisKelamin)
    {
        $this->jenisKelamin = $jenisKelamin;

        return $this;
    }
}
