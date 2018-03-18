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
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        //$request = $this->requestStack->getCurrentRequest();

        /* @var \Paroki\Resource\Entity\User $payload */
        $payload       = $event->getData();
        $payload['id'] = $this->tokenStorage->getToken()->getUser()->getId();
        $event->setData($payload);

        //$header        = $event->getHeader();
        //$header['cty'] = 'JWT';


        //$event->setHeader($header);
    }
}
