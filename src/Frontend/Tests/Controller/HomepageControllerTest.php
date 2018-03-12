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

namespace Paroki\Frontend\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class HomepageControllerTest extends WebTestCase
{
    public function testHomepage()
    {
        $client = static::createClient();
        $client->request('GET', '/');
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }
}
