<?php

declare(strict_types=1);

/*
 * This file is part of the Paroki project.
 *
 * (c) Anthonius Munthi <me@itstoni.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Paroki\Resource\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class User
 *
 * @package Paroki\Resource\Entity
 * @ORM\Entity()
 * @ORM\Table(name="auth_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Column(name="id",type="guid",length=32)
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     *
     * @var string
     */
    protected $id;
}
