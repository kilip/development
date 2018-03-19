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

namespace Paroki\Security\Validator;

use Symfony\Component\Validator\Constraint;

class CurrentPassword extends Constraint
{
    public $message = 'Your current password is not valid';

    /**
     * @return string
     */
    public function validatedBy()
    {
        return 'user.validator.current_password';
    }
}
