<?php

namespace Spec\Paroki\Security\Listener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Paroki\Resource\Entity\User;
use Paroki\Security\Listener\JWTCreatedListener;
use PhpSpec\ObjectBehavior;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class JWTCreatedListenerSpec extends ObjectBehavior
{
    public function let(
        RequestStack $requestStack,
        TokenStorage $tokenStorage,
        TokenInterface $token,
        User $user
    ) {
        $tokenStorage->getToken()->willReturn($token);
        $token->getUser()->willReturn($user);
        $this->beConstructedWith($requestStack, $tokenStorage);
    }

    public function it_is_initializable()
    {
        $this->shouldHaveType(JWTCreatedListener::class);
    }

    public function it_should_handle_on_jwt_created_event(
        JWTCreatedEvent $createdEvent,
        User $user
    ) {
        $user->getId()->willReturn('some-id');
        $user->getRoles()->willReturn(array('ADMIN'));

        $createdEvent
            ->getData()
            ->shouldBeCalled()
            ->willReturn(array())
        ;

        $expectedPayload = array(
            'id' => 'some-id',
            'roles' => array(
                'ADMIN',
                'USER',
                'ADMIN_PAROKI',
            ),
        );
        $createdEvent
            ->setData($expectedPayload)
            ->shouldBeCalled()
        ;

        $this->onJWTCreated($createdEvent);

        $user->getRoles()->willReturn(array('SUPER_ADMIN'));
        $expectedPayload = array(
            'id' => 'some-id',
            'roles' => array(
                'SUPER_ADMIN',
                'USER',
                'ADMIN',
                'ADMIN_PAROKI',
            ),
        );
        $createdEvent
            ->setData($expectedPayload)
            ->shouldBeCalled()
        ;
        $this->onJWTCreated($createdEvent);
    }
}
