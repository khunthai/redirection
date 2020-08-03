/**
 * External dependencies
 */

import React from 'react';
import { translate as __ } from 'wp-plugin-lib/locale';

/**
 * Internal dependencies
 */
import { getSourceFlags } from './constants';
import TableRow from './table-row';
import MultiOptionDropdown from 'wp-plugin-components/multi-option-dropdown';

const getUrlFlags = ( { flag_case, flag_regex, flag_trailing } ) =>
	[ flag_case ? 'flag_case' : null, flag_regex ? 'flag_regex' : null, flag_trailing ? 'flag_trailing' : null ].filter(
		( item ) => item
	);

const RedirectSourceUrl = ( { url, flags, defaultFlags, onFlagChange, onChange, autoFocus = false } ) => {
	const flagOptions = getSourceFlags();

	if ( Array.isArray( url ) ) {
		return (
			<TableRow title={ __( 'Source URL' ) } className="top">
				<textarea value={ url.join( '\n' ) } readOnly />
			</TableRow>
		);
	}

	function changeFlag( selected ) {
		onFlagChange( {
			flag_case: selected.indexOf( 'flag_case' ) !== -1,
			flag_trailing: selected.indexOf( 'flag_trailing' ) !== -1,
			flag_regex: selected.indexOf( 'flag_regex' ) !== -1,
		} );
	}

	return (
		<TableRow title={ __( 'Source URL' ) } className="redirect-edit__source">
			<input
				type="text"
				name="url"
				value={ url }
				onChange={ onChange }
				autoFocus={ autoFocus }
				className="regular-text"
				placeholder={ __( 'The relative URL you want to redirect from' ) }
			/>

			<MultiOptionDropdown
				options={ flagOptions }
				selected={ getUrlFlags( flags ) }
				onApply={ changeFlag }
				title={ __( 'URL options / Regex' ) }
				badges
				multiple
				hideTitle
			/>
		</TableRow>
	);
};

export default RedirectSourceUrl;
