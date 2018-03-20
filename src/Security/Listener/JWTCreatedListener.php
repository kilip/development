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

namespace Paroki\Security\Listener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class JWTCreatedListener
{
    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @var TokenStorage
     */
    private $tokenStorage;

    /**
     * @param RequestStack $requestStack
     */
    public function __construct(RequestStack $requestStack, TokenStorage $tokenStorage)
    {
        $this->requestStack = $requestStack;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @param JWTCreatedEvent $event
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $payload = $event->getData();
        $payload['id'] = $this->tokenStorage->getToken()->getUser()->getId();
        $payload['roles'] = $this->normalizeRoles($this->tokenStorage->getToken()->getUser()->getRoles());
        $event->setData($payload);
    }

    private function normalizeRoles($roles)
    {
        $roles[] = 'USER';
        if (in_array('SUPER_ADMIN', $roles)) {
            $roles[] = 'ADMIN';
            $roles[] = 'ADMIN_PAROKI';
        }
        if (in_array('ADMIN', $roles)) {
            $roles[] = 'ADMIN_PAROKI';
        }

        return array_unique($roles);
    }
}
