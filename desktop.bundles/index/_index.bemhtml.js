(function(g) {
  var __bem_xjst = function(exports) {
     var $$mode = "", $$block = "", $$elem = "", $$elemMods = null, $$mods = null;

var __$ref = {};

function apply(ctx) {
    ctx = ctx || this;
    $$mods = ctx["mods"];
    $$elemMods = ctx["elemMods"];
    $$elem = ctx["elem"];
    $$block = ctx["block"];
    $$mode = ctx["_mode"];
    try {
        return applyc(ctx, __$ref);
    } catch (e) {
        e.xjstContext = ctx;
        throw e;
    }
}

exports.apply = apply;

function applyc(__$ctx, __$ref) {
    var __$t = $$mode;
    if (__$t === "content") {
        var __$r = __$g0(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "js") {
        var __$r = __$g1(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "attrs") {
        var __$r = __$g2(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "tag") {
        var __$r = __$g3(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "bem") {
        var __$t = $$block;
        if (__$t === "page") {
            var __$t = $$elem;
            if (__$t === "js") {
                return false;
            } else if (__$t === "head") {
                return false;
            } else if (__$t === "favicon") {
                return false;
            } else if (__$t === "link") {
                return false;
            } else if (__$t === "meta") {
                return false;
            } else if (__$t === "css") {
                return false;
            }
        } else if (__$t === "ua") {
            if (!$$elem) {
                return false;
            }
        }
        return undefined;
    } else if (__$t === "default") {
        var __$r = __$g4(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    } else if (__$t === "mix") {
        var __$t = $$block;
        if (__$t === "button") {
            if (!$$elem) {
                return {
                    elem: "control"
                };
            }
        } else if (__$t === "link") {
            if (!$$elem) {
                return [ {
                    elem: "control"
                } ];
            }
        } else if (__$t === "menu") {
            if (!$$elem) {
                return [ {
                    elem: "control"
                } ];
            }
        } else if (__$t === "radio-group") {
            if (!$$elem) {
                return [ {
                    block: "control-group"
                } ];
            }
        }
        return undefined;
    } else if (__$t === "cls") {
        return undefined;
    } else if (__$t === "") {
        if (__$ctx.ctx && __$ctx.ctx._vow && (__$ctx.__$a0 & 2097152) === 0) {
            var __$r = __$b110(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isSimple(__$ctx.ctx)) {
            var __$r = __$b111(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (!__$ctx.ctx) {
            var __$r = __$b112(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        if (__$ctx.isArray(__$ctx.ctx)) {
            var __$r = __$b113(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$r = __$b114(__$ctx, __$ref);
        if (__$r !== __$ref) return __$r;
    }
}

[ function(exports, context) {
    var undef, BEM_ = {}, toString = Object.prototype.toString, slice = Array.prototype.slice, isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
    }, SHORT_TAGS = {
        area: 1,
        base: 1,
        br: 1,
        col: 1,
        command: 1,
        embed: 1,
        hr: 1,
        img: 1,
        input: 1,
        keygen: 1,
        link: 1,
        meta: 1,
        param: 1,
        source: 1,
        wbr: 1
    };
    (function(BEM, undefined) {
        var MOD_DELIM = "_", ELEM_DELIM = "__", NAME_PATTERN = "[a-zA-Z0-9-]+";
        function buildModPostfix(modName, modVal) {
            var res = MOD_DELIM + modName;
            if (modVal !== true) res += MOD_DELIM + modVal;
            return res;
        }
        function buildBlockClass(name, modName, modVal) {
            var res = name;
            if (modVal) res += buildModPostfix(modName, modVal);
            return res;
        }
        function buildElemClass(block, name, modName, modVal) {
            var res = buildBlockClass(block) + ELEM_DELIM + name;
            if (modVal) res += buildModPostfix(modName, modVal);
            return res;
        }
        BEM.INTERNAL = {
            NAME_PATTERN: NAME_PATTERN,
            MOD_DELIM: MOD_DELIM,
            ELEM_DELIM: ELEM_DELIM,
            buildModPostfix: buildModPostfix,
            buildClass: function(block, elem, modName, modVal) {
                var typeOfModName = typeof modName;
                if (typeOfModName === "string" || typeOfModName === "boolean") {
                    var typeOfModVal = typeof modVal;
                    if (typeOfModVal !== "string" && typeOfModVal !== "boolean") {
                        modVal = modName;
                        modName = elem;
                        elem = undef;
                    }
                } else if (typeOfModName !== "undefined") {
                    modName = undef;
                } else if (elem && typeof elem !== "string") {
                    elem = undef;
                }
                if (!(elem || modName)) {
                    return block;
                }
                return elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal);
            },
            buildModsClasses: function(block, elem, mods) {
                var res = "";
                if (mods) {
                    var modName;
                    for (modName in mods) {
                        if (!mods.hasOwnProperty(modName)) continue;
                        var modVal = mods[modName];
                        if (!modVal && modVal !== 0) continue;
                        typeof modVal !== "boolean" && (modVal += "");
                        res += " " + (elem ? buildElemClass(block, elem, modName, modVal) : buildBlockClass(block, modName, modVal));
                    }
                }
                return res;
            },
            buildClasses: function(block, elem, mods) {
                var res = "";
                res += elem ? buildElemClass(block, elem) : buildBlockClass(block);
                res += this.buildModsClasses(block, elem, mods);
                return res;
            }
        };
    })(BEM_);
    var ts = {
        '"': "&quot;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;"
    }, f = function(t) {
        return ts[t] || t;
    };
    var buildEscape = function(r) {
        r = new RegExp(r, "g");
        return function(s) {
            return ("" + s).replace(r, f);
        };
    };
    context.BEMContext = BEMContext;
    function BEMContext(context, apply_) {
        this.ctx = typeof context === "undefined" ? "" : context;
        this.apply = apply_;
        this._str = "";
        var _this = this;
        this._buf = {
            push: function() {
                var chunks = slice.call(arguments).join("");
                _this._str += chunks;
            },
            join: function() {
                return this._str;
            }
        };
        this._ = this;
        this._start = true;
        this._mode = "";
        this._listLength = 0;
        this._notNewList = false;
        this.position = 0;
        this.block = undef;
        this.elem = undef;
        this.mods = undef;
        this.elemMods = undef;
    }
    BEMContext.prototype.isArray = isArray;
    BEMContext.prototype.isSimple = function isSimple(obj) {
        if (!obj || obj === true) return true;
        var t = typeof obj;
        return t === "string" || t === "number";
    };
    BEMContext.prototype.isShortTag = function isShortTag(t) {
        return SHORT_TAGS.hasOwnProperty(t);
    };
    BEMContext.prototype.extend = function extend(o1, o2) {
        if (!o1 || !o2) return o1 || o2;
        var res = {}, n;
        for (n in o1) o1.hasOwnProperty(n) && (res[n] = o1[n]);
        for (n in o2) o2.hasOwnProperty(n) && (res[n] = o2[n]);
        return res;
    };
    var cnt = 0, id = +new Date(), expando = "__" + id, get = function() {
        return "uniq" + id + ++cnt;
    };
    BEMContext.prototype.identify = function(obj, onlyGet) {
        if (!obj) return get();
        if (onlyGet || obj[expando]) {
            return obj[expando];
        } else {
            return obj[expando] = get();
        }
    };
    BEMContext.prototype.xmlEscape = buildEscape("[&<>]");
    BEMContext.prototype.attrEscape = buildEscape('["&<>]');
    BEMContext.prototype.BEM = BEM_;
    BEMContext.prototype.isFirst = function isFirst() {
        return this.position === 1;
    };
    BEMContext.prototype.isLast = function isLast() {
        return this.position === this._listLength;
    };
    BEMContext.prototype.generateId = function generateId() {
        return this.identify(this.ctx);
    };
    var oldApply = exports.apply;
    exports.apply = BEMContext.apply = function BEMContext_apply(context) {
        var ctx = new BEMContext(context || this, oldApply);
        ctx.apply();
        return ctx._str;
    };
    BEMContext.prototype.reapply = BEMContext.apply;
} ].forEach(function(fn) {
    fn(exports, this);
}, {
    recordExtensions: function(ctx) {
        ctx["__$a0"] = 0;
        ctx["_mode"] = undefined;
        ctx["ctx"] = undefined;
        ctx["_select"] = undefined;
        ctx["_checkedOptions"] = undefined;
        ctx["_firstOption"] = undefined;
        ctx["_input"] = undefined;
        ctx["_menuMods"] = undefined;
        ctx["_ieCommented"] = undefined;
        ctx["_str"] = undefined;
        ctx["block"] = undefined;
        ctx["elem"] = undefined;
        ctx["_notNewList"] = undefined;
        ctx["position"] = undefined;
        ctx["_listLength"] = undefined;
        ctx["_currBlock"] = undefined;
        ctx["mods"] = undefined;
        ctx["elemMods"] = undefined;
    },
    resetApplyNext: function(ctx) {
        ctx["__$a0"] = 0;
    }
});

function __$b5(__$ctx, __$ref) {
    var ctx__$89 = __$ctx.ctx, content__$90 = [ ctx__$89.icon ];
    "text" in ctx__$89 && content__$90.push({
        elem: "text",
        content: ctx__$89.text
    });
    return content__$90;
}

function __$b6(__$ctx, __$ref) {
    var content__$6 = __$ctx.ctx.content;
    if (__$ctx.isArray(content__$6)) return content__$6;
    var res__$7 = __$ctx.isSimple(content__$6) ? {
        block: "button",
        text: content__$6
    } : content__$6;
    if (res__$7.block === "button") {
        var resMods__$8 = res__$7.mods || (res__$7.mods = {}), dropdownMods__$9 = $$mods;
        resMods__$8.size || (resMods__$8.size = dropdownMods__$9.size);
        resMods__$8.theme || (resMods__$8.theme = dropdownMods__$9.theme);
        resMods__$8.disabled = dropdownMods__$9.disabled;
    }
    return res__$7;
}

function __$b7(__$ctx, __$ref) {
    var content__$69 = __$ctx.ctx.content;
    if (__$ctx.isArray(content__$69)) return content__$69;
    var res__$70 = __$ctx.isSimple(content__$69) ? {
        block: "link",
        mods: {
            pseudo: true
        },
        content: content__$69
    } : content__$69;
    if (res__$70.block === "link") {
        var resMods__$71 = res__$70.mods || (res__$70.mods = {}), dropdownMods__$72 = $$mods;
        resMods__$71.theme || (resMods__$71.theme = dropdownMods__$72.theme);
        resMods__$71.disabled = dropdownMods__$72.disabled;
    }
    return res__$70;
}

function __$b8(__$ctx, __$ref) {
    var popup__$74 = __$ctx.ctx.popup;
    if (__$ctx.isSimple(popup__$74) || popup__$74.block !== "popup") {
        popup__$74 = {
            block: "popup",
            content: popup__$74
        };
    }
    var popupMods__$75 = popup__$74.mods || (popup__$74.mods = {});
    popupMods__$75.theme || (popupMods__$75.theme = $$mods.theme);
    popupMods__$75.hasOwnProperty("autoclosable") || (popupMods__$75.autoclosable = true);
    popupMods__$75.target = "anchor";
    return [ {
        elem: "switcher",
        content: __$ctx.ctx.switcher
    }, popup__$74 ];
}

function __$b9(__$ctx, __$ref) {
    var ctx__$10 = __$ctx.ctx, mods__$11 = $$mods;
    return [ {
        block: "button",
        mods: {
            togglable: "check",
            checked: mods__$11.checked,
            disabled: mods__$11.disabled,
            theme: mods__$11.theme,
            size: mods__$11.size
        },
        title: ctx__$10.title,
        content: [ ctx__$10.icon, typeof ctx__$10.text !== "undefined" ? {
            elem: "text",
            content: ctx__$10.text
        } : "" ]
    }, {
        block: "checkbox",
        elem: "control",
        checked: mods__$11.checked,
        disabled: mods__$11.disabled,
        name: ctx__$10.name,
        val: ctx__$10.val
    } ];
}

function __$b10(__$ctx, __$ref) {
    var ctx__$78 = __$ctx.ctx, mods__$79 = $$mods;
    return [ {
        elem: "box",
        content: {
            elem: "control",
            checked: mods__$79.checked,
            disabled: mods__$79.disabled,
            name: ctx__$78.name,
            val: ctx__$78.val
        }
    }, ctx__$78.text ];
}

function __$b11(__$ctx, __$ref) {
    var ctx__$12 = __$ctx.ctx, mods__$13 = $$mods;
    return [ {
        block: "button",
        mods: {
            togglable: mods__$13.mode === "radio-check" ? "check" : "radio",
            checked: mods__$13.checked,
            disabled: mods__$13.disabled,
            theme: mods__$13.theme,
            size: mods__$13.size
        },
        title: ctx__$12.title,
        content: [ ctx__$12.icon, typeof ctx__$12.text !== "undefined" ? {
            elem: "text",
            content: ctx__$12.text
        } : "" ]
    }, {
        block: "radio",
        elem: "control",
        checked: mods__$13.checked,
        disabled: mods__$13.disabled,
        name: ctx__$12.name,
        val: ctx__$12.val
    } ];
}

function __$b12(__$ctx, __$ref) {
    var ctx__$82 = __$ctx.ctx;
    return [ {
        elem: "box",
        content: {
            elem: "control",
            checked: $$mods.checked,
            disabled: $$mods.disabled,
            name: ctx__$82.name,
            val: ctx__$82.val
        }
    }, ctx__$82.text ];
}

function __$b16(__$ctx, __$ref) {
    var mods__$83 = $$mods, ctx__$84 = __$ctx.ctx, isValDef__$85 = typeof ctx__$84.val !== "undefined";
    return (ctx__$84.options || []).map(function(option, i) {
        return [ !!i && !mods__$83.type && {
            tag: "br"
        }, {
            block: "radio",
            mods: {
                type: mods__$83.type,
                mode: mods__$83.mode,
                theme: mods__$83.theme,
                size: mods__$83.size,
                checked: isValDef__$85 && ctx__$84.val === option.val,
                disabled: option.disabled || mods__$83.disabled
            },
            name: ctx__$84.name,
            val: option.val,
            text: option.text,
            title: option.title,
            icon: option.icon
        } ];
    });
}

function __$b24(__$ctx, __$ref) {
    var ctx__$51 = __$ctx.ctx;
    return {
        name: ctx__$51.name,
        optionsMaxHeight: ctx__$51.optionsMaxHeight
    };
}

function __$b34(__$ctx, __$ref) {
    var ctx__$73 = __$ctx.ctx;
    return {
        mainOffset: ctx__$73.mainOffset,
        secondaryOffset: ctx__$73.secondaryOffset,
        viewportOffset: ctx__$73.viewportOffset,
        directions: ctx__$73.directions,
        zIndexGroupLevel: ctx__$73.zIndexGroupLevel
    };
}

function __$b40(__$ctx, __$ref) {
    var ctx__$91 = __$ctx.ctx, attrs__$92 = {
        type: $$mods.type || "button",
        name: ctx__$91.name,
        value: ctx__$91.val
    };
    $$mods.disabled && (attrs__$92.disabled = "disabled");
    return __$ctx.extend(function __$lb__$93() {
        var __$r__$94;
        var __$l0__$95 = __$ctx.__$a0;
        __$ctx.__$a0 = __$ctx.__$a0 | 1024;
        __$r__$94 = applyc(__$ctx, __$ref);
        __$ctx.__$a0 = __$l0__$95;
        return __$r__$94;
    }(), attrs__$92);
}

function __$b41(__$ctx, __$ref) {
    var ctx__$96 = __$ctx.ctx;
    return {
        role: "button",
        tabindex: ctx__$96.tabIndex,
        id: ctx__$96.id,
        title: ctx__$96.title
    };
}

function __$b42(__$ctx, __$ref) {
    var attrs__$76 = {
        type: "checkbox",
        autocomplete: "off"
    }, ctx__$77 = __$ctx.ctx;
    attrs__$76.name = ctx__$77.name;
    attrs__$76.value = ctx__$77.val;
    ctx__$77.checked && (attrs__$76.checked = "checked");
    ctx__$77.disabled && (attrs__$76.disabled = "disabled");
    return attrs__$76;
}

function __$b43(__$ctx, __$ref) {
    var ctx__$80 = __$ctx.ctx, attrs__$81 = {
        type: "radio",
        autocomplete: "off",
        name: ctx__$80.name,
        value: ctx__$80.val
    };
    ctx__$80.checked && (attrs__$81.checked = "checked");
    ctx__$80.disabled && (attrs__$81.disabled = "disabled");
    return attrs__$81;
}

function __$b47(__$ctx, __$ref) {
    var ctx__$139 = __$ctx.ctx, attrs__$140 = {}, tabIndex__$141;
    if (!$$mods.disabled) {
        if (ctx__$139.url) {
            attrs__$140.href = ctx__$139.url;
            tabIndex__$141 = ctx__$139.tabIndex;
        } else {
            tabIndex__$141 = ctx__$139.tabIndex || 0;
        }
    }
    typeof tabIndex__$141 === "undefined" || (attrs__$140.tabindex = tabIndex__$141);
    ctx__$139.title && (attrs__$140.title = ctx__$139.title);
    ctx__$139.target && (attrs__$140.target = ctx__$139.target);
    return attrs__$140;
}

function __$b51(__$ctx, __$ref) {
    var attrs__$120 = {
        role: "menu"
    };
    $$mods.disabled || (attrs__$120.tabindex = 0);
    return attrs__$120;
}

function __$b52(__$ctx, __$ref) {
    var input__$97 = __$ctx._input, attrs__$98 = {
        id: input__$97.id,
        name: input__$97.name,
        value: input__$97.val,
        maxlength: input__$97.maxLength,
        tabindex: input__$97.tabIndex,
        placeholder: input__$97.placeholder
    };
    input__$97.autocomplete === false && (attrs__$98.autocomplete = "off");
    $$mods.disabled && (attrs__$98.disabled = "disabled");
    return attrs__$98;
}

function __$b53(__$ctx, __$ref) {
    var attrs__$105 = {
        "aria-hidden": "true"
    }, url__$106 = __$ctx.ctx.url;
    if (url__$106) attrs__$105.style = "background-image:url(" + url__$106 + ")";
    return attrs__$105;
}

function __$b93(__$ctx, __$ref) {
    var mods__$38 = $$mods;
    var __$r__$40;
    var __$l0__$41 = $$mode;
    $$mode = "";
    var __$l1__$42 = __$ctx.ctx;
    __$ctx.ctx = {
        block: "button",
        mix: {
            block: $$block,
            elem: $$elem
        },
        mods: {
            size: mods__$38.size,
            theme: mods__$38.theme,
            view: mods__$38.view,
            focused: mods__$38.focused,
            disabled: mods__$38.disabled,
            checked: mods__$38.mode !== "radio" && !!__$ctx._checkedOptions.length
        },
        id: __$ctx._select.id,
        tabIndex: __$ctx._select.tabIndex,
        content: [ function __$lb__$43() {
            var __$r__$44;
            var __$l3__$45 = $$mode;
            $$mode = "content";
            __$r__$44 = applyc(__$ctx, __$ref);
            $$mode = __$l3__$45;
            return __$r__$44;
        }(), {
            block: "icon",
            mix: {
                block: "select",
                elem: "tick"
            }
        } ]
    };
    var __$r__$46;
    var __$l2__$47 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 64;
    __$r__$46 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$47;
    __$r__$40 = __$r__$46;
    $$mode = __$l0__$41;
    __$ctx.ctx = __$l1__$42;
    return;
}

function __$b94(__$ctx, __$ref) {
    var mods__$28 = $$mods, optionToMenuItem__$29 = function(option) {
        var res__$30 = {
            block: "menu-item",
            mods: {
                disabled: mods__$28.disabled || option.disabled
            },
            val: option.val,
            js: {
                checkedText: option.checkedText
            },
            content: option.text
        };
        if (option.icon) {
            res__$30.js.text = option.text;
            res__$30.content = [ option.icon, res__$30.content ];
        }
        return res__$30;
    };
    var __$r__$32;
    var __$l0__$33 = $$mode;
    $$mode = "";
    var __$l1__$34 = __$ctx.ctx;
    __$ctx.ctx = {
        block: "menu",
        mix: {
            block: $$block,
            elem: $$elem
        },
        mods: {
            size: mods__$28.size,
            theme: mods__$28.theme,
            disabled: mods__$28.disabled,
            mode: mods__$28.mode
        },
        val: __$ctx._select.val,
        attrs: {
            tabindex: undefined
        },
        content: __$ctx._select.options.map(function(optionOrGroup) {
            return optionOrGroup.group ? {
                elem: "group",
                mods: {
                    "has-title": !!optionOrGroup.title
                },
                title: optionOrGroup.title,
                content: optionOrGroup.group.map(optionToMenuItem__$29)
            } : optionToMenuItem__$29(optionOrGroup);
        })
    };
    var __$r__$36;
    var __$l2__$37 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 32;
    __$r__$36 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$37;
    __$r__$32 = __$r__$36;
    $$mode = __$l0__$33;
    __$ctx.ctx = __$l1__$34;
    return;
}

function __$b95(__$ctx, __$ref) {
    if (!$$mods.mode) throw Error("Can't build select without mode modifier");
    var ctx__$52 = __$ctx.ctx, isValDef__$53 = typeof ctx__$52.val !== "undefined", isModeCheck__$54 = $$mods.mode === "check", firstOption__$55, checkedOptions__$56 = [], containsVal__$57 = function(val) {
        return isValDef__$53 && (isModeCheck__$54 ? ctx__$52.val.indexOf(val) > -1 : ctx__$52.val === val);
    }, iterateOptions__$58 = function(content) {
        var i__$59 = 0, option__$60;
        while (option__$60 = content[i__$59++]) {
            if (option__$60.group) {
                iterateOptions__$58(option__$60.group);
            } else {
                firstOption__$55 || (firstOption__$55 = option__$60);
                if (containsVal__$57(option__$60.val)) {
                    option__$60.checked = true;
                    checkedOptions__$56.push(option__$60);
                }
            }
        }
    };
    iterateOptions__$58(ctx__$52.options);
    var __$r__$62;
    var __$l0__$63 = __$ctx._select;
    __$ctx._select = __$ctx.ctx;
    var __$l1__$64 = __$ctx._checkedOptions;
    __$ctx._checkedOptions = checkedOptions__$56;
    var __$l2__$65 = __$ctx._firstOption;
    __$ctx._firstOption = firstOption__$55;
    var __$r__$67;
    var __$l3__$68 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 256;
    __$r__$67 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l3__$68;
    __$r__$62 = __$r__$67;
    __$ctx._select = __$l0__$63;
    __$ctx._checkedOptions = __$l1__$64;
    __$ctx._firstOption = __$l2__$65;
    return;
}

function __$b96(__$ctx, __$ref) {
    var ctx__$20 = __$ctx.ctx;
    var __$r__$22;
    var __$l0__$23 = $$mode;
    $$mode = "";
    var __$l1__$24 = __$ctx.ctx;
    __$ctx.ctx = [ ctx__$20.doctype || "<!DOCTYPE html>", {
        tag: "html",
        cls: "ua_js_no",
        content: [ {
            elem: "head",
            content: [ {
                tag: "meta",
                attrs: {
                    charset: "utf-8"
                }
            }, {
                tag: "title",
                content: ctx__$20.title
            }, {
                block: "ua"
            }, ctx__$20.head, ctx__$20.styles, ctx__$20.favicon ? {
                elem: "favicon",
                url: ctx__$20.favicon
            } : "" ]
        }, ctx__$20 ]
    } ];
    var __$r__$26;
    var __$l2__$27 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 16;
    __$r__$26 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$27;
    __$r__$22 = __$r__$26;
    $$mode = __$l0__$23;
    __$ctx.ctx = __$l1__$24;
    return;
}

function __$b97(__$ctx, __$ref) {
    var url__$149 = __$ctx.ctx.url;
    var __$r__$151;
    var __$l0__$152 = $$mode;
    $$mode = "";
    var __$l1__$153 = __$ctx.ctx;
    __$ctx.ctx = [ 6, 7, 8, 9 ].map(function(v) {
        return {
            elem: "css",
            url: url__$149 + ".ie" + v + ".css",
            ie: "IE " + v
        };
    });
    var __$r__$155;
    var __$l2__$156 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 1048576;
    __$r__$155 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$156;
    __$r__$151 = __$r__$155;
    $$mode = __$l0__$152;
    __$ctx.ctx = __$l1__$153;
    return;
}

function __$b98(__$ctx, __$ref) {
    var ie__$157 = __$ctx.ctx.ie, hideRule__$158 = !ie__$157 ? [ "gt IE 9", "<!-->", "<!--" ] : ie__$157 === "!IE" ? [ ie__$157, "<!-->", "<!--" ] : [ ie__$157, "", "" ];
    var __$r__$160;
    var __$l0__$161 = $$mode;
    $$mode = "";
    var __$l3__$162 = __$ctx.ctx;
    var __$l1__$163 = __$l3__$162._ieCommented;
    __$l3__$162._ieCommented = true;
    var __$l2__$164 = __$ctx.ctx;
    __$ctx.ctx = [ "<!--[if " + hideRule__$158[0] + "]>" + hideRule__$158[1], __$ctx.ctx, hideRule__$158[2] + "<![endif]-->" ];
    __$r__$160 = applyc(__$ctx, __$ref);
    $$mode = __$l0__$161;
    __$l3__$162._ieCommented = __$l1__$163;
    __$ctx.ctx = __$l2__$164;
    return;
}

function __$b99(__$ctx, __$ref) {
    var ctx__$142 = __$ctx.ctx;
    typeof ctx__$142.url === "object" && (ctx__$142.url = __$ctx.reapply(ctx__$142.url));
    var __$r__$144;
    var __$l0__$145 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 262144;
    __$r__$144 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$145;
    return;
}

function __$b100(__$ctx, __$ref) {
    var ctx__$121 = __$ctx.ctx, mods__$122 = $$mods, firstItem__$123, checkedItems__$124 = [];
    if (ctx__$121.content) {
        var isValDef__$125 = typeof ctx__$121.val !== "undefined", containsVal__$126 = function(val) {
            return isValDef__$125 && (mods__$122.mode === "check" ? ctx__$121.val.indexOf(val) > -1 : ctx__$121.val === val);
        }, iterateItems__$127 = function(content) {
            var i__$128 = 0, itemOrGroup__$129;
            while (itemOrGroup__$129 = content[i__$128++]) {
                if (itemOrGroup__$129.block === "menu-item") {
                    firstItem__$123 || (firstItem__$123 = itemOrGroup__$129);
                    if (containsVal__$126(itemOrGroup__$129.val)) {
                        (itemOrGroup__$129.mods = itemOrGroup__$129.mods || {}).checked = true;
                        checkedItems__$124.push(itemOrGroup__$129);
                    }
                } else {
                    iterateItems__$127(itemOrGroup__$129.content);
                }
            }
        };
        iterateItems__$127(ctx__$121.content);
    }
    __$ctx._firstItem = firstItem__$123;
    __$ctx._checkedItems = checkedItems__$124;
    var __$r__$131;
    var __$l0__$132 = __$ctx._menuMods;
    __$ctx._menuMods = {
        theme: mods__$122.theme,
        disabled: mods__$122.disabled
    };
    var __$r__$134;
    var __$l1__$135 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 65536;
    __$r__$134 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$135;
    __$r__$131 = __$r__$134;
    __$ctx._menuMods = __$l0__$132;
    return;
}

function __$b101(__$ctx, __$ref) {
    var __$r__$100;
    var __$l0__$101 = __$ctx._input;
    __$ctx._input = __$ctx.ctx;
    var __$r__$103;
    var __$l1__$104 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 2048;
    __$r__$103 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l1__$104;
    __$r__$100 = __$r__$103;
    __$ctx._input = __$l0__$101;
    return;
}

function __$b102(__$ctx, __$ref) {
    var mods__$116 = $$mods;
    mods__$116.theme = mods__$116.theme || __$ctx._menuMods.theme;
    mods__$116.disabled = mods__$116.disabled || __$ctx._menuMods.disabled;
    var __$r__$118;
    var __$l0__$119 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 32768;
    __$r__$118 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l0__$119;
    return;
}

function __$b103(__$ctx, __$ref) {
    var BEM_INTERNAL__$165 = __$ctx.BEM.INTERNAL, ctx__$166 = __$ctx.ctx, isBEM__$167, tag__$168, res__$169;
    var __$r__$171;
    var __$l0__$172 = __$ctx._str;
    __$ctx._str = "";
    var vBlock__$173 = $$block;
    var __$r__$175;
    var __$l1__$176 = $$mode;
    $$mode = "tag";
    __$r__$175 = applyc(__$ctx, __$ref);
    $$mode = __$l1__$176;
    tag__$168 = __$r__$175;
    typeof tag__$168 !== "undefined" || (tag__$168 = ctx__$166.tag);
    typeof tag__$168 !== "undefined" || (tag__$168 = "div");
    if (tag__$168) {
        var jsParams__$177, js__$178;
        if (vBlock__$173 && ctx__$166.js !== false) {
            var __$r__$179;
            var __$l2__$180 = $$mode;
            $$mode = "js";
            __$r__$179 = applyc(__$ctx, __$ref);
            $$mode = __$l2__$180;
            js__$178 = __$r__$179;
            js__$178 = js__$178 ? __$ctx.extend(ctx__$166.js, js__$178 === true ? {} : js__$178) : ctx__$166.js === true ? {} : ctx__$166.js;
            js__$178 && ((jsParams__$177 = {})[BEM_INTERNAL__$165.buildClass(vBlock__$173, ctx__$166.elem)] = js__$178);
        }
        __$ctx._str += "<" + tag__$168;
        var __$r__$181;
        var __$l3__$182 = $$mode;
        $$mode = "bem";
        __$r__$181 = applyc(__$ctx, __$ref);
        $$mode = __$l3__$182;
        isBEM__$167 = __$r__$181;
        typeof isBEM__$167 !== "undefined" || (isBEM__$167 = typeof ctx__$166.bem !== "undefined" ? ctx__$166.bem : ctx__$166.block || ctx__$166.elem);
        var __$r__$184;
        var __$l4__$185 = $$mode;
        $$mode = "cls";
        __$r__$184 = applyc(__$ctx, __$ref);
        $$mode = __$l4__$185;
        var cls__$183 = __$r__$184;
        cls__$183 || (cls__$183 = ctx__$166.cls);
        var addJSInitClass__$186 = ctx__$166.block && jsParams__$177 && !ctx__$166.elem;
        if (isBEM__$167 || cls__$183) {
            __$ctx._str += ' class="';
            if (isBEM__$167) {
                __$ctx._str += BEM_INTERNAL__$165.buildClasses(vBlock__$173, ctx__$166.elem, ctx__$166.elemMods || ctx__$166.mods);
                var __$r__$188;
                var __$l5__$189 = $$mode;
                $$mode = "mix";
                __$r__$188 = applyc(__$ctx, __$ref);
                $$mode = __$l5__$189;
                var mix__$187 = __$r__$188;
                ctx__$166.mix && (mix__$187 = mix__$187 ? [].concat(mix__$187, ctx__$166.mix) : ctx__$166.mix);
                if (mix__$187) {
                    var visited__$190 = {}, visitedKey__$191 = function(block, elem) {
                        return (block || "") + "__" + (elem || "");
                    };
                    visited__$190[visitedKey__$191(vBlock__$173, $$elem)] = true;
                    __$ctx.isArray(mix__$187) || (mix__$187 = [ mix__$187 ]);
                    for (var i__$192 = 0; i__$192 < mix__$187.length; i__$192++) {
                        var mixItem__$193 = mix__$187[i__$192], hasItem__$194 = mixItem__$193.block || mixItem__$193.elem, mixBlock__$195 = mixItem__$193.block || mixItem__$193._block || $$block, mixElem__$196 = mixItem__$193.elem || mixItem__$193._elem || $$elem;
                        hasItem__$194 && (__$ctx._str += " ");
                        __$ctx._str += BEM_INTERNAL__$165[hasItem__$194 ? "buildClasses" : "buildModsClasses"](mixBlock__$195, mixItem__$193.elem || mixItem__$193._elem || (mixItem__$193.block ? undefined : $$elem), mixItem__$193.elemMods || mixItem__$193.mods);
                        if (mixItem__$193.js) {
                            (jsParams__$177 || (jsParams__$177 = {}))[BEM_INTERNAL__$165.buildClass(mixBlock__$195, mixItem__$193.elem)] = mixItem__$193.js === true ? {} : mixItem__$193.js;
                            addJSInitClass__$186 || (addJSInitClass__$186 = mixBlock__$195 && !mixItem__$193.elem);
                        }
                        if (hasItem__$194 && !visited__$190[visitedKey__$191(mixBlock__$195, mixElem__$196)]) {
                            visited__$190[visitedKey__$191(mixBlock__$195, mixElem__$196)] = true;
                            var __$r__$198;
                            var __$l6__$199 = $$mode;
                            $$mode = "mix";
                            var __$l7__$200 = $$block;
                            $$block = mixBlock__$195;
                            var __$l8__$201 = $$elem;
                            $$elem = mixElem__$196;
                            __$r__$198 = applyc(__$ctx, __$ref);
                            $$mode = __$l6__$199;
                            $$block = __$l7__$200;
                            $$elem = __$l8__$201;
                            var nestedMix__$197 = __$r__$198;
                            if (nestedMix__$197) {
                                for (var j__$202 = 0; j__$202 < nestedMix__$197.length; j__$202++) {
                                    var nestedItem__$203 = nestedMix__$197[j__$202];
                                    if (!nestedItem__$203.block && !nestedItem__$203.elem || !visited__$190[visitedKey__$191(nestedItem__$203.block, nestedItem__$203.elem)]) {
                                        nestedItem__$203._block = mixBlock__$195;
                                        nestedItem__$203._elem = mixElem__$196;
                                        mix__$187.splice(i__$192 + 1, 0, nestedItem__$203);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cls__$183 && (__$ctx._str += isBEM__$167 ? " " + cls__$183 : cls__$183);
            __$ctx._str += addJSInitClass__$186 ? ' i-bem"' : '"';
        }
        if (isBEM__$167 && jsParams__$177) {
            __$ctx._str += ' data-bem="' + __$ctx.attrEscape(JSON.stringify(jsParams__$177)) + '"';
        }
        var __$r__$205;
        var __$l9__$206 = $$mode;
        $$mode = "attrs";
        __$r__$205 = applyc(__$ctx, __$ref);
        $$mode = __$l9__$206;
        var attrs__$204 = __$r__$205;
        attrs__$204 = __$ctx.extend(attrs__$204, ctx__$166.attrs);
        if (attrs__$204) {
            var name__$207, attr__$208;
            for (name__$207 in attrs__$204) {
                attr__$208 = attrs__$204[name__$207];
                if (typeof attr__$208 === "undefined") continue;
                __$ctx._str += " " + name__$207 + '="' + __$ctx.attrEscape(__$ctx.isSimple(attr__$208) ? attr__$208 : __$ctx.reapply(attr__$208)) + '"';
            }
        }
    }
    if (__$ctx.isShortTag(tag__$168)) {
        __$ctx._str += "/>";
    } else {
        tag__$168 && (__$ctx._str += ">");
        var __$r__$210;
        var __$l10__$211 = $$mode;
        $$mode = "content";
        __$r__$210 = applyc(__$ctx, __$ref);
        $$mode = __$l10__$211;
        var content__$209 = __$r__$210;
        if (content__$209 || content__$209 === 0) {
            isBEM__$167 = vBlock__$173 || $$elem;
            var __$r__$212;
            var __$l11__$213 = $$mode;
            $$mode = "";
            var __$l12__$214 = __$ctx._notNewList;
            __$ctx._notNewList = false;
            var __$l13__$215 = __$ctx.position;
            __$ctx.position = isBEM__$167 ? 1 : __$ctx.position;
            var __$l14__$216 = __$ctx._listLength;
            __$ctx._listLength = isBEM__$167 ? 1 : __$ctx._listLength;
            var __$l15__$217 = __$ctx.ctx;
            __$ctx.ctx = content__$209;
            __$r__$212 = applyc(__$ctx, __$ref);
            $$mode = __$l11__$213;
            __$ctx._notNewList = __$l12__$214;
            __$ctx.position = __$l13__$215;
            __$ctx._listLength = __$l14__$216;
            __$ctx.ctx = __$l15__$217;
        }
        tag__$168 && (__$ctx._str += "</" + tag__$168 + ">");
    }
    res__$169 = __$ctx._str;
    __$r__$171 = undefined;
    __$ctx._str = __$l0__$172;
    __$ctx._buf.push(res__$169);
    return;
}

function __$b110(__$ctx, __$ref) {
    var __$r__$219;
    var __$l0__$220 = $$mode;
    $$mode = "";
    var __$l1__$221 = __$ctx.ctx;
    __$ctx.ctx = __$ctx.ctx._value;
    var __$r__$223;
    var __$l2__$224 = __$ctx.__$a0;
    __$ctx.__$a0 = __$ctx.__$a0 | 2097152;
    __$r__$223 = applyc(__$ctx, __$ref);
    __$ctx.__$a0 = __$l2__$224;
    __$r__$219 = __$r__$223;
    $$mode = __$l0__$220;
    __$ctx.ctx = __$l1__$221;
    return;
}

function __$b111(__$ctx, __$ref) {
    __$ctx._listLength--;
    var ctx__$225 = __$ctx.ctx;
    if (ctx__$225 && ctx__$225 !== true || ctx__$225 === 0) {
        __$ctx._str += ctx__$225 + "";
    }
    return;
}

function __$b112(__$ctx, __$ref) {
    __$ctx._listLength--;
    return;
}

function __$b113(__$ctx, __$ref) {
    var ctx__$226 = __$ctx.ctx, len__$227 = ctx__$226.length, i__$228 = 0, prevPos__$229 = __$ctx.position, prevNotNewList__$230 = __$ctx._notNewList;
    if (prevNotNewList__$230) {
        __$ctx._listLength += len__$227 - 1;
    } else {
        __$ctx.position = 0;
        __$ctx._listLength = len__$227;
    }
    __$ctx._notNewList = true;
    while (i__$228 < len__$227) (function __$lb__$231() {
        var __$r__$232;
        var __$l0__$233 = __$ctx.ctx;
        __$ctx.ctx = ctx__$226[i__$228++];
        __$r__$232 = applyc(__$ctx, __$ref);
        __$ctx.ctx = __$l0__$233;
        return __$r__$232;
    })();
    prevNotNewList__$230 || (__$ctx.position = prevPos__$229);
    return;
}

function __$b114(__$ctx, __$ref) {
    __$ctx.ctx || (__$ctx.ctx = {});
    var vBlock__$234 = __$ctx.ctx.block, vElem__$235 = __$ctx.ctx.elem, block__$236 = __$ctx._currBlock || $$block;
    var __$r__$238;
    var __$l0__$239 = $$mode;
    $$mode = "default";
    var __$l1__$240 = $$block;
    $$block = vBlock__$234 || (vElem__$235 ? block__$236 : undefined);
    var __$l2__$241 = __$ctx._currBlock;
    __$ctx._currBlock = vBlock__$234 || vElem__$235 ? undefined : block__$236;
    var __$l3__$242 = $$elem;
    $$elem = vElem__$235;
    var __$l4__$243 = $$mods;
    $$mods = vBlock__$234 ? __$ctx.ctx.mods || (__$ctx.ctx.mods = {}) : $$mods;
    var __$l5__$244 = $$elemMods;
    $$elemMods = __$ctx.ctx.elemMods || {};
    $$block || $$elem ? __$ctx.position = (__$ctx.position || 0) + 1 : __$ctx._listLength--;
    applyc(__$ctx, __$ref);
    __$r__$238 = undefined;
    $$mode = __$l0__$239;
    $$block = __$l1__$240;
    __$ctx._currBlock = __$l2__$241;
    $$elem = __$l3__$242;
    $$mods = __$l4__$243;
    $$elemMods = __$l5__$244;
    return;
}

function __$g0(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "select") {
        if (!$$elem && $$mods && $$mods["mode"] === "radio-check" && __$ctx._checkedOptions[0] && (__$ctx.__$a0 & 1) === 0) {
            return [ {
                elem: "control",
                val: __$ctx._checkedOptions[0].val
            }, function __$lb__$0() {
                var __$r__$1;
                var __$l0__$2 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 1;
                __$r__$1 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$2;
                return __$r__$1;
            }() ];
        }
        if ($$elem === "button" && $$mods && $$mods["mode"] === "radio-check") {
            return [ {
                elem: "text",
                content: (__$ctx._checkedOptions[0] || __$ctx._select).text
            } ];
        }
        if (!$$elem) {
            return [ {
                elem: "button"
            }, {
                block: "popup",
                mods: {
                    target: "anchor",
                    theme: $$mods.theme,
                    autoclosable: true
                },
                directions: [ "bottom-left", "bottom-right", "top-left", "top-right" ],
                content: {
                    block: $$block,
                    mods: $$mods,
                    elem: "menu"
                }
            } ];
        }
    } else if (__$t === "button") {
        var __$t = !$$elem;
        if (__$t) {
            if (typeof __$ctx.ctx.content !== "undefined") {
                return __$ctx.ctx.content;
            }
            var __$r = __$b5(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "dropdown") {
        var __$t = $$elem;
        if (__$t === "switcher") {
            var __$t = $$mods;
            if (__$t) {
                var __$t = $$mods["switcher"];
                if (__$t === "button") {
                    var __$r = __$b6(__$ctx, __$ref);
                    if (__$r !== __$ref) return __$r;
                } else if (__$t === "link") {
                    var __$r = __$b7(__$ctx, __$ref);
                    if (__$r !== __$ref) return __$r;
                }
            }
        }
        if (!$$elem) {
            var __$r = __$b8(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "checkbox") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "button") {
                var __$r = __$b9(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b10(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "radio") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["type"] === "button") {
                var __$r = __$b11(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b12(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "page") {
        if ($$elem === "head" && (__$ctx.__$a0 & 4) === 0) {
            return [ __$ctx.ctx["x-ua-compatible"] === false ? false : {
                tag: "meta",
                attrs: {
                    "http-equiv": "X-UA-Compatible",
                    content: __$ctx.ctx["x-ua-compatible"] || "IE=edge"
                }
            }, function __$lb__$14() {
                var __$r__$15;
                var __$l0__$16 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 4;
                __$r__$15 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$16;
                return __$r__$15;
            }() ];
        }
        if (!$$elem && (__$ctx.__$a0 & 8) === 0) {
            return [ function __$lb__$17() {
                var __$r__$18;
                var __$l0__$19 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 8;
                __$r__$18 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$19;
                return __$r__$18;
            }(), __$ctx.ctx.scripts ];
        }
    } else if (__$t === "menu") {
        if ($$elem === "group" && typeof __$ctx.ctx.title !== "undefined" && (__$ctx.__$a0 & 4096) === 0) {
            return [ {
                elem: "group-title",
                content: __$ctx.ctx.title
            }, function __$lb__$107() {
                var __$r__$108;
                var __$l0__$109 = __$ctx.__$a0;
                __$ctx.__$a0 = __$ctx.__$a0 | 4096;
                __$r__$108 = applyc(__$ctx, __$ref);
                __$ctx.__$a0 = __$l0__$109;
                return __$r__$108;
            }() ];
        }
    } else if (__$t === "radio-group") {
        if (!$$elem) {
            var __$r = __$b16(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "input") {
        if ($$elem === "box" && $$mods && $$mods["has-clear"] === true) {
            return [ __$ctx.ctx.content, {
                elem: "clear"
            } ];
        }
        if (!$$elem) {
            return {
                elem: "box",
                content: {
                    elem: "control"
                }
            };
        }
    } else if (__$t === "ua") {
        var __$t = !$$elem;
        if (__$t) {
            if ((__$ctx.__$a0 & 524288) === 0) {
                return [ function __$lb__$146() {
                    var __$r__$147;
                    var __$l0__$148 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 524288;
                    __$r__$147 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$148;
                    return __$r__$147;
                }(), "(function(d,n){", "d.documentElement.className+=", '" ua_svg_"+(d[n]&&d[n]("http://www.w3.org/2000/svg","svg").createSVGRect?"yes":"no");', '})(document,"createElementNS");' ];
            }
            return [ "(function(e,c){", 'e[c]=e[c].replace(/(ua_js_)no/g,"$1yes");', '})(document.documentElement,"className");' ];
        }
    }
    return __$ctx.ctx.content;
    return __$ref;
}

function __$g1(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "select") {
        var __$t = !$$elem;
        if (__$t) {
            var __$t = $$mods;
            if (__$t) {
                if ($$mods["mode"] === "radio-check" && (__$ctx.__$a0 & 2) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$3() {
                        var __$r__$4;
                        var __$l0__$5 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 2;
                        __$r__$4 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$5;
                        return __$r__$4;
                    }(), {
                        text: __$ctx.ctx.text
                    });
                    if (__$r !== __$ref) return __$r;
                }
                if ($$mods["focused"] === true && (__$ctx.__$a0 & 128) === 0) {
                    var __$r = __$ctx.extend(function __$lb__$48() {
                        var __$r__$49;
                        var __$l0__$50 = __$ctx.__$a0;
                        __$ctx.__$a0 = __$ctx.__$a0 | 128;
                        __$r__$49 = applyc(__$ctx, __$ref);
                        __$ctx.__$a0 = __$l0__$50;
                        return __$r__$49;
                    }(), {
                        live: false
                    });
                    if (__$r !== __$ref) return __$r;
                }
            }
            var __$r = __$b24(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "button") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["focused"] === true && (__$ctx.__$a0 & 512) === 0) {
                var __$r = __$ctx.extend(function __$lb__$86() {
                    var __$r__$87;
                    var __$l0__$88 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 512;
                    __$r__$87 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$88;
                    return __$r__$87;
                }(), {
                    live: false
                });
                if (__$r !== __$ref) return __$r;
            }
            return true;
        }
    } else if (__$t === "dropdown") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "checkbox") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "radio") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "link") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["disabled"] === true && (__$ctx.__$a0 & 131072) === 0) {
                var __$r = __$ctx.extend(function __$lb__$136() {
                    var __$r__$137;
                    var __$l0__$138 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 131072;
                    __$r__$137 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$138;
                    return __$r__$137;
                }(), {
                    url: __$ctx.ctx.url
                });
                if (__$r !== __$ref) return __$r;
            }
            return true;
        }
    } else if (__$t === "menu") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["focused"] === true && (__$ctx.__$a0 & 16384) === 0) {
                var __$r = __$ctx.extend(function __$lb__$113() {
                    var __$r__$114;
                    var __$l0__$115 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 16384;
                    __$r__$114 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$115;
                    return __$r__$114;
                }(), {
                    live: false
                });
                if (__$r !== __$ref) return __$r;
            }
            return true;
        }
    } else if (__$t === "popup") {
        if (!$$elem) {
            var __$r = __$b34(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "radio-group") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "input") {
        if (!$$elem) {
            return true;
        }
    } else if (__$t === "menu-item") {
        if (!$$elem) {
            return {
                val: __$ctx.ctx.val
            };
        }
    }
    return undefined;
    return __$ref;
}

function __$g2(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "select") {
        if ($$elem === "control") {
            return {
                type: "hidden",
                name: __$ctx._select.name,
                value: __$ctx.ctx.val,
                disabled: $$mods.disabled ? "disabled" : undefined
            };
        }
    } else if (__$t === "button") {
        var __$t = !$$elem;
        if (__$t) {
            if ((!$$mods.type || $$mods.type === "submit") && (__$ctx.__$a0 & 1024) === 0) {
                var __$r = __$b40(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
            var __$r = __$b41(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "checkbox") {
        if ($$elem === "control") {
            var __$r = __$b42(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "radio") {
        if ($$elem === "control") {
            var __$r = __$b43(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "page") {
        var __$t = $$elem;
        if (__$t === "js") {
            if (__$ctx.ctx.url) {
                return {
                    src: __$ctx.ctx.url
                };
            }
        } else if (__$t === "favicon") {
            return {
                rel: "shortcut icon",
                href: __$ctx.ctx.url
            };
        } else if (__$t === "css") {
            if (__$ctx.ctx.url) {
                return {
                    rel: "stylesheet",
                    href: __$ctx.ctx.url
                };
            }
        }
    } else if (__$t === "link") {
        if (!$$elem) {
            var __$r = __$b47(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "menu") {
        var __$t = $$elem;
        if (__$t === "group-title") {
            return {
                role: "presentation"
            };
        } else if (__$t === "group") {
            if (typeof __$ctx.ctx.title !== "undefined" && (__$ctx.__$a0 & 8192) === 0) {
                var __$r = __$ctx.extend(function __$lb__$110() {
                    var __$r__$111;
                    var __$l0__$112 = __$ctx.__$a0;
                    __$ctx.__$a0 = __$ctx.__$a0 | 8192;
                    __$r__$111 = applyc(__$ctx, __$ref);
                    __$ctx.__$a0 = __$l0__$112;
                    return __$r__$111;
                }(), {
                    "aria-label": __$ctx.ctx.title
                });
                if (__$r !== __$ref) return __$r;
            }
            return {
                role: "group"
            };
        }
        if (!$$elem) {
            var __$r = __$b51(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "input") {
        if ($$elem === "control") {
            var __$r = __$b52(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "icon") {
        if (!$$elem) {
            var __$r = __$b53(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "menu-item") {
        if (!$$elem) {
            return {
                role: "menuitem"
            };
        }
    }
    return undefined;
    return __$ref;
}

function __$g3(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "select") {
        if ($$elem === "control") {
            return "input";
        }
    } else if (__$t === "button") {
        if ($$elem === "text") {
            return "span";
        }
        if (!$$elem) {
            return __$ctx.ctx.tag || "button";
        }
    } else if (__$t === "dropdown") {
        if ($$elem === "switcher") {
            return false;
        }
    } else if (__$t === "checkbox") {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "label";
        }
    } else if (__$t === "radio") {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        }
        if (!$$elem) {
            return "label";
        }
    } else if (__$t === "page") {
        var __$t = $$elem;
        if (__$t === "head") {
            return "head";
        } else if (__$t === "favicon") {
            return "link";
        } else if (__$t === "link") {
            return "link";
        } else if (__$t === "meta") {
            return "meta";
        }
        if (!$$elem) {
            return "body";
        }
        var __$t = $$elem;
        if (__$t === "js") {
            return "script";
        } else if (__$t === "css") {
            if (__$ctx.ctx.url) {
                return "link";
            }
            return "style";
        }
    } else if (__$t === "link") {
        var __$t = !$$elem;
        if (__$t) {
            if ($$mods && $$mods["pseudo"] === true && !__$ctx.ctx.url) {
                return "span";
            }
            return "a";
        }
    } else if (__$t === "radio-group") {
        if (!$$elem) {
            return "span";
        }
    } else if (__$t === "spin") {
        if (!$$elem) {
            return "span";
        }
    } else if (__$t === "input") {
        var __$t = $$elem;
        if (__$t === "control") {
            return "input";
        } else if (__$t === "box") {
            return "span";
        } else if (__$t === "clear") {
            return "i";
        }
        if (!$$elem) {
            return "span";
        }
    } else if (__$t === "icon") {
        if (!$$elem) {
            return "i";
        }
    } else if (__$t === "ua") {
        if (!$$elem) {
            return "script";
        }
    }
    return undefined;
    return __$ref;
}

function __$g4(__$ctx, __$ref) {
    var __$t = $$block;
    if (__$t === "select") {
        var __$t = $$elem;
        if (__$t === "button") {
            if ((__$ctx.__$a0 & 64) === 0) {
                var __$r = __$b93(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        } else if (__$t === "menu") {
            if ((__$ctx.__$a0 & 32) === 0) {
                var __$r = __$b94(__$ctx, __$ref);
                if (__$r !== __$ref) return __$r;
            }
        }
        if (!$$elem && !__$ctx._select && (__$ctx.__$a0 & 256) === 0) {
            var __$r = __$b95(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "page") {
        if (!$$elem && (__$ctx.__$a0 & 16) === 0) {
            var __$r = __$b96(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
        var __$t = $$elem;
        if (__$t === "css") {
            var __$t = !__$ctx.ctx._ieCommented;
            if (__$t) {
                var __$t = __$ctx.ctx.hasOwnProperty("ie");
                if (__$t) {
                    if (__$ctx.ctx.ie === true && (__$ctx.__$a0 & 1048576) === 0) {
                        var __$r = __$b97(__$ctx, __$ref);
                        if (__$r !== __$ref) return __$r;
                    }
                    var __$r = __$b98(__$ctx, __$ref);
                    if (__$r !== __$ref) return __$r;
                }
            }
        }
    } else if (__$t === "link") {
        if (!$$elem && (__$ctx.__$a0 & 262144) === 0) {
            var __$r = __$b99(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "menu") {
        if (!$$elem && (__$ctx.__$a0 & 65536) === 0) {
            var __$r = __$b100(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "input") {
        if (!$$elem && (__$ctx.__$a0 & 2048) === 0) {
            var __$r = __$b101(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    } else if (__$t === "menu-item") {
        if (!$$elem && __$ctx._menuMods && (__$ctx.__$a0 & 32768) === 0) {
            var __$r = __$b102(__$ctx, __$ref);
            if (__$r !== __$ref) return __$r;
        }
    }
    var __$r = __$b103(__$ctx, __$ref);
    if (__$r !== __$ref) return __$r;
    return __$ref;
};
     return exports;
  }
  var defineAsGlobal = true;
  if(typeof exports === "object") {
    exports["BEMHTML"] = __bem_xjst({});
    defineAsGlobal = false;
  }
  if(typeof modules === "object") {
    modules.define("BEMHTML",
      function(provide) {
        provide(__bem_xjst({})) });
    defineAsGlobal = false;
  }
  defineAsGlobal && (g["BEMHTML"] = __bem_xjst({}));
})(this);