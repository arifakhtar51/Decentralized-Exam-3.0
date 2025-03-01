<?php
/**
 * Getting started controller class.
 *
 * @since 2.1.4
 *
 * @package  UserRegistration/Classes
 */

defined( 'ABSPATH' ) || exit;

/**
 * UR_Getting_Started Class
 */
class UR_Getting_Started {
	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'user-registration/v1';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'getting-started';

	/**
	 * Register routes.
	 *
	 * @since 2.1.4
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'ur_get_getting_started_settings' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permissions' ),
			)
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/save',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'ur_save_getting_started_settings' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permissions' ),
			)
		);
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/install-pages',
			array(
				'methods'             => 'POST',
				'callback'            => array( __CLASS__, 'ur_getting_started_install_pages' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permissions' ),
			)
		);
	}

	/**
	 * Save settings for getting started page.
	 *
	 * @since 2.1.4
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return array settings.
	 */
	public static function ur_save_getting_started_settings( $request ) {

		if ( ! isset( $request['settings'] ) ) {
			return;
		}

		$settings_to_update   = $request['settings'];
		$default_form_page_id = get_option( 'user_registration_default_form_page_id' );

		if ( isset( $settings_to_update['user_registration_general_setting_login_options'] ) ) {
			update_post_meta( absint( $default_form_page_id ), 'user_registration_form_setting_login_options', $settings_to_update['user_registration_general_setting_login_options'] );
		}

		if ( isset( $settings_to_update['user_registration_form_setting_enable_strong_password'] ) ) {
			update_post_meta( absint( $default_form_page_id ), 'user_registration_form_setting_enable_strong_password', $settings_to_update['user_registration_form_setting_enable_strong_password'] );
		}
		if ( isset( $settings_to_update['user_registration_form_setting_minimum_password_strength'] ) ) {
			update_post_meta( absint( $default_form_page_id ), 'user_registration_form_setting_minimum_password_strength', $settings_to_update['user_registration_form_setting_minimum_password_strength'] );
		}
		if ( isset( $settings_to_update['user_registration_form_setting_default_user_role'] ) ) {
			$all_roles      = ur_get_default_admin_roles();
			$role_to_update = $settings_to_update['user_registration_form_setting_default_user_role'];
			if ( ! isset( $all_roles[ $role_to_update ] ) ) {
				$role_to_update = isset( array_keys( $all_roles )[ $role_to_update ] ) ? array_keys( $all_roles )[ $role_to_update ] : 'subscriber';
			}
			update_post_meta( absint( $default_form_page_id ), 'user_registration_form_setting_default_user_role', $role_to_update );
		}

		foreach ( $settings_to_update as $option => $value ) {

			if ( 'users_can_register' === $option ) {
				$value = ur_string_to_bool( $value );
			}
			update_option( $option, $value );
		}

		return new \WP_REST_Response(
			array(
				'success' => true,
				'message' => __( 'OnBoarding completed successfully', 'user-registration' ),
			),
			200
		);
	}

	/**
	 * Install default pages when user hits Install & Proceed button in setup wizard.
	 *
	 * @since 2.1.4
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return array settings.
	 */
	public static function ur_getting_started_install_pages( $request ) {

		if ( ! isset( $request['install_pages'] ) || ! $request['install_pages'] ) {
			return new \WP_REST_Response(
				array(
					'success' => false,
					'message' => __( 'Pages cannot be installed', 'user-registration' ),
				),
				200
			);
		}

		include_once untrailingslashit( plugin_dir_path( UR_PLUGIN_FILE ) ) . '/includes/admin/functions-ur-admin.php';

		$pages                = apply_filters( 'user_registration_create_pages', array() );
		$default_form_page_id = get_option( 'user_registration_default_form_page_id' );
		$is_pro               = false !== ur_get_license_plan() ? true : false;

		if ( $default_form_page_id ) {
			$pages['registration'] = array(
				'name'    => _x( 'registration', 'Page slug', 'user-registration' ),
				'title'   => _x( 'Registration', 'Page title', 'user-registration' ),
				'content' => '[' . apply_filters( 'user_registration_form_shortcode_tag', 'user_registration_form' ) . ' id="' . esc_attr( $default_form_page_id ) . '"]',
			);
		}

		$pages['myaccount'] = array(
			'name'    => _x( 'my-account', 'Page slug', 'user-registration' ),
			'title'   => _x( 'My Account', 'Page title', 'user-registration' ),
			'content' => '[' . apply_filters( 'user_registration_my_account_shortcode_tag', 'user_registration_my_account' ) . ']',
		);

		$page_slug = array();
		foreach ( $pages as $key => $page ) {
			$post_id = ur_create_page( esc_sql( $page['name'] ), 'user_registration_' . $key . '_page_id', wp_kses_post( ( $page['title'] ) ), wp_kses_post( $page['content'] ) );
			array_push( $page_slug, get_post_field( 'post_name', $post_id ) );
		}

		return new \WP_REST_Response(
			array(
				'success'                => true,
				'page_slug'              => $page_slug,
				'default_form_id'        => $default_form_page_id,
				'is_pro'                 => $is_pro,
				'registration_page_link' => get_permalink( get_option( 'user_registration_registration_page_id' ) ),
			),
			200
		);
	}

	/**
	 * Get settings for getting started page.
	 *
	 * @since 2.1.4
	 *
	 * @return array settings.
	 */
	public static function ur_get_getting_started_settings() {

		$all_roles = ur_get_default_admin_roles();

		$all_roles_except_admin = $all_roles;

		unset( $all_roles_except_admin['administrator'] );

		$settings = array(
			'general_settings'      => array(
				'title'    => __( 'General', 'user-registration' ),
				'settings' => array(
					array(
						'title'   => __( 'Anyone can register', 'user-registration' ),
						'desc'    => __( 'Check to enable users to register', 'user-registration' ),
						'id'      => 'users_can_register',
						'type'    => 'checkbox',
						'default' => 'yes',
					),
					array(
						'title'   => __( 'User Approval And Login Option', 'user-registration' ),
						'desc'    => __( 'This option lets you choose login option after user registration.', 'user-registration' ),
						'id'      => 'user_registration_general_setting_login_options',
						'type'    => 'select',
						'default' => 0,
						'options' => ur_login_option(),
					),
					array(
						'title'   => __( 'Prevent WP Dashboard Access', 'user-registration' ),
						'desc'    => __( 'Selected user roles will not be able to view and access the WP Dashboard area.', 'user-registration' ),
						'id'      => 'user_registration_general_setting_disabled_user_roles',
						'type'    => 'multiselect',
						'default' => array( array_search( 'subscriber', array_keys( $all_roles_except_admin ) ) => 'subscriber' ),
						'options' => $all_roles_except_admin,
					),
				),
			),
			'registration_settings' => array(
				'title'    => __( 'Registration', 'user-registration' ),
				'settings' => array(
					array(
						'title'   => __( 'Enable Strong Password', 'user-registration' ),
						'desc'    => __( 'Enforce strong password.', 'user-registration' ),
						'id'      => 'user_registration_form_setting_enable_strong_password',
						'type'    => 'checkbox',
						'default' => 'no',
					),
					array(
						'title'   => __( 'Minimum Password Strength', 'user-registration' ),
						'desc'    => __( 'Set minimum required password strength.', 'user-registration' ),
						'id'      => 'user_registration_form_setting_minimum_password_strength',
						'type'    => 'radio',
						'default' => 3,
						'options' => array(
							'0' => __( 'Very Weak', 'user-registration' ),
							'1' => __( 'Weak', 'user-registration' ),
							'2' => __( 'Medium', 'user-registration' ),
							'3' => __( 'Strong', 'user-registration' ),
						),
					),
					array(
						'title'   => __( 'Default User Role', 'user-registration' ),
						'desc'    => __( 'Default role for the users registered through this form.', 'user-registration' ),
						'id'      => 'user_registration_form_setting_default_user_role',
						'type'    => 'select',
						'default' => 'subscriber',
						'options' => $all_roles,
					),
				),
			),
			'my_account_settings'   => array(
				'title'    => __( 'My Account', 'user-registration' ),
				'settings' => array(
					array(
						'title'   => __( 'My Account Page Layout', 'user-registration' ),
						'desc'    => __( 'Select account page layout.', 'user-registration' ),
						'id'      => 'user_registration_my_account_layout',
						'type'    => 'radio',
						'default' => 0,
						'options' => array(
							'horizontal' => __( 'Horizontal', 'user-registration' ),
							'vertical'   => __( 'Vertical', 'user-registration' ),
						),
					),
					array(
						'title'   => __( 'Disable profile picture', 'user-registration' ),
						'desc'    => __( 'Check to disable profile picture in edit profile page.', 'user-registration' ),
						'id'      => 'user_registration_disable_profile_picture',
						'type'    => 'checkbox',
						'default' => 'no',
					),
				),
			),
		);

		return new \WP_REST_Response(
			array(
				'success' => true,
				'options' => $settings,
			),
			200
		);
	}

	/**
	 * Check if a given request has access to update a setting
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * @return WP_Error|bool
	 */
	public static function check_admin_permissions( $request ) {
		return current_user_can( 'manage_options' );
	}
}
