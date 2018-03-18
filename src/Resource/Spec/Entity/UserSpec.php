<?php

namespace Spec\Paroki\Resource\Entity;

use FOS\UserBundle\Model\GroupInterface;
use Paroki\Resource\Entity\User;
use PhpSpec\ObjectBehavior;

class UserSpec extends ObjectBehavior
{
    public function it_is_initializable()
    {
        $this->shouldHaveType(User::class);
    }

    public function its_id_should_be_readonly()
    {
        $this->getId()->shouldReturn(null);
    }

    public function its_fullname_should_be_mutable()
    {
        $this->getFullName()->shouldReturn(null);
        $this->setFullName('Some Name')->shouldReturn($this);
        $this->getFullName()->shouldReturn('Some Name');
    }

    public function its_plain_password_should_be_mutable()
    {
        $this->setPlainPassword('some')->shouldReturn($this);
        $this->getPlainPassword()->shouldReturn('some');
    }

    public function its_plain_password_confirm_should_be_mutable()
    {
        $this->setPlainPasswordConfirm('some')->shouldReturn($this);
        $this->getPlainPasswordConfirm()->shouldReturn('some');
    }

    public function its_current_password_should_be_mutable()
    {
        $this->setCurrentPassword('some')->shouldReturn($this);
        $this->getCurrentPassword()->shouldReturn('some');
    }

    public function its_should_returns_get_roles_properly()
    {
        $this->addRole('ADMIN');
        $this->getRoles()->shouldReturn(array(
            'ADMIN',
        ));

        $this->addRole('ADMIN_PAROKI');
        $this->getRoles()->shouldReturn(array(
            'ADMIN',
            'ADMIN_PAROKI',
        ));

        $this->addRole('ADMIN');
        $this->getRoles()->shouldReturn(array(
            'ADMIN',
            'ADMIN_PAROKI',
        ));

        $this->addRole('USER');
        $this->getRoles()->shouldReturn(array(
            'ADMIN',
            'ADMIN_PAROKI',
        ));
    }

    public function it_should_get_roles_from_groups(GroupInterface $group)
    {
        $group->getRoles()->willReturn(array('ADMIN'));
        $this->addGroup($group);
        $this->getRoles()->shouldReturn(array(
            'ADMIN',
        ));
    }

    public function it_should_validate_password()
    {
        $this->isPlainPasswordConfirm()->shouldReturn(true);
        $this->setPlainPassword('some')->shouldReturn($this);
        $this->setPlainPasswordConfirm('some')->shouldReturn($this);
        $this->isPlainPasswordConfirm()->shouldReturn(true);

        $this->setPlainPasswordConfirm('false')->shouldReturn($this);
        $this->isPlainPasswordConfirm()->shouldReturn(false);
    }
}
