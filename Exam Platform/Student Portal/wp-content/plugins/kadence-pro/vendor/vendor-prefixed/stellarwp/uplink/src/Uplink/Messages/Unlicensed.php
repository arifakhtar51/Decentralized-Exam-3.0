<?php
/**
 * @license GPL-2.0-or-later
 *
 * Modified by kadencewp on 03-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace KadenceWP\KadencePro\StellarWP\Uplink\Messages;

class Unlicensed extends Message_Abstract {
	/**
	 * @inheritDoc
	 */
	public function get(): string {
        $message  = '<div class="notice notice-warning"><p>';
        $message .= esc_html__( 'No license entered.', '%TEXTDOMAIN%' );
        $message .= '</p></div>';

		return $message;
	}
}
