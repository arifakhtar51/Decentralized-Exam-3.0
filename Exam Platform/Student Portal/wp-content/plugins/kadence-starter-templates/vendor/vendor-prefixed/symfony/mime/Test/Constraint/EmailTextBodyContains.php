<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Modified by kadencewp on 29-May-2024 using {@see https://github.com/BrianHenryIE/strauss}.
 */

namespace KadenceWP\KadenceStarterTemplates\Symfony\Component\Mime\Test\Constraint;

use PHPUnit\Framework\Constraint\Constraint;
use KadenceWP\KadenceStarterTemplates\Symfony\Component\Mime\Message;
use KadenceWP\KadenceStarterTemplates\Symfony\Component\Mime\RawMessage;

final class EmailTextBodyContains extends Constraint
{
    private $expectedText;

    public function __construct(string $expectedText)
    {
        $this->expectedText = $expectedText;
    }

    /**
     * {@inheritdoc}
     */
    public function toString(): string
    {
        return sprintf('contains "%s"', $this->expectedText);
    }

    /**
     * {@inheritdoc}
     *
     * @param RawMessage $message
     */
    protected function matches($message): bool
    {
        if (RawMessage::class === \get_class($message) || Message::class === \get_class($message)) {
            throw new \LogicException('Unable to test a message text body on a RawMessage or Message instance.');
        }

        return false !== mb_strpos($message->getTextBody(), $this->expectedText);
    }

    /**
     * {@inheritdoc}
     *
     * @param RawMessage $message
     */
    protected function failureDescription($message): string
    {
        return 'the Email text body '.$this->toString();
    }
}
