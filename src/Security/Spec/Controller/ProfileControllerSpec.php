<?php

namespace Spec\Paroki\Security\Controller;

use Paroki\Resource\Entity\User;
use Paroki\Security\Controller\ProfileController;
use PhpSpec\ObjectBehavior;

class ProfileControllerSpec extends ObjectBehavior
{
    public function it_is_initializable()
    {
        $this->shouldHaveType(ProfileController::class);
    }

    public function it_should_handle_update_action(User $user)
    {
        $this->updateAction($user)->shouldReturn($user);
    }

    public function it_should_handle_change_password_action(User $user)
    {
        $this->changePasswordAction($user)->shouldReturn($user);
    }
}
