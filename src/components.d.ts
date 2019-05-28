/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppRoot {}
  interface MxMessages {}
}

declare namespace LocalJSX {
  interface AppRoot extends JSXBase.HTMLAttributes {}
  interface MxMessages extends JSXBase.HTMLAttributes {}

  interface IntrinsicElements {
    'app-root': AppRoot;
    'mx-messages': MxMessages;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


declare global {

  // Adding a global JSX for backcompatibility with legacy dependencies
  export namespace JSX {
    export interface Element {}
  }



  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLMxMessagesElement extends Components.MxMessages, HTMLStencilElement {}
  var HTMLMxMessagesElement: {
    prototype: HTMLMxMessagesElement;
    new (): HTMLMxMessagesElement;
  };

  interface HTMLElementTagNameMap {
    'app-root': HTMLAppRootElement;
    'mx-messages': HTMLMxMessagesElement;
  }

  interface ElementTagNameMap extends HTMLElementTagNameMap {}
}
