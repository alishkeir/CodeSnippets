// * Modules
import './js/modules/script';

// * Utils
import './js/utils/globals';

// * Sprite

// Require the .svg files:
require.context('./assets/images/svg', true, /\.svg$/);

// Use it in HTML:
//<svg><use xlink:href="#file-name(without .svg)"></use></svg>

// Use it in CSS/SCSS:
// background-image: url("./sprite.svg#file-name(without .svg)");
