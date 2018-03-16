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

namespace Paroki\Security\Serializer;

use Symfony\Component\Serializer\Normalizer\DenormalizableInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizableInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class UserSerializer implements NormalizableInterface, DenormalizableInterface
{
    private $normalizer;

    /**
     * UserSerializer constructor.
     *
     * @param NormalizerInterface $normalizer
     */
    public function __construct(NormalizerInterface $normalizer)
    {
        $this->normalizer = $normalizer;
    }

    public function normalize(NormalizerInterface $normalizer, $format = null, array $context = array())
    {
        // TODO: Implement normalize() method.
    }

    public function denormalize(DenormalizerInterface $denormalizer, $data, $format = null, array $context = array())
    {
        // TODO: Implement denormalize() method.
    }
}
