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

namespace Paroki\Security\Controller;

use Paroki\Resource\Entity\User;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController
{
    /**
     * @Route(
     *     name="security_profiles",
     *     path="/api/profiles/{id}",
     *     methods={"GET","PUT"},
     *     defaults={
     *         "_api_resource_class"=User::class,
     *         "_api_item_operation_name"="profile"
     *     }
     * )
     */
    public function updateAction(User $user)
    {
        return $user;
    }

    /**
     * @Route(
     *     name="security_profiles_password",
     *     path="/api/profiles/{id}/password",
     *     methods={"GET","PUT"},
     *     defaults={
     *         "_api_resource_class"=User::class,
     *         "_api_item_operation_name"="profilePassword"
     *     }
     * )
     */
    public function changePasswordAction(User $user)
    {
        return $user;
    }
}
