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

namespace Paroki\Frontend\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomepageController extends Controller
{
    /**
     * @Route(name="homepage", path="/")
     */
    public function indexAction()
    {
        $template = '@frontend/index.html.twig';
        //@codeCoverageIgnoreStart
        if (getenv('APP_COMING_SOON')) {
            $template = '@frontend/coming-soon.html.twig';
        }
        //@codeCoverageIgnoreEnd

        return $this->render($template);
    }
}
