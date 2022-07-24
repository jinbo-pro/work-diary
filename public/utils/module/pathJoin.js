/**
 * node/path: https://github.com/nodejs/node/blob/master/lib/path.js
 * source:    https://www.yisu.com/zixun/176464.html
 * esbuild join
 */
var g=47,h=92,d=46;function u(n){return n===g||n===h}function v(n){return n===g}function A(n){if(n.length===0)return".";var l=n.charCodeAt(0)===g,t=n.charCodeAt(n.length-1)===g;return n=C(n,!l,"/",v),n.length===0&&!l&&(n="."),n.length>0&&t&&(n+="/"),l?"/"+n:n}function C(n,l,t,a){for(var e="",s=0,r=-1,i=0,o,f=0;f<=n.length;++f){if(f<n.length)o=n.charCodeAt(f);else{if(a(o))break;o=g}if(a(o)){if(!(r===f-1||i===1))if(r!==f-1&&i===2){if(e.length<2||s!==2||e.charCodeAt(e.length-1)!==d||e.charCodeAt(e.length-2)!==d){if(e.length>2){let c=e.lastIndexOf(t);if(c!==e.length-1){c===-1?(e="",s=0):(e=e.slice(0,c),s=e.length-1-e.lastIndexOf(t)),r=f,i=0;continue}}else if(e.length===2||e.length===1){e="",s=0,r=f,i=0;continue}}l&&(e.length>0?e+=`${t}..`:e="..",s=2)}else e.length>0?e+=t+n.slice(r+1,f):e=n.slice(r+1,f),s=f-r-1;r=f,i=0}else o===d&&i!==-1?++i:i=-1}return e}function S(){if(arguments.length===0)return".";for(var n=arguments[0].indexOf("/")>-1?"/":"\\",l,t,a=0;a<arguments.length;++a){var e=arguments[a];e.length>0&&(l===void 0?l=t=e:l+=n+e)}if(l===void 0)return".";var s=!0,r=0;if(u(t.charCodeAt(0))){++r;var i=t.length;i>1&&u(t.charCodeAt(1))&&(++r,i>2&&(u(t.charCodeAt(2))?++r:s=!1))}if(s){for(;r<l.length&&u(l.charCodeAt(r));++r);r>=2&&(l=n+l.slice(r))}return A(l)}
/**
 * 路径合并
 * see: node.path.join
 */
export const join=S;
