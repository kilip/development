<?php

namespace Paroki\Resource\Entity;

class Baptisan
{
    /**
     * @var string
     */
    private $nama;

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
}
