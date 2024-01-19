/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	RichText,
	AlignmentControl,
	BlockControls,
	InspectorControls,
	PanelColorSettings
} from '@wordpress/block-editor';

import {
	TextControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	ExternalLink
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const {
		content,
		align,
		backgroundColor,
		textColor,
		reactLink,
		linkLabel,
		hasLinkNofollow,
	} = attributes;

	const onChangereactLink = (newReactLink) => {
		setAttributes({ reactLink: newReactLink === undefined ? "" : newReactLink });
	};

	const onChangeLinkLabel = (newLinkLabel) => {
		setAttributes({
			linkLabel: newLinkLabel === undefined ? "" : newLinkLabel,
		});
	};

	const toggleNofollow = () => {
		setAttributes({ hasLinkNofollow: !hasLinkNofollow });
	};

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent })
	}

	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes({ backgroundColor: newBackgroundColor });
	}

	const onChangeTextColor = ( newTextColor ) => {
		setAttributes({ textColor: newTextColor });
	}

	const onChangeAlign = ( newAlign ) => {
		setAttributes( { 
			align: newAlign === undefined ? 'none' : newAlign,
		})
	}

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={__("Color settings", "react-block")}
					initialOpen={false}
					colorSettings={[
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __("Text color", "react-block"),
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __("Background color", "react-block"),
						},
					]}
				/>
				<PanelBody title={__("Link Settings")} initialOpen={true}>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__("react block link", "react-block")}
								value={reactLink}
								onChange={onChangereactLink}
								help={__("Add your link", "react-block")}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<TextControl
								label={__("Link label", "react-block")}
								value={linkLabel}
								onChange={onChangeLinkLabel}
								help={__("Add link label", "react-block")}
							/>
						</fieldset>
					</PanelRow>
					<PanelRow>
						<fieldset>
							<ToggleControl
								label="Add rel = nofollow"
								value={linkLabel}
								help={hasLinkNofollow ? "Has rel nofollow." : "No rel nofollow"}
								checked={hasLinkNofollow}
								onChange={toggleNofollow}
							/>
						</fieldset>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentControl value={attributes.align} onChange={onChangeAlign} />
			</BlockControls>
			<div {...blockProps}>
				<RichText
					tagName="p"
					onChange={onChangeContent}
					allowedFormats={["core/bold", "core/italic"]}
					value={attributes.content}
					placeholder={__("Write your text...")}
					style={{
						textAlign: align,
						backgroundColor: backgroundColor,
						color: textColor,
					}}
				></RichText>
				<ExternalLink
					href={reactLink}
					className="react-button"
					rel={hasLinkNofollow ? "nofollow" : ""}
				>
					{linkLabel}
				</ExternalLink>
			</div>
		</>
	);
}
