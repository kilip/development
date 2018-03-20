<?php

namespace Spec\Paroki\Security\Listener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Paroki\Resource\Entity\User;
use Paroki\Security\Listener\JWTCreatedListener;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTCreatedListenerSpec extends ObjectBehavior
{
    function let(
        RequestStack $requestStack,
        TokenStorage $tokenStorage,
        TokenInterface $token,
        User $user
    ){
        $tokenStorage->getToken()->willReturn($token);
        $token->getUser()->willReturn($user);
        $this->beConstructedWith($requestStack,$tokenStorage);
    }

    function it_is_initializable()
    {
        $this->shouldHaveType(JWTCreatedListener::class);
    }

    function it_should_handle_on_jwt_created_event(
        JWTCreatedEvent $createdEvent,
        User $user
    )
    {
        $user->getId()->willReturn('some-id');
        $user->getRoles()->willReturn(['ADMIN']);

        $createdEvent
            ->getData()
            ->shouldBeCalled()
            ->willReturn(array())
        ;

        $expectedPayload = array(
            'id' => 'some-id',
            'roles' => [
                'ADMIN',
                'USER',
                'ADMIN_PAROKI'
            ]
        );
        $createdEvent
            ->setData($expectedPayload)
            ->shouldBeCalled()
        ;

        $this->onJWTCreated($createdEvent);

        $user->getRoles()->willReturn(['SUPER_ADMIN']);
        $expectedPayload = array(
            'id' => 'some-id',
            'roles' => [
                'SUPER_ADMIN',
                'USER',
                'ADMIN',
                'ADMIN_PAROKI'
            ]
        );
        $createdEvent
            ->setData($expectedPayload)
            ->shouldBeCalled()
        ;
        $this->onJWTCreated($createdEvent);
    }
}
