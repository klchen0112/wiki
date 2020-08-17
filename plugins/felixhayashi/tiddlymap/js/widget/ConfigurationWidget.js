"use strict";var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};/* @preserve TW-Guard */
/*\

title: $:/plugins/felixhayashi/tiddlymap/js/widget/MapConfigWidget
type: application/javascript
module-type: widget

@preserve

\*/
/* @preserve TW-Guard */var _utils=require("$:/plugins/felixhayashi/tiddlymap/js/utils");var _utils2=_interopRequireDefault(_utils);var _vis=require("$:/plugins/felixhayashi/vis/vis.js");var _vis2=_interopRequireDefault(_vis);var _widget=require("$:/core/modules/widgets/widget.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function MapConfigWidget(e,t){_widget.widget.call(this);this.initialise(e,t);this.computeAttributes()}MapConfigWidget.prototype=Object.create(_widget.widget.prototype);MapConfigWidget.prototype.render=function(e,t){this.parentDomNode=e;if(!this.domNode){this.domNode=this.document.createElement("div");$tw.utils.addClass(this.domNode,"tmap-config-widget");e.insertBefore(this.domNode,t)}if(this.network){this.network.destroy()}this.networkContainer=document.createElement("div");this.domNode.appendChild(this.networkContainer);this.refreshTrigger=this.getAttribute("refresh-trigger");this.pipeTRef=this.getVariable("currentTiddler");this.inheritedFields=$tw.utils.parseStringArray(this.getAttribute("inherited"));this.extensionTField=this.getAttribute("extension");this.mode=this.getAttribute("mode");for(var i=0;i<this.inheritedFields.length;i++){var s=this.inheritedFields[i];var n=_utils2.default.parseFieldData(this.pipeTRef,s,{});if(this.mode==="manage-edge-types"){n={edges:n}}else if(this.mode==="manage-node-types"){n={nodes:n}}this.inherited=_utils2.default.merge(this.inherited,n)}this.extension=_utils2.default.parseFieldData(this.pipeTRef,this.extensionTField,{});if(this.mode==="manage-edge-types"){if(!this.extension.edges){this.extension={edges:this.extension}}}else if(this.mode==="manage-node-types"){if(!this.extension.nodes){this.extension={nodes:this.extension}}}var r=_utils2.default.isTrue(this.getAttribute("save-only-changes"));this.changes=r?{}:this.extension;var o={nodes:[],edges:[]};var a=_utils2.default.merge({},this.inherited,this.extension);$tw.utils.extend(a,{configure:{enabled:true,showButton:false,filter:this.getOptionFilter(this.mode)}});this.network=new _vis2.default.Network(this.networkContainer,o,a);this.network.on("configChange",this.handleConfigChange.bind(this));var l=this.parentDomNode.getBoundingClientRect().height;this.parentDomNode.style["height"]=l+"px";var h=this.handleResetEvent.bind(this);this.networkContainer.addEventListener("reset",h,false);$tm.registry.push(this);this.enhanceConfigurator()};MapConfigWidget.prototype.handleResetEvent=function(e){var t={};t[e.detail.trigger.path]=null;this.handleConfigChange(t)};MapConfigWidget.prototype.handleConfigChange=function(e){var t=_utils2.default.flatten(this.changes);var i=_utils2.default.flatten(e);var s=Object.keys(_utils2.default.flatten(e))[0];var n=i[s]===null;if(n){t[s]=undefined;this.changes=_utils2.default.unflatten(t)}else{this.changes=_utils2.default.merge(this.changes,e)}var r=_utils2.default.merge({},this.changes);if(this.mode==="manage-node-types"){r=r["nodes"]}if(this.mode==="manage-edge-types"){r=r["edges"]}_utils2.default.writeFieldData(this.pipeTRef,this.extensionTField,r,$tm.config.sys.jsonIndentation);var o="vis-configuration-wrapper";var a=this.networkContainer.getElementsByClassName(o)[0];a.style.height=a.getBoundingClientRect().height+"px";if(n){window.setTimeout(this.refresh.bind(this),0)}else{window.setTimeout(this.enhanceConfigurator.bind(this),50)}};MapConfigWidget.prototype.enhanceConfigurator=function(){var e="vis-configuration-wrapper";var t=this.networkContainer.getElementsByClassName(e)[0].children;var i=[];var s=_utils2.default.flatten(this.changes);for(var n=0;n<t.length;n++){if(!t[n].classList.contains("vis-config-item"))continue;var r=new VisConfElement(t[n],i,n);i.push(r);if(r.level===0)continue;r.setActive(!!s[r.path])}};function VisConfElement(e,t,i){var s="getElementsByClassName";this.el=e;this.labelEl=e[s]("vis-config-label")[0]||e[s]("vis-config-header")[0]||e;var n=this.labelEl.innerText||this.labelEl.textContent;this.label=n&&n.match(/([a-zA-Z0-9]+)/)[1];this.level=parseInt(e.className.match(/.*vis-config-s(.).*/)[1])||0;this.path=this.label;if(this.level>0){for(var r=i;r--;){var o=t[r];if(o.level<this.level){this.path=o.path+"."+this.path;break}}}}VisConfElement.prototype.setActive=function(e){if(!e)return;var t="tmap-vis-config-item-"+(e?"active":"inactive");$tw.utils.addClass(this.el,t);if(e){var i=document.createElement("button");i.innerHTML="reset";i.className="tmap-config-item-reset";var s=this;i.addEventListener("click",function(e){e.currentTarget.dispatchEvent(new CustomEvent("reset",{detail:{trigger:s},bubbles:true,cancelable:true}))},false);this.el.appendChild(i)}};MapConfigWidget.prototype.getOptionFilter=function(e){var t={nodes:{borderWidth:true,borderWidthSelected:true,widthConstraint:true,heightConstraint:true,color:{background:true,border:true},font:{color:true,size:true},icon:true,labelHighlightBold:false,shadow:true,shape:true,shapeProperties:{borderDashes:true},size:true},edges:{arrows:true,color:true,dashes:true,font:true,labelHighlightBold:false,length:true,selfReferenceSize:false,shadow:true,smooth:true,width:true},interaction:{hideEdgesOnDrag:true,hideNodesOnDrag:true,tooltipDelay:true},layout:{hierarchical:true},manipulation:{initiallyActive:true},physics:{forceAtlas2Based:{gravitationalConstant:true,springLength:true,springConstant:true,damping:true,centralGravity:true}}};if(e==="manage-edge-types"){t={edges:t.edges}}else if(e==="manage-node-types"){t={nodes:t.nodes}}else{t.edges.arrows=false}return function(e,i){i=i.concat([e]);var s=t;for(var n=0,r=i.length;n<r;n++){if(s[i[n]]===true){return true}else if(s[i[n]]==null){return false}s=s[i[n]]}return false}};MapConfigWidget.prototype.isZombieWidget=function(){return!document.body.contains(this.parentDomNode)};MapConfigWidget.prototype.destruct=function(){if(this.network){this.network.destroy()}};MapConfigWidget.prototype.refresh=function(e){if(this.isZombieWidget()||!this.network)return;if(!e||e[this.refreshTrigger]){this.refreshSelf();return true}};MapConfigWidget.prototype.setNull=function(e){for(var t in e){if(_typeof(e[t])=="object"){this.setNull(e[t])}else{e[t]=undefined}}};exports["tmap-config"]=MapConfigWidget;
//# sourceMappingURL=./maps/felixhayashi/tiddlymap/js/widget/ConfigurationWidget.js.map
