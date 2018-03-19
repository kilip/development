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
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;

/**
 * Class User.
 *
 * @ORM\Entity()
 * @ORM\Table(name="auth_user")
 * @UniqueEntity(
 *     fields={"email"},
 *     message="Email ini telah dipergunakan",
 *     groups={"admin"}
 * )
 * @UniqueEntity(
 *     fields={"username"},
 *     message="Username telah dipergunakan",
 *     groups={"admin"}
 * )
 * @ApiResource(
 *     shortName="User",
 *     description="User Profiles",
 *     attributes= {
 *         "access_control"="has_role('ADMIN')",
 *         "normalization_context"={
 *              "groups"={"admin","readonly"},
 *         },
 *         "denormalization_context"={"groups"={"admin","new"}},
 *         "validation_groups"={"admin"}
 *     },
 *     collectionOperations={
 *         "get"={"method"="GET","access_control"="has_role('ADMIN')"},
 *         "post"={"method"="POST","access_control"="has_role('ADMIN')"}
 *     },
 *     itemOperations={
 *         "get"={"method"="GET","access_control"="has_role('ADMIN')"},
 *         "put"={"method"="PUT","access_control"="has_role('ADMIN')"},
 *         "changePassword"={
 *             "route_name"="security_change_password",
 *             "normalization_context"={"groups"={"changePasswordView"}},
 *             "denormalization_context"={"groups"={"changePassword"}},
 *             "access_control"="has_role('ADMIN')",
 *             "validation_groups"={"password"}
 *         },
 *         "profile"={
 *             "route_name"="security_profiles",
 *             "normalization_context"={"groups"={"profile"}},
 *             "denormalization_context"={"groups"={"profile"}},
 *             "description"="Retrieves user profile",
 *             "access_control"="has_role('ADMIN_PAROKI')"
 *         },
 *         "profilePassword"={
 *             "route_name"="security_profiles_password",
 *             "normalization_context"={"groups"={"profilePassword"}},
 *             "denormalization_context"={"groups"={"profilePassword","profilePasswordUpdate"}},
 *             "description"="Change profile password",
 *             "access_control"="has_role('ADMIN_PAROKI')",
 *             "validation_groups"={"profilePassword"}
 *         }
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
     * @Groups({"readonly","changePassword","changePasswordView","profile","profilePassword"})
     *
     * @var string
     */
    protected $id;

    /**
     * @ORM\Column(name="full_name", type="string", length=100)
     * @Assert\NotBlank(
     *     groups={"admin"},
     *     message="Nama lengkap harus di isi"
     * )
     * @Groups({"admin","profile"})
     *
     * @var string
     */
    protected $fullName;

    /**
     * @Groups({"admin","profile"})
     *
     * @var string
     */
    protected $username;

    /**
     * User email to use.
     *
     * @Assert\NotBlank(
     *     groups={"admin"},
     *     message="Email harus diisi"
     * )
     * @Assert\Email(groups={"admin"})
     * @Groups({"admin","profile"})
     *
     * @var string
     */
    protected $email;

    /**
     * @Groups({"admin"})
     *
     * @var array
     */
    protected $roles;

    /**
     * @Groups({"admin"})
     *
     * @var bool
     */
    protected $enabled;

    /**
     * User password.
     *
     * @Groups({"new","changePassword","profilePassword"})
     * @Assert\NotBlank(
     *     message="Password harus diisi",
     *     groups={"password","profilePassword"}
     * )
     *
     * @var string
     */
    protected $plainPassword;

    /**
     * User password confirmation.
     *
     * @Groups({"changePassword","profilePassword"})
     * @Assert\NotBlank(groups={"password","profilePassword"})
     *
     * @var string
     */
    protected $plainPasswordConfirm;

    /**
     * Current user password.
     *
     * @Groups({"profilePasswordUpdate"})
     * @SecurityAssert\UserPassword(
     *     message="Password lama anda salah",
     *     groups={"profilePassword"}
     * )
     * @Assert\NotBlank(
     *     groups={"password","profilePassword"}
     * )
     *
     * @var string
     */
    protected $currentPassword;

    /**
     * @Assert\IsTrue(
     *     message="Nilai Password dan Konfirmasi tidak sama.",
     *     groups={"profilePassword","password"}
     * )
     *
     * @return bool
     */
    public function isPlainPasswordConfirm()
    {
        if (null === $this->plainPassword) {
            return true;
        }

        return $this->plainPassword === $this->plainPasswordConfirm;
    }

    public function getCurrentPassword()
    {
        return $this->currentPassword;
    }

    /**
     * @param string $currentPassword
     *
     * @return User
     */
    public function setCurrentPassword(string $currentPassword)
    {
        $this->currentPassword = $currentPassword;

        return $this;
    }

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

    /**
     * @return null|string
     */
    public function getPlainPasswordConfirm()
    {
        return $this->plainPasswordConfirm;
    }

    /**
     * @param string $plainPasswordConfirm
     *
     * @return User
     */
    public function setPlainPasswordConfirm(string $plainPasswordConfirm)
    {
        $this->plainPasswordConfirm = $plainPasswordConfirm;

        return $this;
    }
}
