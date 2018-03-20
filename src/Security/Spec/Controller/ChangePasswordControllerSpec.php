<?php

namespace Spec\Paroki\Security\Controller;

use Paroki\Resource\Entity\User;
use Paroki\Security\Controller\ChangePasswordController;
use PhpSpec\ObjectBehavior;

class ChangePasswordControllerSpec extends ObjectBehavior
{
    public function it_is_initializable()
    {
        $this->shouldHaveType(ChangePasswordController::class);
    }

    public function it_should_handle_change_password_action(User $user)
    {
        $this->changePasswordAction($user)->shouldReturn($user);
    }
}
