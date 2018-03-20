<?php

namespace Spec\Paroki\Security\Controller;

use Paroki\Resource\Entity\User;
use Paroki\Security\Controller\ChangePasswordController;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class ChangePasswordControllerSpec extends ObjectBehavior
{
    function it_is_initializable()
    {
        $this->shouldHaveType(ChangePasswordController::class);
    }

    function it_should_handle_change_password_action(User $user)
    {
        $this->changePasswordAction($user)->shouldReturn($user);
    }
}
