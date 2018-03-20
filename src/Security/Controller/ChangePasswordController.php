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

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Paroki\Resource\Entity\User;

/**
 * Class ChangePasswordController.
 */
class ChangePasswordController
{
    /**
     * @Route(
     *     name="security_change_password",
     *     path="/api/users/{id}/change-password",
     *     methods={"GET","PUT"},
     *     defaults={
     *         "_api_resource_class"=User::class,
     *         "_api_item_operation_name"="changePassword"
     *     }
     * )
     *
     * @param User    $user
     * @param Request $request
     *
     * @return User
     */
    public function changePasswordAction(User $user)
    {
        return $user;
    }
}
