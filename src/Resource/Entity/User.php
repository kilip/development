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

use ApiPlatform\Core\Annotation\ApiResource;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class User.
 *
 * @ORM\Entity()
 * @ORM\Table(name="auth_user")
 * @UniqueEntity(
 *     fields={"email"},
 *     message="Email ini telah dipergunakan"
 * )
 * @ApiResource(
 *     shortName="User",
 *     description="User Profiles",
 *     attributes= {
 *         "access_control"="has_role('ADMIN')",
 *         "normalization_context"={
 *              "groups"={"editable","readonly"},
 *              "callback"="foobar"
 *         },
 *         "denormalization_context"={"groups"={"editable"}}
 *     },
 *     collectionOperations={
 *         "get"={"method"="GET","access_control"="has_role('ADMIN')"},
 *         "post"={"method"="POST","access_control"="has_role('ADMIN')"}
 *     }
 * )
 */
class User extends BaseUser
{
    const ROLE_DEFAULT = 'USER';

    const ROLE_SUPER_ADMIN = 'SUPER_ADMIN';

    /**
     * @ORM\Column(name="id",type="guid",length=32)
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"readonly"})
     *
     * @var string
     */
    protected $id;

    /**
     * @ORM\Column(name="full_name", type="string", length=100)
     * @Assert\NotBlank()
     * @Groups({"editable"})
     *
     * @var string
     */
    protected $fullName;

    /**
     * @Groups({"editable"})
     *
     * @var string
     */
    protected $username;

    /**
     * User email to use.
     *
     * @Assert\NotBlank()
     * @Assert\Email()
     * @Groups({"editable"})
     *
     * @var string
     */
    protected $email;

    /**
     * @Groups({"editable"})
     *
     * @var array
     */
    protected $roles;

    /**
     * @Groups({"editable"})
     *
     * @var bool
     */
    protected $enabled;

    /**
     * @var array
     */
    protected $groups;

    /**
     * {@inheritdoc}
     */
    public function getRoles()
    {
        $roles = $this->roles;

        foreach ($this->getGroups() as $group) {
            $roles = array_merge($roles, $group->getRoles());
        }

        return array_unique($roles);
    }

    /**
     * {@inheritdoc}
     */
    public function addRole($role)
    {
        $role = strtoupper($role);
        if ($role === static::ROLE_DEFAULT) {
            return $this;
        }

        if (!in_array($role, $this->roles, true)) {
            $this->roles[] = $role;
        }

        return $this;
    }

    /**
     * @return null|string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return null|string
     */
    public function getFullName()
    {
        return $this->fullName;
    }

    /**
     * @param string $fullName
     *
     * @return User
     */
    public function setFullName($fullName): self
    {
        $this->fullName = $fullName;

        return $this;
    }
}
