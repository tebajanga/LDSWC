import { LitElement, html } from '../libs/lit-element/lit-element.js';
import {joinClassNames} from '../libs/ldswcutils/ldswcutils.js';
import {ldswcconfig} from '../ldswcconfig.js';

export default class MediaObject extends LitElement {
	static get properties() {
		return {
			/**
			 * Optional class name which is appended to the body div
			 */
			bodyClassName: { type: String },
			/**
			 * class name
			 */
			className: { type: String },
			/**
			 * horizontally centers figures with content
			 */
			center: { type: Boolean },
			/**
			 * Renders a customTag instead of a div
			 */
			customTag: { type: String },
			/**
			 * sets a figure on the left side of the media object
			 */
			figureLeft: { type: String },
			/**
			 * sets a figure on the right side of the media object
			 */
			figureRight: { type: String },
			/**
			 * Function to render figureLeft. Receives (elem, classes) as arguments
			 */
			renderFigureLeft: { type: String },
			/**
			 * Function to render figureRight. Receives (elem, classes) as arguments
			 */
			renderFigureRight: { type: String },
			/**
			 * renders a responsive variant of the MediaObject
			 */
			responsive: { type: Boolean },
			/**
			 * Sizes: small, large
			 */
			size: { type: String }, // oneOf(['small', 'large']),
			/**
			 * truncates the body, requires title
			 */
			truncate: { type: Boolean },
			/**
			 * title is necessary if truncate is used
			 */
			title: { type: String },
		}
	}

	constructor() {
		super();
		this.bodyClassName = null;
		this.className = null;
		this.center = true;
		this.customTag = null;
		this.figureLeft = null;
		this.figureRight = null;
		this.responsive = null;
		this.size = null;
		this.truncate = null;
		this.title = null;
		this.renderFigureLeft = null;
		this.renderFigureRight = null;
  }
  
 	renderFigure(figure, classes) {
		return html`
<div class=${joinClassNames(classes)}>${figure}</div>`
	}

	render() {
		//const otherattrs = getRestOfAttribs(this.attributes, this.constructor.properties);
		const Tag = this.customTag || 'div';
		
		const figureLeftRenderer = this.renderFigureLeft || this.renderFigure;
		const figureRightRenderer = this.renderFigureRight || this.renderFigure;
		
		const sldsClasses = [
			'slds-media',
			{ 'slds-media_center': this.center },
			{ 'slds-media_responsive': this.responsive },
			{ [`slds_media_${this.size}`]: !!this.size},
			this.className
		];
		
		const bodyClasses = [
			'slds-media__body',
			{ 'slds--truncate': this.truncate },
			this.bodyClassName
		];
		
		const leftFigureClasses = [
			'slds-media__figure'
		];
		
		const rightFigureClasses = [
			'slds-media__figure',
			'slds-media__figure_reverse'
		];

		return html`
<style>
@import '${ldswcconfig.ldsBasePath}/styles/salesforce-lightning-design-system.css';
</style>
<div class=${joinClassNames(sldsClasses)}>
  ${this.figureLeft && figureLeftRenderer(this.figureLeft, leftFigureClasses)}
  <div
    class=${joinClassNames(bodyClasses)}
    title=${this.title}
  >
    <slot></slot>
  </div>
  ${this.figureRight && figureRightRenderer(this.figureRight, rightFigureClasses)}
</div>
`;
	}
}

customElements.define('ldswc-mediaobject', MediaObject);