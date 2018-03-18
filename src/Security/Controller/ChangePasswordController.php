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

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Paroki\Resource\Entity\User;

/**
 * Class ChangePasswordController.
 */
class ChangePasswordController extends Controller
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
    public function changePasswordAction(User $user, Request $request)
    {
        return $user;
    }

    /**
     * @Route(
     *     name="security_profile",
     *     path="/api/me",
     *     methods={"GET","PUT"},
     *     defaults={
     *         "_api_resource_class"=User::class,
     *         "_api_item_operation_name"="profile",
     *         "_api_receive"=false
     *     }
     * )
     *
     * @param User    $user
     * @param Request $request
     *
     * @return User
     */
    public function profileAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();

        return $user;
    }

    /**
     * @Route(
     *     name="security_profile_password",
     *     path="/api/me/password",
     *     methods={"GET","PUT"},
     *     defaults={
     *         "_api_resource_class"=User::class,
     *         "_api_item_operation_name"="profilePassword",
     *         "_api_receive"=false
     *     }
     * )
     *
     * @param User $user
     *
     * @return User
     */
    public function profilePasswordAction(Request $request)
    {
        $user = new User();

        return $user;
    }
}
