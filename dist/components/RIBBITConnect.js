"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ribbitConnectMeta = _interopRequireDefault(require("ribbit-connect-meta"));
var _stylesheet = require("./stylesheet");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const RIBBITConnect = props => {
  const {
      token,
      language,
      style,
      inline = false,
      fullscreen = false,
      settings = {},
      className,
      onMessage,
      open = true,
      environment,
      environmentOverrideURL,
      getContext
    } = props,
    containerRef = (0, _react.useRef)(null),
    RIBBITConnectContext = (0, _react.useRef)(null),
    {
      curtainColor,
      curtainAllowClose = true
    } = settings;
  (0, _react.useEffect)(() => {
    if (!RIBBITConnectContext.current) RIBBITConnectContext.current = new _ribbitConnectMeta.default({
      token,
      settings,
      inline,
      language,
      environment,
      environmentOverrideURL,
      fullscreen
    });
    containerRef.current.appendChild(RIBBITConnectContext.current.iFrame);
    RIBBITConnectContext.current.onMessage((functionName, message) => {
      if (onMessage) onMessage(functionName, message);
    });
    RIBBITConnectContext.current.CONNECTEvents.map(eventName => {
      const propName = 'on' + (eventName.charAt(0).toUpperCase() + eventName.slice(1));
      if (props[propName]) RIBBITConnectContext.current.on(eventName, props[propName]);
    });
  }, []);
  (0, _react.useEffect)(() => {
    if (getContext) getContext({
      RIBBITConnect: RIBBITConnectContext === null || RIBBITConnectContext === void 0 ? void 0 : RIBBITConnectContext.current
    });
    var existingStyles = document.getElementById('react-ribbit-connect-styles');
    if (!existingStyles) {
      var style = document.createElement('style');
      style.id = 'react-ribbit-connect-styles';
      style.innerHTML = _stylesheet.stylesheet;
      document.head.appendChild(style);
    }
  }, [getContext]);
  (0, _react.useEffect)(() => {
    if (open == false) return;
    setTimeout(() => {
      window.scrollTo(0, window.scrollY + 100);
    }, 1000);
  }, [open]);
  const closePopup = () => {
    if (curtainAllowClose == false) return;
    RIBBITConnectContext.current.sendMessage('exit', null);
  };
  if (inline) return /*#__PURE__*/_react.default.createElement("div", {
    ref: containerRef,
    className: className,
    style: style
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "RIBBIT-popup" + (className ? ' ' + className : '') + (open ? ' RIBBIT-popup-open' : '') + (inline ? ' RIBBIT-popup-inline' : ' RIBBIT-popup-popup'),
    ref: containerRef,
    style: style,
    onClick: closePopup
  }, /*#__PURE__*/_react.default.createElement("style", {
    global: "true"
  }, "\n                ".concat(inline == false && open == true ? "\n                    body {\n                        //overflow: hidden;\n                        //position: fixed;\n                    }\n                " : "", "\n            ")), /*#__PURE__*/_react.default.createElement("div", {
    className: "RIBBIT-popup-curtain",
    style: {
      backgroundColor: curtainColor ? curtainColor : null
    }
  }));
};
RIBBITConnect.displayName = 'RIBBITConnect';
var _default = RIBBITConnect;
exports.default = _default;