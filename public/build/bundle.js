
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity$1 = x => x;
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe$1(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe$1(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe$1(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity$1, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.48.0' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const { set, subscribe } = writable({});

    const remove = () => {
      set({});
    };

    const activeRoute = {
      subscribe,
      set,
      remove,
    };

    const UrlParser = (urlString, namedUrl = '') => {
      const urlBase = new URL(urlString);

      /**
       * Wrapper for URL.hash
       *
       **/
      function hash() {
        return urlBase.hash;
      }

      /**
       * Wrapper for URL.host
       *
       **/
      function host() {
        return urlBase.host;
      }

      /**
       * Wrapper for URL.hostname
       *
       **/
      function hostname() {
        return urlBase.hostname;
      }

      /**
       * Returns an object with all the named params and their values
       *
       **/
      function namedParams() {
        const allPathName = pathNames();
        const allNamedParamsKeys = namedParamsWithIndex();

        return allNamedParamsKeys.reduce((values, paramKey) => {
          values[paramKey.value] = allPathName[paramKey.index];
          return values;
        }, {});
      }

      /**
       * Returns an array with all the named param keys
       *
       **/
      function namedParamsKeys() {
        const allNamedParamsKeys = namedParamsWithIndex();

        return allNamedParamsKeys.reduce((values, paramKey) => {
          values.push(paramKey.value);
          return values;
        }, []);
      }

      /**
       * Returns an array with all the named param values
       *
       **/
      function namedParamsValues() {
        const allPathName = pathNames();
        const allNamedParamsKeys = namedParamsWithIndex();

        return allNamedParamsKeys.reduce((values, paramKey) => {
          values.push(allPathName[paramKey.index]);
          return values;
        }, []);
      }

      /**
       * Returns an array with all named param ids and their position in the path
       * Private
       **/
      function namedParamsWithIndex() {
        const namedUrlParams = getPathNames(namedUrl);

        return namedUrlParams.reduce((validParams, param, index) => {
          if (param[0] === ':') {
            validParams.push({ value: param.slice(1), index });
          }
          return validParams;
        }, []);
      }

      /**
       * Wrapper for URL.port
       *
       **/
      function port() {
        return urlBase.port;
      }

      /**
       * Wrapper for URL.pathname
       *
       **/
      function pathname() {
        return urlBase.pathname;
      }

      /**
       * Wrapper for URL.protocol
       *
       **/
      function protocol() {
        return urlBase.protocol;
      }

      /**
       * Wrapper for URL.search
       *
       **/
      function search() {
        return urlBase.search;
      }

      /**
       * Returns an object with all query params and their values
       *
       **/
      function queryParams() {
        const params = {};
        urlBase.searchParams.forEach((value, key) => {
          params[key] = value;
        });

        return params;
      }

      /**
       * Returns an array with all the query param keys
       *
       **/
      function queryParamsKeys() {
        const params = [];
        urlBase.searchParams.forEach((_value, key) => {
          params.push(key);
        });

        return params;
      }

      /**
       * Returns an array with all the query param values
       *
       **/
      function queryParamsValues() {
        const params = [];
        urlBase.searchParams.forEach((value) => {
          params.push(value);
        });

        return params;
      }

      /**
       * Returns an array with all the elements of a pathname
       *
       **/
      function pathNames() {
        return getPathNames(urlBase.pathname);
      }

      /**
       * Returns an array with all the parts of a pathname
       * Private method
       **/
      function getPathNames(pathName) {
        if (pathName === '/' || pathName.trim().length === 0) return [pathName];
        if (pathName.slice(-1) === '/') {
          pathName = pathName.slice(0, -1);
        }
        if (pathName[0] === '/') {
          pathName = pathName.slice(1);
        }

        return pathName.split('/');
      }

      return Object.freeze({
        hash: hash(),
        host: host(),
        hostname: hostname(),
        namedParams: namedParams(),
        namedParamsKeys: namedParamsKeys(),
        namedParamsValues: namedParamsValues(),
        pathNames: pathNames(),
        port: port(),
        pathname: pathname(),
        protocol: protocol(),
        search: search(),
        queryParams: queryParams(),
        queryParamsKeys: queryParamsKeys(),
        queryParamsValues: queryParamsValues(),
      });
    };

    /**
     * Returns true if object has any nested routes empty
     * @param routeObject
     **/
    const anyEmptyNestedRoutes = (routeObject) => {
      let result = false;
      if (Object.keys(routeObject).length === 0) {
        return true;
      }

      if (routeObject.childRoute && Object.keys(routeObject.childRoute).length === 0) {
        result = true;
      } else if (routeObject.childRoute) {
        result = anyEmptyNestedRoutes(routeObject.childRoute);
      }

      return result;
    };

    /**
     * Compare two routes ignoring named params
     * @param pathName string
     * @param routeName string
     **/

    const compareRoutes = (pathName, routeName) => {
      routeName = removeSlash(routeName);

      if (routeName.includes(':')) {
        return routeName.includes(pathName);
      } else {
        return routeName.startsWith(pathName);
      }
    };

    /**
     * Returns a boolean indicating if the name of path exists in the route based on the language parameter
     * @param pathName string
     * @param route object
     * @param language string
     **/

    const findLocalisedRoute = (pathName, route, language) => {
      let exists = false;

      if (language) {
        return { exists: route.lang && route.lang[language] && route.lang[language].includes(pathName), language };
      }

      exists = compareRoutes(pathName, route.name);

      if (!exists && route.lang && typeof route.lang === 'object') {
        for (const [key, value] of Object.entries(route.lang)) {
          if (compareRoutes(pathName, value)) {
            exists = true;
            language = key;
          }
        }
      }

      return { exists, language };
    };

    /**
     * Return all the consecutive named param (placeholders) of a pathname
     * @param pathname
     **/
    const getNamedParams = (pathName = '') => {
      if (pathName.trim().length === 0) return [];
      const namedUrlParams = getPathNames(pathName);
      return namedUrlParams.reduce((validParams, param) => {
        if (param[0] === ':') {
          validParams.push(param.slice(1));
        }

        return validParams;
      }, []);
    };

    /**
     * Split a pathname based on /
     * @param pathName
     * Private method
     **/
    const getPathNames = (pathName) => {
      if (pathName === '/' || pathName.trim().length === 0) return [pathName];

      pathName = removeSlash(pathName, 'both');

      return pathName.split('/');
    };

    /**
     * Return the first part of a pathname until the first named param is found
     * @param name
     **/
    const nameToPath = (name = '') => {
      let routeName;
      if (name === '/' || name.trim().length === 0) return name;
      name = removeSlash(name, 'lead');
      routeName = name.split(':')[0];
      routeName = removeSlash(routeName, 'trail');

      return routeName.toLowerCase();
    };

    /**
     * Return the path name excluding query params
     * @param name
     **/
    const pathWithoutQueryParams = (currentRoute) => {
      const path = currentRoute.path.split('?');
      return path[0];
    };

    /**
     * Return the path name including query params
     * @param name
     **/
    const pathWithQueryParams = (currentRoute) => {
      let queryParams = [];
      if (currentRoute.queryParams) {
        for (let [key, value] of Object.entries(currentRoute.queryParams)) {
          queryParams.push(`${key}=${value}`);
        }
      }

      const hash = currentRoute.hash ? currentRoute.hash : '';

      if (queryParams.length > 0) {
        return `${currentRoute.path}?${queryParams.join('&')}${hash}`;
      } else {
        return currentRoute.path + hash;
      }
    };

    /**
     * Returns a string with trailing or leading slash character removed
     * @param pathName string
     * @param position string - lead, trail, both
     **/
    const removeExtraPaths = (pathNames, basePathNames) => {
      const names = basePathNames.split('/');
      if (names.length > 1) {
        names.forEach(function (name, index) {
          if (name.length > 0 && index > 0) {
            pathNames.shift();
          }
        });
      }

      return pathNames;
    };

    /**
     * Returns a string with trailing or leading slash character removed
     * @param pathName string
     * @param position string - lead, trail, both
     **/

    const removeSlash = (pathName, position = 'lead') => {
      if (position === 'trail' || position === 'both') {
        pathName = pathName.replace(/\/$/, '');
      }

      if (position === 'lead' || position === 'both') {
        pathName = pathName.replace(/^\//, '');
      }

      return pathName;
    };

    /**
     * Returns the name of the route based on the language parameter
     * @param route object
     * @param language string
     **/

    const routeNameLocalised = (route, language = null) => {
      if (!language || !route.lang || !route.lang[language]) {
        return route.name;
      } else {
        return route.lang[language];
      }
    };

    /**
     * Return the path name excluding query params
     * @param name
     **/
    const startsWithNamedParam = (currentRoute) => {
      const routeName = removeSlash(currentRoute);

      return routeName.startsWith(':');
    };

    /**
     * Updates the base route path.
     * Route objects can have nested routes (childRoutes) or just a long name like "admin/employees/show/:id"
     *
     * @param basePath string
     * @param pathNames array
     * @param route object
     * @param language string
     **/

    const updateRoutePath = (basePath, pathNames, route, language, convert = false) => {
      if (basePath === '/' || basePath.trim().length === 0) return { result: basePath, language: null };

      let basePathResult = basePath;
      let routeName = route.name;
      let currentLanguage = language;

      if (convert) {
        currentLanguage = '';
      }

      routeName = removeSlash(routeName);
      basePathResult = removeSlash(basePathResult);

      if (!route.childRoute) {
        let localisedRoute = findLocalisedRoute(basePathResult, route, currentLanguage);

        if (localisedRoute.exists && convert) {
          basePathResult = routeNameLocalised(route, language);
        }

        let routeNames = routeName.split(':')[0];
        routeNames = removeSlash(routeNames, 'trail');
        routeNames = routeNames.split('/');
        routeNames.shift();
        routeNames.forEach(() => {
          const currentPathName = pathNames[0];
          localisedRoute = findLocalisedRoute(`${basePathResult}/${currentPathName}`, route, currentLanguage);

          if (currentPathName && localisedRoute.exists) {
            if (convert) {
              basePathResult = routeNameLocalised(route, language);
            } else {
              basePathResult = `${basePathResult}/${currentPathName}`;
            }
            pathNames.shift();
          } else {
            return { result: basePathResult, language: localisedRoute.language };
          }
        });
        return { result: basePathResult, language: localisedRoute.language };
      } else {
        return { result: basePath, language: currentLanguage };
      }
    };

    const RouterCurrent = (trackPage) => {
      const trackPageview = trackPage || false;
      let activeRoute = '';

      const setActive = (newRoute, updateBrowserHistory) => {
        activeRoute = newRoute.path;
        pushActiveRoute(newRoute, updateBrowserHistory);
      };

      const active = () => {
        return activeRoute;
      };

      /**
       * Returns true if pathName is current active route
       * @param pathName String The path name to check against the current route.
       * @param includePath Boolean if true checks that pathName is included in current route. If false should match it.
       **/
      const isActive = (queryPath, includePath = false) => {
        if (queryPath[0] !== '/') {
          queryPath = '/' + queryPath;
        }

        // remove query params for comparison
        let pathName = UrlParser(`http://fake.com${queryPath}`).pathname;
        let activeRoutePath = UrlParser(`http://fake.com${activeRoute}`).pathname;

        pathName = removeSlash(pathName, 'trail');

        activeRoutePath = removeSlash(activeRoutePath, 'trail');

        if (includePath) {
          return activeRoutePath.includes(pathName);
        } else {
          return activeRoutePath === pathName;
        }
      };

      const pushActiveRoute = (newRoute, updateBrowserHistory) => {
        if (typeof window !== 'undefined') {
          const pathAndSearch = pathWithQueryParams(newRoute);

          if (updateBrowserHistory) {
            window.history.pushState({ page: pathAndSearch }, '', pathAndSearch);
          }
          // Moving back in history does not update browser history but does update tracking.
          if (trackPageview) {
            gaTracking(pathAndSearch);
          }
        }
      };

      const gaTracking = (newPage) => {
        if (typeof ga !== 'undefined') {
          ga('set', 'page', newPage);
          ga('send', 'pageview');
        }
      };

      return Object.freeze({ active, isActive, setActive });
    };

    const RouterGuard = (onlyIf) => {
      const guardInfo = onlyIf;

      const valid = () => {
        return guardInfo && guardInfo.guard && typeof guardInfo.guard === 'function';
      };

      const redirect = () => {
        return !guardInfo.guard();
      };

      const redirectPath = () => {
        let destinationUrl = '/';
        if (guardInfo.redirect && guardInfo.redirect.length > 0) {
          destinationUrl = guardInfo.redirect;
        }

        return destinationUrl;
      };

      return Object.freeze({ valid, redirect, redirectPath });
    };

    const RouterRedirect = (route, currentPath) => {
      const guard = RouterGuard(route.onlyIf);

      const path = () => {
        let redirectTo = currentPath;
        if (route.redirectTo && route.redirectTo.length > 0) {
          redirectTo = route.redirectTo;
        }

        if (guard.valid() && guard.redirect()) {
          redirectTo = guard.redirectPath();
        }

        return redirectTo;
      };

      return Object.freeze({ path });
    };

    function RouterRoute({ routeInfo, path, routeNamedParams, urlParser, namedPath, language }) {
      const namedParams = () => {
        const parsedParams = UrlParser(`https://fake.com${urlParser.pathname}`, namedPath).namedParams;

        return { ...routeNamedParams, ...parsedParams };
      };

      const get = () => {
        return {
          name: path,
          component: routeInfo.component,
          hash: urlParser.hash,
          layout: routeInfo.layout,
          queryParams: urlParser.queryParams,
          namedParams: namedParams(),
          path,
          language,
        };
      };

      return Object.freeze({ get, namedParams });
    }

    function RouterPath({ basePath, basePathName, pathNames, convert, currentLanguage }) {
      let updatedPathRoute;
      let route;
      let routePathLanguage = currentLanguage;

      function updatedPath(currentRoute) {
        route = currentRoute;
        updatedPathRoute = updateRoutePath(basePathName, pathNames, route, routePathLanguage, convert);
        routePathLanguage = convert ? currentLanguage : updatedPathRoute.language;

        return updatedPathRoute;
      }

      function localisedPathName() {
        return routeNameLocalised(route, routePathLanguage);
      }

      function localisedRouteWithoutNamedParams() {
        return nameToPath(localisedPathName());
      }

      function basePathNameWithoutNamedParams() {
        return nameToPath(updatedPathRoute.result);
      }

      function namedPath() {
        let localisedPath = localisedPathName();
        if (localisedPath && !localisedPath.startsWith('/')) {
          localisedPath = '/' + localisedPath;
        }

        return basePath ? `${basePath}${localisedPath}` : localisedPath;
      }

      function routePath() {
        let routePathValue = `${basePath}/${basePathNameWithoutNamedParams()}`;
        if (routePathValue === '//') {
          routePathValue = '/';
        }

        if (routePathLanguage) {
          pathNames = removeExtraPaths(pathNames, localisedRouteWithoutNamedParams());
        }

        const namedParams = getNamedParams(localisedPathName());
        if (namedParams && namedParams.length > 0) {
          namedParams.forEach(function () {
            if (pathNames.length > 0) {
              routePathValue += `/${pathNames.shift()}`;
            }
          });
        }

        return routePathValue;
      }

      function routeLanguage() {
        return routePathLanguage;
      }

      function basePathSameAsLocalised() {
        return basePathNameWithoutNamedParams() === localisedRouteWithoutNamedParams();
      }

      return Object.freeze({
        basePathSameAsLocalised,
        updatedPath,
        basePathNameWithoutNamedParams,
        localisedPathName,
        localisedRouteWithoutNamedParams,
        namedPath,
        pathNames,
        routeLanguage,
        routePath,
      });
    }

    const NotFoundPage$1 = '/404.html';

    function RouterFinder({ routes, currentUrl, routerOptions, convert }) {
      const defaultLanguage = routerOptions.defaultLanguage;
      const sitePrefix = routerOptions.prefix ? routerOptions.prefix.toLowerCase() : '';
      const urlParser = parseCurrentUrl(currentUrl, sitePrefix);
      let redirectTo = '';
      let routeNamedParams = {};
      let staticParamMatch = false;

      function findActiveRoute() {
        let searchActiveRoute = searchActiveRoutes(routes, '', urlParser.pathNames, routerOptions.lang, convert);

        if (!searchActiveRoute || !Object.keys(searchActiveRoute).length || anyEmptyNestedRoutes(searchActiveRoute)) {
          if (typeof window !== 'undefined') {
            searchActiveRoute = routeNotFound(routerOptions.lang);
          }
        } else {
          searchActiveRoute.path = pathWithoutQueryParams(searchActiveRoute);
          if (sitePrefix) {
            searchActiveRoute.path = `/${sitePrefix}${searchActiveRoute.path}`;
          }
        }

        return searchActiveRoute;
      }

      /**
       * Gets an array of routes and the browser pathname and return the active route
       * @param routes
       * @param basePath
       * @param pathNames
       **/
      function searchActiveRoutes(routes, basePath, pathNames, currentLanguage, convert) {
        let currentRoute = {};
        let basePathName = pathNames.shift().toLowerCase();
        const routerPath = RouterPath({ basePath, basePathName, pathNames, convert, currentLanguage });
        staticParamMatch = false;

        routes.forEach(function (route) {
          routerPath.updatedPath(route);

          if (matchRoute(routerPath, route.name)) {
            let routePath = routerPath.routePath();
            redirectTo = RouterRedirect(route, redirectTo).path();

            if (currentRoute.name !== routePath) {
              currentRoute = setCurrentRoute({
                route,
                routePath,
                routeLanguage: routerPath.routeLanguage(),
                urlParser,
                namedPath: routerPath.namedPath(),
              });
            }

            if (route.nestedRoutes && route.nestedRoutes.length > 0 && routerPath.pathNames.length > 0) {
              currentRoute.childRoute = searchActiveRoutes(
                route.nestedRoutes,
                routePath,
                routerPath.pathNames,
                routerPath.routeLanguage(),
                convert
              );
              currentRoute.path = currentRoute.childRoute.path;
              currentRoute.language = currentRoute.childRoute.language;
            } else if (nestedRoutesAndNoPath(route, routerPath.pathNames)) {
              const indexRoute = searchActiveRoutes(
                route.nestedRoutes,
                routePath,
                ['index'],
                routerPath.routeLanguage(),
                convert
              );
              if (indexRoute && Object.keys(indexRoute).length > 0) {
                currentRoute.childRoute = indexRoute;
                currentRoute.language = currentRoute.childRoute.language;
              }
            }
          }
        });

        if (redirectTo) {
          currentRoute.redirectTo = redirectTo;
        }

        return currentRoute;
      }

      function matchRoute(routerPath, routeName) {
        const basePathSameAsLocalised = routerPath.basePathSameAsLocalised();
        if (basePathSameAsLocalised) {
          staticParamMatch = true;
        }

        return basePathSameAsLocalised || (!staticParamMatch && startsWithNamedParam(routeName));
      }

      function nestedRoutesAndNoPath(route, pathNames) {
        return route.nestedRoutes && route.nestedRoutes.length > 0 && pathNames.length === 0;
      }

      function parseCurrentUrl(currentUrl, sitePrefix) {
        if (sitePrefix && sitePrefix.trim().length > 0) {
          const replacePattern = currentUrl.endsWith(sitePrefix) ? sitePrefix : sitePrefix + "/";
          const noPrefixUrl = currentUrl.replace(replacePattern, '');
          return UrlParser(noPrefixUrl);
        } else {
          return UrlParser(currentUrl);
        }
      }

      function setCurrentRoute({ route, routePath, routeLanguage, urlParser, namedPath }) {
        const routerRoute = RouterRoute({
          routeInfo: route,
          urlParser,
          path: routePath,
          routeNamedParams,
          namedPath,
          language: routeLanguage || defaultLanguage,
        });
        routeNamedParams = routerRoute.namedParams();

        return routerRoute.get();
      }

      const routeNotFound = (customLanguage) => {
        const custom404Page = routes.find((route) => route.name == '404');
        const language = customLanguage || defaultLanguage || '';
        if (custom404Page) {
          return { ...custom404Page, language, path: '404' };
        } else {
          return { name: '404', component: '', path: '404', redirectTo: NotFoundPage$1 };
        }
      };

      return Object.freeze({ findActiveRoute });
    }

    const NotFoundPage = '/404.html';

    let userDefinedRoutes = [];
    let routerOptions = {};
    let routerCurrent;

    /**
     * Object exposes one single property: activeRoute
     * @param routes  Array of routes
     * @param currentUrl current url
     * @param options configuration options
     **/
    const SpaRouter = (routes, currentUrl, options = {}) => {
      routerOptions = { ...options };
      if (typeof currentUrl === 'undefined' || currentUrl === '') {
        currentUrl = document.location.href;
      }

      routerCurrent = RouterCurrent(routerOptions.gaPageviews);

      currentUrl = removeSlash(currentUrl, 'trail');
      userDefinedRoutes = routes;

      const findActiveRoute = () => {
        let convert = false;

        if (routerOptions.langConvertTo) {
          routerOptions.lang = routerOptions.langConvertTo;
          convert = true;
        }

        return RouterFinder({ routes, currentUrl, routerOptions, convert }).findActiveRoute();
      };

      /**
       * Redirect current route to another
       * @param destinationUrl
       **/
      const navigateNow = (destinationUrl, updateBrowserHistory) => {
        if (typeof window !== 'undefined') {
          if (destinationUrl === NotFoundPage) {
            routerCurrent.setActive({ path: NotFoundPage }, updateBrowserHistory);
          } else {
            navigateTo(destinationUrl);
          }
        }

        return destinationUrl;
      };

      const setActiveRoute = (updateBrowserHistory = true) => {
        const currentRoute = findActiveRoute();
        if (currentRoute.redirectTo) {
          return navigateNow(currentRoute.redirectTo, updateBrowserHistory);
        }

        routerCurrent.setActive(currentRoute, updateBrowserHistory);
        activeRoute.set(currentRoute);

        return currentRoute;
      };

      return Object.freeze({
        setActiveRoute,
        findActiveRoute,
      });
    };

    /**
     * Updates the current active route and updates the browser pathname
     * @param pathName String
     * @param language String
     * @param updateBrowserHistory Boolean
     **/
    const navigateTo = (pathName, language = null, updateBrowserHistory = true) => {
      pathName = removeSlash(pathName, 'lead');

      if (language) {
        routerOptions.langConvertTo = language;
      }

      return SpaRouter(userDefinedRoutes, 'http://fake.com/' + pathName, routerOptions).setActiveRoute(
        updateBrowserHistory
      );
    };

    /**
     * Returns true if pathName is current active route
     * @param pathName String The path name to check against the current route.
     * @param includePath Boolean if true checks that pathName is included in current route. If false should match it.
     **/
    const routeIsActive = (queryPath, includePath = false) => {
      return routerCurrent.isActive(queryPath, includePath);
    };

    if (typeof window !== 'undefined') {
      // Avoid full page reload on local routes
      window.addEventListener('click', (event) => {
        if (event.target.localName.toLowerCase() !== 'a') return;
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;

        const sitePrefix = routerOptions.prefix ? `/${routerOptions.prefix.toLowerCase()}` : '';
        const targetHostNameInternal = event.target.pathname && event.target.host === window.location.host;
        const prefixMatchPath = sitePrefix.length > 1 ? event.target.pathname.startsWith(sitePrefix) : true;

        if (targetHostNameInternal && prefixMatchPath) {
          event.preventDefault();
          let navigatePathname = event.target.pathname + event.target.search;

          const destinationUrl = navigatePathname + event.target.search + event.target.hash;
          if (event.target.target === '_blank') {
            window.open(destinationUrl, 'newTab');
          } else {
            navigateTo(destinationUrl);
          }
        }
      });

      window.onpopstate = function (_event) {
        let navigatePathname = window.location.pathname + window.location.search + window.location.hash;

        navigateTo(navigatePathname, null, false);
      };
    }

    /* node_modules\svelte-router-spa\src\components\route.svelte generated by Svelte v3.48.0 */

    // (10:34) 
    function create_if_block_2$3(ctx) {
    	let route;
    	let current;

    	route = new Route({
    			props: {
    				currentRoute: /*currentRoute*/ ctx[0].childRoute,
    				params: /*params*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route_changes = {};
    			if (dirty & /*currentRoute*/ 1) route_changes.currentRoute = /*currentRoute*/ ctx[0].childRoute;
    			if (dirty & /*params*/ 2) route_changes.params = /*params*/ ctx[1];
    			route.$set(route_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(10:34) ",
    		ctx
    	});

    	return block;
    }

    // (8:33) 
    function create_if_block_1$4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*currentRoute*/ ctx[0].component;

    	function switch_props(ctx) {
    		return {
    			props: {
    				currentRoute: {
    					.../*currentRoute*/ ctx[0],
    					component: ''
    				},
    				params: /*params*/ ctx[1]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*currentRoute*/ 1) switch_instance_changes.currentRoute = {
    				.../*currentRoute*/ ctx[0],
    				component: ''
    			};

    			if (dirty & /*params*/ 2) switch_instance_changes.params = /*params*/ ctx[1];

    			if (switch_value !== (switch_value = /*currentRoute*/ ctx[0].component)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(8:33) ",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if currentRoute.layout}
    function create_if_block$9(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*currentRoute*/ ctx[0].layout;

    	function switch_props(ctx) {
    		return {
    			props: {
    				currentRoute: { .../*currentRoute*/ ctx[0], layout: '' },
    				params: /*params*/ ctx[1]
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*currentRoute*/ 1) switch_instance_changes.currentRoute = { .../*currentRoute*/ ctx[0], layout: '' };
    			if (dirty & /*params*/ 2) switch_instance_changes.params = /*params*/ ctx[1];

    			if (switch_value !== (switch_value = /*currentRoute*/ ctx[0].layout)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(6:0) {#if currentRoute.layout}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$E(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$9, create_if_block_1$4, create_if_block_2$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*currentRoute*/ ctx[0].layout) return 0;
    		if (/*currentRoute*/ ctx[0].component) return 1;
    		if (/*currentRoute*/ ctx[0].childRoute) return 2;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$E.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$E($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, []);
    	let { currentRoute = {} } = $$props;
    	let { params = {} } = $$props;
    	const writable_props = ['currentRoute', 'params'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Route> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('currentRoute' in $$props) $$invalidate(0, currentRoute = $$props.currentRoute);
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	$$self.$capture_state = () => ({ currentRoute, params });

    	$$self.$inject_state = $$props => {
    		if ('currentRoute' in $$props) $$invalidate(0, currentRoute = $$props.currentRoute);
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [currentRoute, params];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$E, create_fragment$E, safe_not_equal, { currentRoute: 0, params: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$E.name
    		});
    	}

    	get currentRoute() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentRoute(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get params() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set params(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-router-spa\src\components\router.svelte generated by Svelte v3.48.0 */

    function create_fragment$D(ctx) {
    	let route;
    	let current;

    	route = new Route({
    			props: { currentRoute: /*$activeRoute*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(route, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const route_changes = {};
    			if (dirty & /*$activeRoute*/ 1) route_changes.currentRoute = /*$activeRoute*/ ctx[0];
    			route.$set(route_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$D.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$D($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, $$value => $$invalidate(0, $activeRoute = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, []);
    	let { routes = [] } = $$props;
    	let { options = {} } = $$props;

    	onMount(() => {
    		SpaRouter(routes, document.location.href, options).setActiveRoute();
    	});

    	const writable_props = ['routes', 'options'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(1, routes = $$props.routes);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    	};

    	$$self.$capture_state = () => ({
    		onMount,
    		SpaRouter,
    		Route,
    		activeRoute,
    		routes,
    		options,
    		$activeRoute
    	});

    	$$self.$inject_state = $$props => {
    		if ('routes' in $$props) $$invalidate(1, routes = $$props.routes);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$activeRoute, routes, options];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$D, create_fragment$D, safe_not_equal, { routes: 1, options: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$D.name
    		});
    	}

    	get routes() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set routes(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function createStore$7() {
        const { update, set, subscribe } = writable({
            title: "",
            message: "",
        });

        return {
            update,
            subscribe,
            //Создать оповещение (показать его на экране)
            createNotification: (title, message) => {
                set({ title, message });
            },
        };
    }

    const notificationStore = createStore$7();

    let indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;

    function connectDB(cb) {
        let request = indexedDB.open("db", 1);
        request.onerror = function (e) {
            console.log(e);
        };
        request.onsuccess = function () {
            cb(request.result);
        };
        request.onupgradeneeded = function (e) {
            e.currentTarget.result.createObjectStore("roles", {
                keyPath: "key",
            });
            connectDB(cb);
        };
    }

    function getValue(key, objStore, successCallback, errorCallback) {
        connectDB(function (db) {
            let request = db
                .transaction([objStore], "readonly")
                .objectStore(objStore)
                .get(key);
            request.onerror = (e) => errorCallback(e);
            request.onsuccess = function () {
                successCallback(request.result ? request.result : undefined);
            };
        });
    }

    function setValue(key, value, objStore, successCallback, errorCallback) {
        connectDB(function (db) {
            let request = db
                .transaction([objStore], "readwrite")
                .objectStore(objStore)
                .put({ value, key });
            request.onerror = (e) => errorCallback(e);
            request.onsuccess = function () {
                successCallback();
            };
        });
    }

    function convertImageToBase64(file, resultCallback) {
        var reader = new FileReader();

        reader.onload = function (frEvent) {
            resultCallback(frEvent.target.result);
        };
        reader.readAsDataURL(file);
    }

    function initStore$1() {
        const initialStore = {
            hiddeningCardsFlag: false, //Флаг скрытия карт с экрана (false - по клику, true - по таймеру)
            hiddeningCardsFlagTimer: 5, //Количество секунд, после которых карта при выдаче автоматически скроется (только при hiddeningCardsFlag = true)
            menuViewFlag: false, //Флаг показа/скрытия меню по свайпу
            deathZoneSwipe: 25, //Мертвая зопа свайпов (в процентах ширины экрана)
            viewIconsCards: true, //Флаг показа/скрытия иконок ролей при выдаче карт
            viewDescriptionCards: true, //Флаг показа/скрытия описания ролей при выдаче карт
            disableAnimationsFlag: false, //Флаг отключения анимаций и переходов в приложении
        };
        if (localStorage.getItem("settings") !== null) {
            return {
                ...initialStore,
                ...JSON.parse(localStorage.getItem("settings")),
            };
        } else {
            return initialStore;
        }
    }

    function createStore$6() {
        const { update, subscribe } = writable(initStore$1());

        return {
            update,
            subscribe,
            //Сохранение всех настроек в хранилище
            saveSettingsInLocalStorage: () => {
                if (localStorage.getItem("settings") !== null) {
                    const oldSettings = JSON.parse(
                        localStorage.getItem("settings")
                    );
                    localStorage.setItem(
                        "settings",
                        JSON.stringify({ ...oldSettings, ...get_store_value(settingsStore) })
                    );
                } else {
                    localStorage.setItem(
                        "settings",
                        JSON.stringify({ ...get_store_value(settingsStore) })
                    );
                }
            },
            //onChange на Input смены типа скрытия карт (по клику или по таймеру)
            onChangeFlagHiddeningCards: (e) => {
                update((prev) => {
                    return {
                        ...prev,
                        hiddeningCardsFlag: e.target.checked,
                    };
                });
                settingsStore.saveSettingsInLocalStorage();
            },
            //Изменить значение таймера, после которого будут скрываться карты во время выдачи
            onChangeHiddeningCardsTimer: (e) => {
                if (Number(e.target.value) !== NaN) {
                    update((prev) => {
                        return {
                            ...prev,
                            hiddeningCardsFlagTimer: e.target.value,
                        };
                    });
                    settingsStore.saveSettingsInLocalStorage();
                }
            },
            //Изменить состояние флага показа меню на экране
            changeViewFlag: (value) => {
                update((prev) => {
                    return {
                        ...prev,
                        menuViewFlag: value,
                    };
                });
            },
            //Изменить мертвую зону свайпов (значение то 10 до 90% ширины экрана)
            onChangeDeathZoneSwipe: (event) => {
                update((prev) => {
                    return {
                        ...prev,
                        deathZoneSwipe: event.target.value,
                    };
                });
                settingsStore.saveSettingsInLocalStorage();
            },
            //Изменить флаг отображения картинок ролей во время выдачи
            onChangeViewIconsFlag: (e) => {
                update((prev) => {
                    return {
                        ...prev,
                        viewIconsCards: e.target.checked,
                    };
                });
                settingsStore.saveSettingsInLocalStorage();
            },
            //Изменить флаг отображения картинок ролей во время выдачи
            onChangeDisableAnimationsFlag: (e) => {
                update((prev) => {
                    return {
                        ...prev,
                        disableAnimationsFlag: e.target.checked,
                    };
                });
                settingsStore.saveSettingsInLocalStorage();
            },
            //Изменить флаг отображения описания ролей во время выдачи
            onChangeViewDescriptionsFlag: (e) => {
                update((prev) => {
                    return {
                        ...prev,
                        viewDescriptionCards: e.target.checked,
                    };
                });
                settingsStore.saveSettingsInLocalStorage();
            },
            //Сохранение кастом иконки для роли (key - название роли)
            saveCustomIcon: (key, file) => {
                convertImageToBase64(file, (fileData) => {
                    setValue(
                        key,
                        fileData,
                        "roles",
                        () => {
                            notificationStore.createNotification(
                                "Оповещение",
                                "Новая иконка для роли успешно сохранена"
                            );
                        },
                        (e) => {
                            notificationStore.createNotification(
                                "Внимание",
                                "Не удалось сохранить иконку для роли из-за непредвиденной ошибки. Попробуйте перезапустить приложение."
                            );
                        }
                    );
                });
            },
        };
    }

    const settingsStore = createStore$6();

    /* src\components\Transition.svelte generated by Svelte v3.48.0 */
    const file$A = "src\\components\\Transition.svelte";

    // (42:4) {#if viewFlag}
    function create_if_block$8(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 64)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[6],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[6])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[6], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(42:4) {#if viewFlag}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$C(ctx) {
    	let div;
    	let current;
    	let if_block = /*viewFlag*/ ctx[0] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			attr_dev(div, "class", "animationContainer svelte-r97p7f");
    			add_location(div, file$A, 40, 0, 1446);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			/*div_binding*/ ctx[8](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*viewFlag*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*viewFlag*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			/*div_binding*/ ctx[8](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$C.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$C($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(9, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Transition', slots, ['default']);
    	let { showFlag = false, mountClass = "mountingStage", unmountClass = "unmountingStage", unmountDuration = 10000 } = $$props;
    	let viewFlag = false, animationNode;

    	afterUpdate(async () => {
    		if (showFlag && !viewFlag) {
    			$$invalidate(0, viewFlag = true);
    			await tick();

    			if (animationNode.children.length > 0) {
    				const timer = setTimeout(
    					() => {
    						animationNode.firstChild.classList.add(mountClass);

    						if ($settingsStore.disableAnimationsFlag) {
    							$$invalidate(1, animationNode.firstChild.style.transition = "none", animationNode);
    						}

    						clearTimeout(timer);
    					},
    					1
    				);
    			}
    		}

    		if (animationNode.children.length > 0 && !showFlag) {
    			animationNode.firstChild.classList.add(unmountClass);

    			if ($settingsStore.disableAnimationsFlag) {
    				$$invalidate(1, animationNode.firstChild.style.transition = "none", animationNode);
    			}

    			window.setTimeout(
    				() => {
    					$$invalidate(0, viewFlag = false);
    					animationNode?.firstChild?.classList?.remove(unmountClass);
    					animationNode?.firstChild?.classList?.remove(mountClass);
    				},
    				unmountDuration
    			);
    		}
    	});

    	const writable_props = ['showFlag', 'mountClass', 'unmountClass', 'unmountDuration'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Transition> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			animationNode = $$value;
    			$$invalidate(1, animationNode);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('showFlag' in $$props) $$invalidate(2, showFlag = $$props.showFlag);
    		if ('mountClass' in $$props) $$invalidate(3, mountClass = $$props.mountClass);
    		if ('unmountClass' in $$props) $$invalidate(4, unmountClass = $$props.unmountClass);
    		if ('unmountDuration' in $$props) $$invalidate(5, unmountDuration = $$props.unmountDuration);
    		if ('$$scope' in $$props) $$invalidate(6, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		tick,
    		settingsStore,
    		showFlag,
    		mountClass,
    		unmountClass,
    		unmountDuration,
    		viewFlag,
    		animationNode,
    		$settingsStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('showFlag' in $$props) $$invalidate(2, showFlag = $$props.showFlag);
    		if ('mountClass' in $$props) $$invalidate(3, mountClass = $$props.mountClass);
    		if ('unmountClass' in $$props) $$invalidate(4, unmountClass = $$props.unmountClass);
    		if ('unmountDuration' in $$props) $$invalidate(5, unmountDuration = $$props.unmountDuration);
    		if ('viewFlag' in $$props) $$invalidate(0, viewFlag = $$props.viewFlag);
    		if ('animationNode' in $$props) $$invalidate(1, animationNode = $$props.animationNode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		viewFlag,
    		animationNode,
    		showFlag,
    		mountClass,
    		unmountClass,
    		unmountDuration,
    		$$scope,
    		slots,
    		div_binding
    	];
    }

    class Transition extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$C, create_fragment$C, safe_not_equal, {
    			showFlag: 2,
    			mountClass: 3,
    			unmountClass: 4,
    			unmountDuration: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Transition",
    			options,
    			id: create_fragment$C.name
    		});
    	}

    	get showFlag() {
    		throw new Error("<Transition>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showFlag(value) {
    		throw new Error("<Transition>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mountClass() {
    		throw new Error("<Transition>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mountClass(value) {
    		throw new Error("<Transition>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get unmountClass() {
    		throw new Error("<Transition>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set unmountClass(value) {
    		throw new Error("<Transition>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get unmountDuration() {
    		throw new Error("<Transition>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set unmountDuration(value) {
    		throw new Error("<Transition>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Notification.svelte generated by Svelte v3.48.0 */
    const file$z = "src\\components\\Notification.svelte";

    // (20:0) <Transition      {showFlag}      mountClass={"notificationMounting"}      unmountClass={"notificationUnmounting"}      unmountDuration={400}  >
    function create_default_slot$m(ctx) {
    	let div;
    	let span;
    	let t0_value = /*$notificationStore*/ ctx[0].title + "";
    	let t0;
    	let t1;
    	let p;
    	let t2_value = /*$notificationStore*/ ctx[0].message + "";
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			p = element("p");
    			t2 = text(t2_value);
    			attr_dev(span, "class", "svelte-1tb3fna");
    			add_location(span, file$z, 26, 8, 635);
    			attr_dev(p, "class", "svelte-1tb3fna");
    			add_location(p, file$z, 27, 8, 684);
    			attr_dev(div, "class", "notification svelte-1tb3fna");
    			add_location(div, file$z, 25, 4, 599);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span);
    			append_dev(span, t0);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$notificationStore*/ 1 && t0_value !== (t0_value = /*$notificationStore*/ ctx[0].title + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$notificationStore*/ 1 && t2_value !== (t2_value = /*$notificationStore*/ ctx[0].message + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$m.name,
    		type: "slot",
    		source: "(20:0) <Transition      {showFlag}      mountClass={\\\"notificationMounting\\\"}      unmountClass={\\\"notificationUnmounting\\\"}      unmountDuration={400}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$B(ctx) {
    	let transition;
    	let current;

    	transition = new Transition({
    			props: {
    				showFlag: /*showFlag*/ ctx[1],
    				mountClass: "notificationMounting",
    				unmountClass: "notificationUnmounting",
    				unmountDuration: 400,
    				$$slots: { default: [create_default_slot$m] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(transition.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(transition, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const transition_changes = {};
    			if (dirty & /*showFlag*/ 2) transition_changes.showFlag = /*showFlag*/ ctx[1];

    			if (dirty & /*$$scope, $notificationStore*/ 5) {
    				transition_changes.$$scope = { dirty, ctx };
    			}

    			transition.$set(transition_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(transition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(transition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(transition, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$B.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$B($$self, $$props, $$invalidate) {
    	let $notificationStore;
    	validate_store(notificationStore, 'notificationStore');
    	component_subscribe($$self, notificationStore, $$value => $$invalidate(0, $notificationStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Notification', slots, []);
    	let showFlag = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Notification> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		notificationStore,
    		Transition,
    		showFlag,
    		$notificationStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('showFlag' in $$props) $$invalidate(1, showFlag = $$props.showFlag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$notificationStore*/ 1) {
    			{
    				if ($notificationStore.title.length > 0 && $notificationStore.message.length > 0) {
    					$$invalidate(1, showFlag = true);

    					setTimeout(
    						() => {
    							$$invalidate(1, showFlag = false);
    						},
    						3000
    					);
    				}
    			}
    		}
    	};

    	return [$notificationStore, showFlag];
    }

    class Notification extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$B, create_fragment$B, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Notification",
    			options,
    			id: create_fragment$B.name
    		});
    	}
    }

    /* src\components\Modal.svelte generated by Svelte v3.48.0 */
    const file$y = "src\\components\\Modal.svelte";

    // (9:0) <Transition      {showFlag}      mountClass={"modalMounting"}      unmountClass={"modalUnmounting"}      unmountDuration={300}  >
    function create_default_slot$l(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "modal svelte-1rdtwum");
    			attr_dev(div, "style", /*style*/ ctx[0]);
    			add_location(div, file$y, 14, 4, 298);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"click",
    					function () {
    						if (is_function(/*clickEvent*/ ctx[1])) /*clickEvent*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*style*/ 1) {
    				attr_dev(div, "style", /*style*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$l.name,
    		type: "slot",
    		source: "(9:0) <Transition      {showFlag}      mountClass={\\\"modalMounting\\\"}      unmountClass={\\\"modalUnmounting\\\"}      unmountDuration={300}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$A(ctx) {
    	let transition;
    	let current;

    	transition = new Transition({
    			props: {
    				showFlag: /*showFlag*/ ctx[2],
    				mountClass: "modalMounting",
    				unmountClass: "modalUnmounting",
    				unmountDuration: 300,
    				$$slots: { default: [create_default_slot$l] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(transition.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(transition, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const transition_changes = {};
    			if (dirty & /*showFlag*/ 4) transition_changes.showFlag = /*showFlag*/ ctx[2];

    			if (dirty & /*$$scope, style, clickEvent*/ 19) {
    				transition_changes.$$scope = { dirty, ctx };
    			}

    			transition.$set(transition_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(transition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(transition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(transition, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default']);

    	let { style = "", clickEvent = () => {
    		
    	}, showFlag = false } = $$props;

    	const writable_props = ['style', 'clickEvent', 'showFlag'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('clickEvent' in $$props) $$invalidate(1, clickEvent = $$props.clickEvent);
    		if ('showFlag' in $$props) $$invalidate(2, showFlag = $$props.showFlag);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ Transition, style, clickEvent, showFlag });

    	$$self.$inject_state = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('clickEvent' in $$props) $$invalidate(1, clickEvent = $$props.clickEvent);
    		if ('showFlag' in $$props) $$invalidate(2, showFlag = $$props.showFlag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [style, clickEvent, showFlag, slots, $$scope];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, { style: 0, clickEvent: 1, showFlag: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$A.name
    		});
    	}

    	get style() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get clickEvent() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set clickEvent(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showFlag() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showFlag(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function createStore$5() {
        const { set, subscribe, update } = writable({
            cardsHiddened: [],
            cardsOpened: [],
            distributionDate: 0,
            applicationLoaded: false, //Флаг загрузки приложения (нужен для фикса бага Cordova)
        });

        return {
            subscribe,
            update,
            //Смена флага загрузки приложения во время инициализации Cordova
            applicationLoaded: (value) => {
                update((prev) => {
                    return {
                        ...prev,
                        applicationLoaded: value,
                    };
                });
            },
            //Перемешивание карт для выдачи
            shuffleCards: (cards) => {
                let suffledCards = cards;
                for (let i = 0; i < 100; i++) {
                    suffledCards.sort(() => Math.random() - 0.5);
                }
                //Загрузка массива карт в store для показа игрокам
                set({ cardsHiddened: suffledCards, cardsOpened: [] });
            },
            //Сохранить уже открытые карты в массиве вскрытых карт
            pushToHistoryDistribution: (card) => {
                const cards = get_store_value(mainStore).cardsOpened;
                update((prev) => {
                    return {
                        ...prev,
                        cardsOpened: [...cards, card],
                    };
                });
            },

            //Удалить из массива скрытых карт ту, которую сейчас при выдаче видит игрок
            deleteOpenedCard: (card) => {
                const cards = get_store_value(mainStore).cardsHiddened;
                cards.shift();
                update((prev) => {
                    return {
                        ...prev,
                        cardsHiddened: cards,
                    };
                });
            },
            //Вернуть карту в ротацию для показа (если игрок не успел посмотреть на свою роль)
            returnOpenedCardInRotation: () => {
                const hiddened = get_store_value(mainStore).cardsHiddened;
                let opened = get_store_value(mainStore).cardsOpened;
                const returnedCard = opened[opened.length - 1];
                opened.pop();
                update((prev) => {
                    return {
                        ...prev,
                        cardsOpened: opened,
                        cardsHiddened: [returnedCard, ...hiddened],
                    };
                });
                mainStore.saveDistributionInLocalStorage();
                notificationStore.createNotification(
                    "Оповещение",
                    "Карта возвращена в ротацию на выдачу"
                );
            },
            //Сохранить дату проведения раздачи (нужно для корректной работы "истории раздач")
            saveDistributionDate: () => {
                let d = new Date();
                let seconds = Math.round(d.getTime() / 1000);
                update((prev) => {
                    return {
                        ...prev,
                        distributionDate: seconds,
                    };
                });
            },
            //Сохранение текущей раздачи в хранилище
            saveDistributionInLocalStorage: () => {
                let history = [];
                const store = get_store_value(mainStore);
                if (localStorage.getItem("history") !== null) {
                    history = JSON.parse(localStorage.getItem("history"));
                    if (history[0].dateID === store.distributionDate) {
                        history[0] = {
                            dateID: store.distributionDate,
                            cardsOpened: store.cardsOpened,
                            cardsHiddened: store.cardsHiddened,
                        };
                    } else {
                        if (Object.keys(history).length >= 100) {
                            history.pop();
                        }
                        history.unshift({
                            dateID: store.distributionDate,
                            cardsOpened: store.cardsOpened,
                            cardsHiddened: store.cardsHiddened,
                        });
                    }
                } else {
                    history.push({
                        dateID: store.distributionDate,
                        cardsOpened: store.cardsOpened,
                        cardsHiddened: store.cardsHiddened,
                    });
                }
                localStorage.setItem("history", JSON.stringify(history));
            },
        };
    }

    const mainStore = createStore$5();

    /* src\pages\SwipeMenu.svelte generated by Svelte v3.48.0 */
    const file$x = "src\\pages\\SwipeMenu.svelte";

    // (57:0) <Modal      showFlag={$settingsStore.menuViewFlag}      style={"z-index: 9999;"}      clickEvent={() => settingsStore.changeViewFlag(false)}  >
    function create_default_slot$k(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let nav;
    	let ul;
    	let li0;
    	let t3;
    	let li1;
    	let t5;
    	let li2;
    	let t7;
    	let li3;
    	let t9;
    	let li4;
    	let t11;
    	let li5;
    	let t13;
    	let li6;
    	let t15;
    	let li7;
    	let t16;
    	let span;
    	let t17;
    	let li7_class_value;
    	let div_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Меню";
    			t1 = space();
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Главная";
    			t3 = space();
    			li1 = element("li");
    			li1.textContent = "Раздать карты";
    			t5 = space();
    			li2 = element("li");
    			li2.textContent = "Заметки";
    			t7 = space();
    			li3 = element("li");
    			li3.textContent = "История игр";
    			t9 = space();
    			li4 = element("li");
    			li4.textContent = "Настройки";
    			t11 = space();
    			li5 = element("li");
    			li5.textContent = "Помощь";
    			t13 = space();
    			li6 = element("li");
    			li6.textContent = "Правила игры";
    			t15 = space();
    			li7 = element("li");
    			t16 = text("Вернуть прошлую карту в ротацию ");
    			span = element("span");
    			t17 = text("Доступно только во время выдачи карт игрокам");
    			add_location(h1, file$x, 67, 8, 2169);
    			attr_dev(li0, "class", "svelte-d2guz");
    			add_location(li0, file$x, 70, 16, 2286);
    			attr_dev(li1, "class", "svelte-d2guz");
    			add_location(li1, file$x, 71, 16, 2353);
    			attr_dev(li2, "class", "svelte-d2guz");
    			add_location(li2, file$x, 72, 16, 2429);
    			attr_dev(li3, "class", "svelte-d2guz");
    			add_location(li3, file$x, 73, 16, 2500);
    			attr_dev(li4, "class", "svelte-d2guz");
    			add_location(li4, file$x, 74, 16, 2577);
    			attr_dev(li5, "class", "svelte-d2guz");
    			add_location(li5, file$x, 75, 16, 2653);
    			attr_dev(li6, "class", "svelte-d2guz");
    			add_location(li6, file$x, 76, 16, 2722);
    			attr_dev(span, "class", "" + (null_to_empty(routeIsActive("show-distribution") ? "hiddened" : "") + " svelte-d2guz"));
    			add_location(span, file$x, 84, 52, 3136);

    			attr_dev(li7, "class", li7_class_value = "" + (null_to_empty(!routeIsActive("show-distribution") || /*$mainStore*/ ctx[2].cardsOpened.length === 0
    			? "disabled"
    			: "") + " svelte-d2guz"));

    			add_location(li7, file$x, 77, 16, 2798);
    			attr_dev(ul, "class", "svelte-d2guz");
    			add_location(ul, file$x, 69, 12, 2211);
    			add_location(nav, file$x, 68, 8, 2192);
    			attr_dev(div, "class", "swipeMenu svelte-d2guz");

    			attr_dev(div, "style", div_style_value = /*$settingsStore*/ ctx[0].disableAnimationsFlag
    			? "transition: none;"
    			: "");

    			toggle_class(div, "enabled", /*animationFlag*/ ctx[1]);
    			add_location(div, file$x, 61, 4, 1954);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t3);
    			append_dev(ul, li1);
    			append_dev(ul, t5);
    			append_dev(ul, li2);
    			append_dev(ul, t7);
    			append_dev(ul, li3);
    			append_dev(ul, t9);
    			append_dev(ul, li4);
    			append_dev(ul, t11);
    			append_dev(ul, li5);
    			append_dev(ul, t13);
    			append_dev(ul, li6);
    			append_dev(ul, t15);
    			append_dev(ul, li7);
    			append_dev(li7, t16);
    			append_dev(li7, span);
    			append_dev(span, t17);

    			if (!mounted) {
    				dispose = [
    					listen_dev(li0, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(li1, "click", /*click_handler_1*/ ctx[4], false, false, false),
    					listen_dev(li2, "click", /*click_handler_2*/ ctx[5], false, false, false),
    					listen_dev(li3, "click", /*click_handler_3*/ ctx[6], false, false, false),
    					listen_dev(li4, "click", /*click_handler_4*/ ctx[7], false, false, false),
    					listen_dev(li5, "click", /*click_handler_5*/ ctx[8], false, false, false),
    					listen_dev(li6, "click", /*click_handler_6*/ ctx[9], false, false, false),
    					listen_dev(li7, "click", mainStore.returnOpenedCardInRotation, false, false, false),
    					listen_dev(ul, "click", /*click_handler_7*/ ctx[10], false, false, false),
    					listen_dev(div, "click", click_handler_8, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$mainStore*/ 4 && li7_class_value !== (li7_class_value = "" + (null_to_empty(!routeIsActive("show-distribution") || /*$mainStore*/ ctx[2].cardsOpened.length === 0
    			? "disabled"
    			: "") + " svelte-d2guz"))) {
    				attr_dev(li7, "class", li7_class_value);
    			}

    			if (dirty & /*$settingsStore*/ 1 && div_style_value !== (div_style_value = /*$settingsStore*/ ctx[0].disableAnimationsFlag
    			? "transition: none;"
    			: "")) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (dirty & /*animationFlag*/ 2) {
    				toggle_class(div, "enabled", /*animationFlag*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$k.name,
    		type: "slot",
    		source: "(57:0) <Modal      showFlag={$settingsStore.menuViewFlag}      style={\\\"z-index: 9999;\\\"}      clickEvent={() => settingsStore.changeViewFlag(false)}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let modal;
    	let current;

    	modal = new Modal({
    			props: {
    				showFlag: /*$settingsStore*/ ctx[0].menuViewFlag,
    				style: "z-index: 9999;",
    				clickEvent: /*func*/ ctx[11],
    				$$slots: { default: [create_default_slot$k] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const modal_changes = {};
    			if (dirty & /*$settingsStore*/ 1) modal_changes.showFlag = /*$settingsStore*/ ctx[0].menuViewFlag;

    			if (dirty & /*$$scope, $settingsStore, animationFlag, $mainStore*/ 131079) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const click_handler_8 = e => e.stopPropagation();

    function instance$z($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	let $mainStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	validate_store(mainStore, 'mainStore');
    	component_subscribe($$self, mainStore, $$value => $$invalidate(2, $mainStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SwipeMenu', slots, []);

    	let startX = null,
    		deathZone = window.screen.width * ($settingsStore.deathZoneSwipe / 100);

    	function initMenu() {
    		document.addEventListener("touchstart", touchStart);
    		document.addEventListener("touchmove", touchMove);
    	}

    	function touchStart(e) {
    		startX = e.touches[0].clientX;
    	}

    	function touchMove(e) {
    		if (e.touches[0].target.nodeName === "INPUT") {
    			return;
    		}

    		let movedX = e.touches[0].clientX;

    		if (movedX - startX > deathZone) {
    			settingsStore.changeViewFlag(true);
    		}

    		if (movedX - startX < deathZone) {
    			settingsStore.changeViewFlag(false);
    		}
    	}

    	onMount(() => {
    		initMenu();
    	});

    	onDestroy(() => {
    		document.removeEventListener("touchstart");
    		document.removeEventListener("touchmove");
    	});

    	let animationFlag = false;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SwipeMenu> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => navigateTo("/");
    	const click_handler_1 = () => navigateTo("home");
    	const click_handler_2 = () => navigateTo("notes");
    	const click_handler_3 = () => navigateTo("history");
    	const click_handler_4 = () => navigateTo("settings");
    	const click_handler_5 = () => navigateTo("help");
    	const click_handler_6 = () => navigateTo("rules");
    	const click_handler_7 = () => settingsStore.changeViewFlag(false);
    	const func = () => settingsStore.changeViewFlag(false);

    	$$self.$capture_state = () => ({
    		onDestroy,
    		onMount,
    		navigateTo,
    		routeIsActive,
    		Modal,
    		Transition,
    		settingsStore,
    		mainStore,
    		startX,
    		deathZone,
    		initMenu,
    		touchStart,
    		touchMove,
    		animationFlag,
    		$settingsStore,
    		$mainStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('startX' in $$props) startX = $$props.startX;
    		if ('deathZone' in $$props) deathZone = $$props.deathZone;
    		if ('animationFlag' in $$props) $$invalidate(1, animationFlag = $$props.animationFlag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$settingsStore*/ 1) {
    			{
    				deathZone = window.screen.width * ($settingsStore.deathZoneSwipe / 100);
    				document.removeEventListener("touchstart", touchStart, false);
    				document.removeEventListener("touchmove", touchStart, false);
    				initMenu();
    			}
    		}

    		if ($$self.$$.dirty & /*$settingsStore*/ 1) {
    			{
    				if ($settingsStore.menuViewFlag) {
    					window.setTimeout(
    						() => {
    							$$invalidate(1, animationFlag = true);
    						},
    						15
    					);
    				} else {
    					$$invalidate(1, animationFlag = false);
    				}
    			}
    		}
    	};

    	return [
    		$settingsStore,
    		animationFlag,
    		$mainStore,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5,
    		click_handler_6,
    		click_handler_7,
    		func
    	];
    }

    class SwipeMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SwipeMenu",
    			options,
    			id: create_fragment$z.name
    		});
    	}
    }

    /* src\components\Layout.svelte generated by Svelte v3.48.0 */

    const file$w = "src\\components\\Layout.svelte";

    function create_fragment$y(ctx) {
    	let section;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			section = element("section");
    			if (default_slot) default_slot.c();
    			attr_dev(section, "class", "layout svelte-qy02jl");
    			attr_dev(section, "style", /*customStyles*/ ctx[0]);
    			add_location(section, file$w, 4, 0, 58);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);

    			if (default_slot) {
    				default_slot.m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*customStyles*/ 1) {
    				attr_dev(section, "style", /*customStyles*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Layout', slots, ['default']);
    	let { customStyles = "" } = $$props;
    	const writable_props = ['customStyles'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('customStyles' in $$props) $$invalidate(0, customStyles = $$props.customStyles);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ customStyles });

    	$$self.$inject_state = $$props => {
    		if ('customStyles' in $$props) $$invalidate(0, customStyles = $$props.customStyles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [customStyles, $$scope, slots];
    }

    class Layout extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$y, create_fragment$y, safe_not_equal, { customStyles: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Layout",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get customStyles() {
    		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set customStyles(value) {
    		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const colors = {
        primary: "#FF002F",
        secondary: "#3f3d5e",
        fontColor: "#eeeef5",
    };

    /* src\components\Button.svelte generated by Svelte v3.48.0 */
    const file$v = "src\\components\\Button.svelte";

    function create_fragment$x(ctx) {
    	let button;
    	let button_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "type", /*type*/ ctx[3]);
    			attr_dev(button, "style", button_style_value = "" + ((/*style*/ ctx[1] !== undefined ? /*style*/ ctx[1] : '') + " background-color:" + colors[/*color*/ ctx[2]] + ";"));
    			attr_dev(button, "class", "svelte-vrclat");
    			add_location(button, file$v, 9, 0, 174);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*clickEvent*/ ctx[0])) /*clickEvent*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*type*/ 8) {
    				attr_dev(button, "type", /*type*/ ctx[3]);
    			}

    			if (!current || dirty & /*style, color*/ 6 && button_style_value !== (button_style_value = "" + ((/*style*/ ctx[1] !== undefined ? /*style*/ ctx[1] : '') + " background-color:" + colors[/*color*/ ctx[2]] + ";"))) {
    				attr_dev(button, "style", button_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, ['default']);
    	let { clickEvent, style, color = "primary", type = "button" } = $$props;
    	const writable_props = ['clickEvent', 'style', 'color', 'type'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('clickEvent' in $$props) $$invalidate(0, clickEvent = $$props.clickEvent);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('type' in $$props) $$invalidate(3, type = $$props.type);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ clickEvent, style, color, type, colors });

    	$$self.$inject_state = $$props => {
    		if ('clickEvent' in $$props) $$invalidate(0, clickEvent = $$props.clickEvent);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('color' in $$props) $$invalidate(2, color = $$props.color);
    		if ('type' in $$props) $$invalidate(3, type = $$props.type);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [clickEvent, style, color, type, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {
    			clickEvent: 0,
    			style: 1,
    			color: 2,
    			type: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$x.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*clickEvent*/ ctx[0] === undefined && !('clickEvent' in props)) {
    			console.warn("<Button> was created without expected prop 'clickEvent'");
    		}

    		if (/*style*/ ctx[1] === undefined && !('style' in props)) {
    			console.warn("<Button> was created without expected prop 'style'");
    		}
    	}

    	get clickEvent() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set clickEvent(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\MainPage.svelte generated by Svelte v3.48.0 */
    const file$u = "src\\pages\\MainPage.svelte";

    // (12:8) <Button              style={"margin-bottom: 20px;"}              clickEvent={() => navigateTo("home")}>
    function create_default_slot_2$a(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Начнём!");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$a.name,
    		type: "slot",
    		source: "(12:8) <Button              style={\\\"margin-bottom: 20px;\\\"}              clickEvent={() => navigateTo(\\\"home\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (16:8) <Button              clickEvent={() => {                  settingsStore.changeViewFlag(!$settingsStore.menuViewFlag);              }}              color="secondary"              >
    function create_default_slot_1$d(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Меню");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$d.name,
    		type: "slot",
    		source: "(16:8) <Button              clickEvent={() => {                  settingsStore.changeViewFlag(!$settingsStore.menuViewFlag);              }}              color=\\\"secondary\\\"              >",
    		ctx
    	});

    	return block;
    }

    // (8:0) <Layout>
    function create_default_slot$j(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let span;
    	let t3;
    	let button0;
    	let t4;
    	let button1;
    	let current;

    	button0 = new Button({
    			props: {
    				style: "margin-bottom: 20px;",
    				clickEvent: /*func*/ ctx[1],
    				$$slots: { default: [create_default_slot_2$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				clickEvent: /*func_1*/ ctx[2],
    				color: "secondary",
    				$$slots: { default: [create_default_slot_1$d] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Мафия";
    			t1 = space();
    			span = element("span");
    			span.textContent = "Приложение для ведущего в карточной игре - мафия";
    			t3 = space();
    			create_component(button0.$$.fragment);
    			t4 = space();
    			create_component(button1.$$.fragment);
    			attr_dev(h1, "class", "svelte-1bvjxk7");
    			add_location(h1, file$u, 9, 8, 287);
    			attr_dev(span, "class", "svelte-1bvjxk7");
    			add_location(span, file$u, 10, 8, 311);
    			attr_dev(div, "class", "info svelte-1bvjxk7");
    			add_location(div, file$u, 8, 4, 259);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, span);
    			append_dev(div, t3);
    			mount_component(button0, div, null);
    			append_dev(div, t4);
    			mount_component(button1, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*$settingsStore*/ 1) button1_changes.clickEvent = /*func_1*/ ctx[2];

    			if (dirty & /*$$scope*/ 8) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$j.name,
    		type: "slot",
    		source: "(8:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$w(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$j] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 9) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MainPage', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MainPage> was created with unknown prop '${key}'`);
    	});

    	const func = () => navigateTo("home");

    	const func_1 = () => {
    		settingsStore.changeViewFlag(!$settingsStore.menuViewFlag);
    	};

    	$$self.$capture_state = () => ({
    		navigateTo,
    		Layout,
    		Button,
    		settingsStore,
    		$settingsStore
    	});

    	return [$settingsStore, func, func_1];
    }

    class MainPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MainPage",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    /* src\pages\HomePage.svelte generated by Svelte v3.48.0 */
    const file$t = "src\\pages\\HomePage.svelte";

    // (10:8) <Button              style={"margin-bottom: 20px;"}              clickEvent={() => navigateTo("manual-distribution")}              color="secondary"              >
    function create_default_slot_3$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Ручная");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$8.name,
    		type: "slot",
    		source: "(10:8) <Button              style={\\\"margin-bottom: 20px;\\\"}              clickEvent={() => navigateTo(\\\"manual-distribution\\\")}              color=\\\"secondary\\\"              >",
    		ctx
    	});

    	return block;
    }

    // (16:8) <Button              style={"margin-bottom: 20px;"}              clickEvent={() => navigateTo("auto-distribution")}              >
    function create_default_slot_2$9(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Автоматическая");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$9.name,
    		type: "slot",
    		source: "(16:8) <Button              style={\\\"margin-bottom: 20px;\\\"}              clickEvent={() => navigateTo(\\\"auto-distribution\\\")}              >",
    		ctx
    	});

    	return block;
    }

    // (21:8) <Button              style={"margin-bottom: 20px;"}              clickEvent={() => navigateTo("presets")}              color="secondary"              >
    function create_default_slot_1$c(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Пресеты");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$c.name,
    		type: "slot",
    		source: "(21:8) <Button              style={\\\"margin-bottom: 20px;\\\"}              clickEvent={() => navigateTo(\\\"presets\\\")}              color=\\\"secondary\\\"              >",
    		ctx
    	});

    	return block;
    }

    // (7:0) <Layout>
    function create_default_slot$i(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let button0;
    	let t2;
    	let button1;
    	let t3;
    	let button2;
    	let current;

    	button0 = new Button({
    			props: {
    				style: "margin-bottom: 20px;",
    				clickEvent: /*func*/ ctx[0],
    				color: "secondary",
    				$$slots: { default: [create_default_slot_3$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				style: "margin-bottom: 20px;",
    				clickEvent: /*func_1*/ ctx[1],
    				$$slots: { default: [create_default_slot_2$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button({
    			props: {
    				style: "margin-bottom: 20px;",
    				clickEvent: /*func_2*/ ctx[2],
    				color: "secondary",
    				$$slots: { default: [create_default_slot_1$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Выберите тип раздачи";
    			t1 = space();
    			create_component(button0.$$.fragment);
    			t2 = space();
    			create_component(button1.$$.fragment);
    			t3 = space();
    			create_component(button2.$$.fragment);
    			attr_dev(h1, "class", "svelte-zw2zjr");
    			add_location(h1, file$t, 8, 8, 246);
    			attr_dev(div, "class", "selectTypeDistribution svelte-zw2zjr");
    			add_location(div, file$t, 7, 4, 200);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			mount_component(button0, div, null);
    			append_dev(div, t2);
    			mount_component(button1, div, null);
    			append_dev(div, t3);
    			mount_component(button2, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button0);
    			destroy_component(button1);
    			destroy_component(button2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$i.name,
    		type: "slot",
    		source: "(7:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$i] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 8) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HomePage', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HomePage> was created with unknown prop '${key}'`);
    	});

    	const func = () => navigateTo("manual-distribution");
    	const func_1 = () => navigateTo("auto-distribution");
    	const func_2 = () => navigateTo("presets");
    	$$self.$capture_state = () => ({ Layout, Button, navigateTo });
    	return [func, func_1, func_2];
    }

    class HomePage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HomePage",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    /* src\pages\404.svelte generated by Svelte v3.48.0 */
    const file$s = "src\\pages\\404.svelte";

    // (22:4) <Button clickEvent={() => navigateTo("/")}>
    function create_default_slot_1$b(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("На главную");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$b.name,
    		type: "slot",
    		source: "(22:4) <Button clickEvent={() => navigateTo(\\\"/\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (16:0) <Layout customStyles="flex-direction: column; text-align: center;">
    function create_default_slot$h(ctx) {
    	let h1;
    	let t1;
    	let p;
    	let t3;
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				clickEvent: /*func*/ ctx[0],
    				$$slots: { default: [create_default_slot_1$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "УПС";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Вы попали на страницу, функции для которой ещё в разработке. Пожалуйста\r\n        вернитесь на главную.";
    			t3 = space();
    			create_component(button.$$.fragment);
    			attr_dev(h1, "class", "svelte-9eqlt6");
    			add_location(h1, file$s, 16, 4, 532);
    			attr_dev(p, "class", "svelte-9eqlt6");
    			add_location(p, file$s, 17, 4, 550);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(button, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t3);
    			destroy_component(button, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$h.name,
    		type: "slot",
    		source: "(16:0) <Layout customStyles=\\\"flex-direction: column; text-align: center;\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$u(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				customStyles: "flex-direction: column; text-align: center;",
    				$$slots: { default: [create_default_slot$h] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 4) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props, $$invalidate) {
    	let $mainStore;
    	validate_store(mainStore, 'mainStore');
    	component_subscribe($$self, mainStore, $$value => $$invalidate(1, $mainStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('_404', slots, []);

    	onMount(() => {
    		if ($mainStore.applicationLoaded === false) {
    			navigateTo("/");
    			mainStore.applicationLoaded(true);
    		}
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<_404> was created with unknown prop '${key}'`);
    	});

    	const func = () => navigateTo("/");

    	$$self.$capture_state = () => ({
    		onMount,
    		navigateTo,
    		Button,
    		Layout,
    		mainStore,
    		$mainStore
    	});

    	return [func];
    }

    class _404 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "_404",
    			options,
    			id: create_fragment$u.name
    		});
    	}
    }

    /* src\components\Input.svelte generated by Svelte v3.48.0 */

    const file$r = "src\\components\\Input.svelte";

    function create_fragment$t(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", /*type*/ ctx[4]);
    			attr_dev(input, "placeholder", /*placeholder*/ ctx[5]);
    			input.value = /*value*/ ctx[1];
    			attr_dev(input, "min", /*min*/ ctx[6]);
    			attr_dev(input, "max", /*max*/ ctx[7]);
    			attr_dev(input, "id", /*id*/ ctx[3]);
    			attr_dev(input, "style", /*style*/ ctx[0]);
    			attr_dev(input, "class", "svelte-1fnif30");
    			add_location(input, file$r, 11, 0, 183);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);

    			if (!mounted) {
    				dispose = listen_dev(
    					input,
    					"input",
    					function () {
    						if (is_function(/*onChange*/ ctx[2])) /*onChange*/ ctx[2].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*type*/ 16) {
    				attr_dev(input, "type", /*type*/ ctx[4]);
    			}

    			if (dirty & /*placeholder*/ 32) {
    				attr_dev(input, "placeholder", /*placeholder*/ ctx[5]);
    			}

    			if (dirty & /*value*/ 2 && input.value !== /*value*/ ctx[1]) {
    				prop_dev(input, "value", /*value*/ ctx[1]);
    			}

    			if (dirty & /*min*/ 64) {
    				attr_dev(input, "min", /*min*/ ctx[6]);
    			}

    			if (dirty & /*max*/ 128) {
    				attr_dev(input, "max", /*max*/ ctx[7]);
    			}

    			if (dirty & /*id*/ 8) {
    				attr_dev(input, "id", /*id*/ ctx[3]);
    			}

    			if (dirty & /*style*/ 1) {
    				attr_dev(input, "style", /*style*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Input', slots, []);
    	let { style, value, onChange, id, type = "text", placeholder = "", min = 1, max = 100 } = $$props;
    	const writable_props = ['style', 'value', 'onChange', 'id', 'type', 'placeholder', 'min', 'max'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Input> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('onChange' in $$props) $$invalidate(2, onChange = $$props.onChange);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(5, placeholder = $$props.placeholder);
    		if ('min' in $$props) $$invalidate(6, min = $$props.min);
    		if ('max' in $$props) $$invalidate(7, max = $$props.max);
    	};

    	$$self.$capture_state = () => ({
    		style,
    		value,
    		onChange,
    		id,
    		type,
    		placeholder,
    		min,
    		max
    	});

    	$$self.$inject_state = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('onChange' in $$props) $$invalidate(2, onChange = $$props.onChange);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(5, placeholder = $$props.placeholder);
    		if ('min' in $$props) $$invalidate(6, min = $$props.min);
    		if ('max' in $$props) $$invalidate(7, max = $$props.max);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [style, value, onChange, id, type, placeholder, min, max];
    }

    class Input extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {
    			style: 0,
    			value: 1,
    			onChange: 2,
    			id: 3,
    			type: 4,
    			placeholder: 5,
    			min: 6,
    			max: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Input",
    			options,
    			id: create_fragment$t.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*style*/ ctx[0] === undefined && !('style' in props)) {
    			console.warn("<Input> was created without expected prop 'style'");
    		}

    		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
    			console.warn("<Input> was created without expected prop 'value'");
    		}

    		if (/*onChange*/ ctx[2] === undefined && !('onChange' in props)) {
    			console.warn("<Input> was created without expected prop 'onChange'");
    		}

    		if (/*id*/ ctx[3] === undefined && !('id' in props)) {
    			console.warn("<Input> was created without expected prop 'id'");
    		}
    	}

    	get style() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onChange() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onChange(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\ModalContainer.svelte generated by Svelte v3.48.0 */

    const file$q = "src\\components\\ModalContainer.svelte";

    function create_fragment$s(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "modalContainer svelte-1ujy7v5");

    			attr_dev(div, "style", div_style_value = /*customStyle*/ ctx[0] !== null
    			? /*customStyle*/ ctx[0]
    			: "");

    			add_location(div, file$q, 5, 0, 91);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					div,
    					"click",
    					function () {
    						if (is_function(/*clickEvent*/ ctx[1])) /*clickEvent*/ ctx[1].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*customStyle*/ 1 && div_style_value !== (div_style_value = /*customStyle*/ ctx[0] !== null
    			? /*customStyle*/ ctx[0]
    			: "")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ModalContainer', slots, ['default']);

    	let { customStyle = null, clickEvent = () => {
    		
    	} } = $$props;

    	const writable_props = ['customStyle', 'clickEvent'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ModalContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('customStyle' in $$props) $$invalidate(0, customStyle = $$props.customStyle);
    		if ('clickEvent' in $$props) $$invalidate(1, clickEvent = $$props.clickEvent);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ customStyle, clickEvent });

    	$$self.$inject_state = $$props => {
    		if ('customStyle' in $$props) $$invalidate(0, customStyle = $$props.customStyle);
    		if ('clickEvent' in $$props) $$invalidate(1, clickEvent = $$props.clickEvent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [customStyle, clickEvent, $$scope, slots];
    }

    class ModalContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$s, create_fragment$s, safe_not_equal, { customStyle: 0, clickEvent: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ModalContainer",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get customStyle() {
    		throw new Error("<ModalContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set customStyle(value) {
    		throw new Error("<ModalContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get clickEvent() {
    		throw new Error("<ModalContainer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set clickEvent(value) {
    		throw new Error("<ModalContainer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\modals\TextInputModal.svelte generated by Svelte v3.48.0 */
    const file$p = "src\\components\\modals\\TextInputModal.svelte";

    // (31:12) <Button clickEvent={confirmBtnEvent} style="font-size: 1rem;"                  >
    function create_default_slot_3$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*confirmBtnText*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*confirmBtnText*/ 16) set_data_dev(t, /*confirmBtnText*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$7.name,
    		type: "slot",
    		source: "(31:12) <Button clickEvent={confirmBtnEvent} style=\\\"font-size: 1rem;\\\"                  >",
    		ctx
    	});

    	return block;
    }

    // (34:12) <Button                  clickEvent={backBtnEvent}                  style="font-size: 1rem;"                  color="secondary">
    function create_default_slot_2$8(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*backBtnText*/ ctx[6]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*backBtnText*/ 64) set_data_dev(t, /*backBtnText*/ ctx[6]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$8.name,
    		type: "slot",
    		source: "(34:12) <Button                  clickEvent={backBtnEvent}                  style=\\\"font-size: 1rem;\\\"                  color=\\\"secondary\\\">",
    		ctx
    	});

    	return block;
    }

    // (21:4) <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
    function create_default_slot_1$a(ctx) {
    	let div;
    	let label;
    	let t0;
    	let t1;
    	let input;
    	let t2;
    	let button0;
    	let t3;
    	let button1;
    	let t4;
    	let span;
    	let t5;
    	let span_class_value;
    	let current;

    	input = new Input({
    			props: {
    				id: "playersCount",
    				type: /*inputType*/ ctx[10],
    				value: /*inputValue*/ ctx[2],
    				onChange: /*changeInputEvent*/ ctx[3],
    				style: "margin-bottom: 15px;"
    			},
    			$$inline: true
    		});

    	button0 = new Button({
    			props: {
    				clickEvent: /*confirmBtnEvent*/ ctx[5],
    				style: "font-size: 1rem;",
    				$$slots: { default: [create_default_slot_3$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				clickEvent: /*backBtnEvent*/ ctx[7],
    				style: "font-size: 1rem;",
    				color: "secondary",
    				$$slots: { default: [create_default_slot_2$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			label = element("label");
    			t0 = text(/*labelName*/ ctx[1]);
    			t1 = space();
    			create_component(input.$$.fragment);
    			t2 = space();
    			create_component(button0.$$.fragment);
    			t3 = space();
    			create_component(button1.$$.fragment);
    			t4 = space();
    			span = element("span");
    			t5 = text(/*errorText*/ ctx[9]);
    			attr_dev(label, "for", "playersCount");
    			add_location(label, file$p, 22, 12, 700);
    			attr_dev(div, "class", "modalArea buttons");
    			add_location(div, file$p, 21, 8, 655);
    			attr_dev(span, "class", span_class_value = "modalError " + (/*errorFlag*/ ctx[8] && 'modalShow'));
    			add_location(span, file$p, 39, 8, 1314);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(label, t0);
    			append_dev(div, t1);
    			mount_component(input, div, null);
    			append_dev(div, t2);
    			mount_component(button0, div, null);
    			append_dev(div, t3);
    			mount_component(button1, div, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, span, anchor);
    			append_dev(span, t5);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*labelName*/ 2) set_data_dev(t0, /*labelName*/ ctx[1]);
    			const input_changes = {};
    			if (dirty & /*inputType*/ 1024) input_changes.type = /*inputType*/ ctx[10];
    			if (dirty & /*inputValue*/ 4) input_changes.value = /*inputValue*/ ctx[2];
    			if (dirty & /*changeInputEvent*/ 8) input_changes.onChange = /*changeInputEvent*/ ctx[3];
    			input.$set(input_changes);
    			const button0_changes = {};
    			if (dirty & /*confirmBtnEvent*/ 32) button0_changes.clickEvent = /*confirmBtnEvent*/ ctx[5];

    			if (dirty & /*$$scope, confirmBtnText*/ 2064) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*backBtnEvent*/ 128) button1_changes.clickEvent = /*backBtnEvent*/ ctx[7];

    			if (dirty & /*$$scope, backBtnText*/ 2112) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			if (!current || dirty & /*errorText*/ 512) set_data_dev(t5, /*errorText*/ ctx[9]);

    			if (!current || dirty & /*errorFlag*/ 256 && span_class_value !== (span_class_value = "modalError " + (/*errorFlag*/ ctx[8] && 'modalShow'))) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(input.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(input.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(input);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$a.name,
    		type: "slot",
    		source: "(21:4) <ModalContainer customStyle=\\\"padding: 5px 30px 25px 30px;\\\">",
    		ctx
    	});

    	return block;
    }

    // (20:0) <Modal {showFlag}>
    function create_default_slot$g(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				customStyle: "padding: 5px 30px 25px 30px;",
    				$$slots: { default: [create_default_slot_1$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, errorFlag, errorText, backBtnEvent, backBtnText, confirmBtnEvent, confirmBtnText, inputType, inputValue, changeInputEvent, labelName*/ 4094) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$g.name,
    		type: "slot",
    		source: "(20:0) <Modal {showFlag}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let modal;
    	let current;

    	modal = new Modal({
    			props: {
    				showFlag: /*showFlag*/ ctx[0],
    				$$slots: { default: [create_default_slot$g] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const modal_changes = {};
    			if (dirty & /*showFlag*/ 1) modal_changes.showFlag = /*showFlag*/ ctx[0];

    			if (dirty & /*$$scope, errorFlag, errorText, backBtnEvent, backBtnText, confirmBtnEvent, confirmBtnText, inputType, inputValue, changeInputEvent, labelName*/ 4094) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TextInputModal', slots, []);

    	let { showFlag = false, labelName = "", inputValue = "", changeInputEvent = () => {
    		
    	}, confirmBtnText = "Подтвердить", confirmBtnEvent = () => {
    		
    	}, backBtnText = "Назад", backBtnEvent = () => {
    		
    	}, errorFlag = false, errorText = "", inputType = "text" } = $$props;

    	const writable_props = [
    		'showFlag',
    		'labelName',
    		'inputValue',
    		'changeInputEvent',
    		'confirmBtnText',
    		'confirmBtnEvent',
    		'backBtnText',
    		'backBtnEvent',
    		'errorFlag',
    		'errorText',
    		'inputType'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TextInputModal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('showFlag' in $$props) $$invalidate(0, showFlag = $$props.showFlag);
    		if ('labelName' in $$props) $$invalidate(1, labelName = $$props.labelName);
    		if ('inputValue' in $$props) $$invalidate(2, inputValue = $$props.inputValue);
    		if ('changeInputEvent' in $$props) $$invalidate(3, changeInputEvent = $$props.changeInputEvent);
    		if ('confirmBtnText' in $$props) $$invalidate(4, confirmBtnText = $$props.confirmBtnText);
    		if ('confirmBtnEvent' in $$props) $$invalidate(5, confirmBtnEvent = $$props.confirmBtnEvent);
    		if ('backBtnText' in $$props) $$invalidate(6, backBtnText = $$props.backBtnText);
    		if ('backBtnEvent' in $$props) $$invalidate(7, backBtnEvent = $$props.backBtnEvent);
    		if ('errorFlag' in $$props) $$invalidate(8, errorFlag = $$props.errorFlag);
    		if ('errorText' in $$props) $$invalidate(9, errorText = $$props.errorText);
    		if ('inputType' in $$props) $$invalidate(10, inputType = $$props.inputType);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Input,
    		Modal,
    		ModalContainer,
    		showFlag,
    		labelName,
    		inputValue,
    		changeInputEvent,
    		confirmBtnText,
    		confirmBtnEvent,
    		backBtnText,
    		backBtnEvent,
    		errorFlag,
    		errorText,
    		inputType
    	});

    	$$self.$inject_state = $$props => {
    		if ('showFlag' in $$props) $$invalidate(0, showFlag = $$props.showFlag);
    		if ('labelName' in $$props) $$invalidate(1, labelName = $$props.labelName);
    		if ('inputValue' in $$props) $$invalidate(2, inputValue = $$props.inputValue);
    		if ('changeInputEvent' in $$props) $$invalidate(3, changeInputEvent = $$props.changeInputEvent);
    		if ('confirmBtnText' in $$props) $$invalidate(4, confirmBtnText = $$props.confirmBtnText);
    		if ('confirmBtnEvent' in $$props) $$invalidate(5, confirmBtnEvent = $$props.confirmBtnEvent);
    		if ('backBtnText' in $$props) $$invalidate(6, backBtnText = $$props.backBtnText);
    		if ('backBtnEvent' in $$props) $$invalidate(7, backBtnEvent = $$props.backBtnEvent);
    		if ('errorFlag' in $$props) $$invalidate(8, errorFlag = $$props.errorFlag);
    		if ('errorText' in $$props) $$invalidate(9, errorText = $$props.errorText);
    		if ('inputType' in $$props) $$invalidate(10, inputType = $$props.inputType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showFlag,
    		labelName,
    		inputValue,
    		changeInputEvent,
    		confirmBtnText,
    		confirmBtnEvent,
    		backBtnText,
    		backBtnEvent,
    		errorFlag,
    		errorText,
    		inputType
    	];
    }

    class TextInputModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {
    			showFlag: 0,
    			labelName: 1,
    			inputValue: 2,
    			changeInputEvent: 3,
    			confirmBtnText: 4,
    			confirmBtnEvent: 5,
    			backBtnText: 6,
    			backBtnEvent: 7,
    			errorFlag: 8,
    			errorText: 9,
    			inputType: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextInputModal",
    			options,
    			id: create_fragment$r.name
    		});
    	}

    	get showFlag() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showFlag(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get labelName() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set labelName(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputValue() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputValue(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get changeInputEvent() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set changeInputEvent(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get confirmBtnText() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set confirmBtnText(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get confirmBtnEvent() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set confirmBtnEvent(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backBtnText() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backBtnText(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backBtnEvent() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backBtnEvent(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get errorFlag() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set errorFlag(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get errorText() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set errorText(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get inputType() {
    		throw new Error("<TextInputModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set inputType(value) {
    		throw new Error("<TextInputModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const cards = {
        mafia: {
            icon: "assets/mafia2.png",
            name: "Мафия",
            description:
                "Просыпается каждую ночь и убивает одного из игроков. Цель: убить всех мирных игроков.",
        },
        civilian: {
            icon: "assets/civilian.png",
            name: "Мирный житель",
            description:
                "Самая частая роль для игроков. Не просыпается ночью. Цель: исключить голосованием всех мафиози.",
        },
        doctor: {
            icon: "assets/doctor.png",
            name: "Доктор",
            description:
                "Просыпается каждую ночь и лечит одного из игроков. Если мафиози и доктор выбрали одного и того же игрока, он выживает.",
        },
        commissioner: {
            icon: "assets/policeman.png",
            name: "Коммиссар",
            description:
                "Просыпается каждую ночь и проверяет одного из игроков, является ли игрок мафией. Цель: исключить голосованием всех мафиози.",
        },
        exmafia: {
            icon: "assets/bandit.png",
            name: "Дон мафии",
            description:
                "Просыпается каждую ночь и проверяет одного из игроков, является ли игрок комиссаром. Цель: убить всех мирных игроков.",
        },
        maniac: {
            icon: "assets/maniac.png",
            name: "Маньяк",
            description:
                "Просыпается каждую ночь (не одновременно с мафией) и убивает одного из игроков. Цель: остаться единственным выжившим.",
        },
        prostitute: {
            icon: "assets/woman.png",
            name: "Путана",
            description:
                "Просыпается каждую ночь и указывает на игрока, которого следующим днём нельзя будет исключить голосованием.",
        },
        boss: {
            icon: "assets/boss.png",
            name: "Босс",
            description:
                "Главный среди мафиози. Просыпается каждую ночь и убивает одного из игроков (если мафиози выбрали другого игрока, их выбор не учитывается).",
        },
        yakuza: {
            icon: "assets/tattoo.png",
            name: "Якудза",
            description:
                "Задача: истребить мирных жителей и мафию. Просыпается каждую ночь. В первую ночь договаривается об убийствах, а начиная со второй стреляет",
        },
        thief: {
            icon: "assets/thief.png",
            name: "Вор",
            description:
                "Играет за мирных жителей. Просыпается первым и лишает спецдействия одного из игроков. Таким образом игрок не может совершить действие ночью.",
        },
    };

    const unknownCardIcon = "assets/anonymity.png";

    let savedIcons = {};

    function reloadSavedIcons() {
        Object.keys(allCardsList()).forEach((key) => {
            getValue(
                key,
                "roles",
                (icon) => {
                    if (icon !== undefined) {
                        savedIcons[key] = { icon: icon.value };
                    }
                },
                (e) => {
                    console.error(e);
                }
            );
        });
    }

    function allCardsList() {
        let allCards = Object.assign(
            {},
            cards,
            JSON.parse(localStorage.getItem("customRoles"))
        );
        Object.keys(savedIcons).forEach((key) => {
            allCards[key].icon = savedIcons[key]?.icon;
        });
        return allCards;
    }

    //Инициализация store с дефолными и пользовательскими картами
    function initStore() {
        let initialStore = {};
        Object.keys(allCardsList()).forEach((card) => {
            initialStore[card] = 0;
        });

        return initialStore;
    }

    function createStore$4() {
        const { update, subscribe } = writable({
            cards: initStore(),
        });

        return {
            update,
            subscribe,
            //Переинициализация списка карт в store (нужно, когда пользователь добавил новую роль для обновления state)
            reinit: () => {
                update((prev) => {
                    return {
                        ...prev,
                        cards: initStore(),
                    };
                });
            },
            //onChange на Inputы, где пользователь выбирает количество карт конкретной роли
            onCardCountChanged: (cardName, event) => {
                let prevStore = get_store_value(selectedCardsStore).cards;
                if (
                    event.target.value.toString().length > 0 &&
                    Number(event.target.value) > 0 &&
                    Number(event.target.value) <= 100
                ) {
                    prevStore[cardName] = Number(event.target.value);
                } else {
                    prevStore[cardName] = 0;
                }
                update((prev) => {
                    return {
                        ...prev,
                        cards: prevStore,
                    };
                });
            },
            //Добавляет единичку к Input с картой роли. Например количество мафий: 2(1 была + 1 добавится сейчас)
            incrementCardCount: (cardName) => {
                let prevStore = get_store_value(selectedCardsStore).cards;
                prevStore[cardName] = Number(prevStore[cardName]) + 1;
                update((prev) => {
                    return {
                        ...prev,
                        cards: prevStore,
                    };
                });
            },
            //Удаляет единичку к Input с картой роли. Например количество мафий: 2(1 была - 1 удалится сейчас)
            decrementCardCount: (cardName) => {
                let prevStore = get_store_value(selectedCardsStore).cards;
                if (prevStore[cardName] > 0) {
                    prevStore[cardName] = Number(prevStore[cardName]) - 1;
                    update((prev) => {
                        return {
                            ...prev,
                            cards: prevStore,
                        };
                    });
                }
            },
            //Предзагрузить массив карт для показа на экране
            preloadCardsInViewScreen: () => {
                const selectedCards = get_store_value(selectedCardsStore).cards;
                let viewedCards = [];
                const keys = Object.keys(selectedCards);
                for (let i = 0; i < keys.length; i++) {
                    for (let j = 0; j < selectedCards[keys[i]]; j++) {
                        viewedCards.push(keys[i]);
                    }
                }
                return viewedCards;
            },
            //Загрузить кастомный пак карт в хранилище (нужно например для загрузки из пресета). Фомрмат объекта: {mafia: 2, doctor: 1, ...}
            loadCustomCardsList: (customCardsPack) => {
                selectedCardsStore.reinit();
                update((prev) => {
                    return {
                        ...prev,
                        cards: { ...prev.cards, ...customCardsPack },
                    };
                });
            },
        };
    }

    const selectedCardsStore = createStore$4();

    function createStore$3() {
        const { set, subscribe, update } = writable({
            playersCount: 6,
        });

        return {
            subscribe,
            update,
            //Подсчёт колоды исходя из количества игроков
            calculateDistribution: () => {
                let playersCount = get_store_value(autoDistribStore).playersCount;
                let mafiaCount = 0;
                //Подсчёт всех "мафий"
                for (let i = 0; i <= Math.floor(playersCount / 3.5); i++) {
                    selectedCardsStore.incrementCardCount("mafia");
                    playersCount--;
                    mafiaCount++;
                }
                if (mafiaCount.length >= 3) {
                    for (let i = 0; i < Math.floor(mafiaCount.length / 3); i++) {
                        mafiaCount--;
                        selectedCardsStore.decrementCardCount("mafia");
                        selectedCardsStore.incrementCardCount("exmafia");
                    }
                }
                //Добавление "комиссара" в раздачу
                for (let i = 0; i < Math.floor(playersCount / 4); i++) {
                    selectedCardsStore.incrementCardCount("commissioner");
                    playersCount--;
                }
                //Проверка на то, хватает ли игроков для добавления роли "Доктор"
                for (let i = 0; i < Math.floor(playersCount / 4); i++) {
                    selectedCardsStore.incrementCardCount("doctor");
                    playersCount--;
                }
                //Дозагрузка всех оставшихся карт как "мирные жители"
                for (let i = 0; i < playersCount; i++) {
                    selectedCardsStore.incrementCardCount("civilian");
                }
            },
            //onChange на Input количества игроков автораздатчика
            onChangePlayersCount(e) {
                update((prev) => {
                    return {
                        ...prev,
                        playersCount: e.target.value,
                    };
                });
            },
            //Обнуление store
            reset: () => {
                set({ playersCount: 6 });
            },
        };
    }

    const autoDistribStore = createStore$3();

    /* src\components\Container.svelte generated by Svelte v3.48.0 */

    const file$o = "src\\components\\Container.svelte";

    function create_fragment$q(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "container");
    			add_location(div, file$o, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Container', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Container> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Container extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Container",
    			options,
    			id: create_fragment$q.name
    		});
    	}
    }

    /* src\components\Table.svelte generated by Svelte v3.48.0 */

    const file$n = "src\\components\\Table.svelte";

    function create_fragment$p(ctx) {
    	let table;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			table = element("table");
    			if (default_slot) default_slot.c();
    			attr_dev(table, "class", "table");
    			attr_dev(table, "style", /*style*/ ctx[0]);
    			add_location(table, file$n, 4, 0, 51);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);

    			if (default_slot) {
    				default_slot.m(table, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*style*/ 1) {
    				attr_dev(table, "style", /*style*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, ['default']);
    	let { style = "" } = $$props;
    	const writable_props = ['style'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ style });

    	$$self.$inject_state = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [style, $$scope, slots];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { style: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get style() {
    		throw new Error("<Table>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Table>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\DistributionPreview.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1$3 } = globals;
    const file$m = "src\\pages\\DistributionPreview.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i][0];
    	child_ctx[5] = list[i][1];
    	return child_ctx;
    }

    // (30:20) {#if value > 0}
    function create_if_block$7(ctx) {
    	let tr;
    	let td0;
    	let t0_value = (allCardsList()[/*key*/ ctx[4]]?.name || "Неизвестная роль") + "";
    	let t0;
    	let td1;
    	let t1_value = /*value*/ ctx[5] + "";
    	let t1;

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			td1 = element("td");
    			t1 = text(t1_value);
    			add_location(td0, file$m, 31, 29, 1156);
    			attr_dev(td1, "align", "right");
    			add_location(td1, file$m, 34, 29, 1315);
    			add_location(tr, file$m, 30, 24, 1122);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, td1);
    			append_dev(td1, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$selectedCardsStore*/ 1 && t0_value !== (t0_value = (allCardsList()[/*key*/ ctx[4]]?.name || "Неизвестная роль") + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*$selectedCardsStore*/ 1 && t1_value !== (t1_value = /*value*/ ctx[5] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(30:20) {#if value > 0}",
    		ctx
    	});

    	return block;
    }

    // (29:16) {#each Object.entries($selectedCardsStore.cards) as [key, value]}
    function create_each_block$4(ctx) {
    	let if_block_anchor;
    	let if_block = /*value*/ ctx[5] > 0 && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*value*/ ctx[5] > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(29:16) {#each Object.entries($selectedCardsStore.cards) as [key, value]}",
    		ctx
    	});

    	return block;
    }

    // (24:12) <Table>
    function create_default_slot_5$2(ctx) {
    	let thead;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let each_1_anchor;
    	let each_value = Object.entries(/*$selectedCardsStore*/ ctx[0].cards);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			th0 = element("th");
    			th0.textContent = "Название карты";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Количество";
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(th0, "align", "left");
    			add_location(th0, file$m, 25, 20, 859);
    			attr_dev(th1, "align", "right");
    			add_location(th1, file$m, 26, 20, 917);
    			add_location(thead, file$m, 24, 16, 830);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, th0);
    			append_dev(thead, t1);
    			append_dev(thead, th1);
    			insert_dev(target, t3, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Object, $selectedCardsStore, allCardsList*/ 1) {
    				each_value = Object.entries(/*$selectedCardsStore*/ ctx[0].cards);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(24:12) <Table>",
    		ctx
    	});

    	return block;
    }

    // (43:12) <Button                  clickEvent={() => navigateTo("manual-distribution")}                  style="font-size: 1rem;"                  color="secondary">
    function create_default_slot_4$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Изменить раздачу");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$4.name,
    		type: "slot",
    		source: "(43:12) <Button                  clickEvent={() => navigateTo(\\\"manual-distribution\\\")}                  style=\\\"font-size: 1rem;\\\"                  color=\\\"secondary\\\">",
    		ctx
    	});

    	return block;
    }

    // (50:12) <Button clickEvent={onDistributionCards} style="font-size: 1rem;"                  >
    function create_default_slot_3$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Раздать");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$6.name,
    		type: "slot",
    		source: "(50:12) <Button clickEvent={onDistributionCards} style=\\\"font-size: 1rem;\\\"                  >",
    		ctx
    	});

    	return block;
    }

    // (53:12) <Button                  style="font-size: 1rem;"                  color="secondary"                  clickEvent={() => navigateTo("/home")}>
    function create_default_slot_2$7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Назад");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$7.name,
    		type: "slot",
    		source: "(53:12) <Button                  style=\\\"font-size: 1rem;\\\"                  color=\\\"secondary\\\"                  clickEvent={() => navigateTo(\\\"/home\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (18:4) <Container>
    function create_default_slot_1$9(ctx) {
    	let div0;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div1;
    	let table;
    	let t3;
    	let div2;
    	let button0;
    	let t4;
    	let div3;
    	let button1;
    	let t5;
    	let button2;
    	let current;

    	table = new Table({
    			props: {
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0 = new Button({
    			props: {
    				clickEvent: /*func*/ ctx[2],
    				style: "font-size: 1rem;",
    				color: "secondary",
    				$$slots: { default: [create_default_slot_4$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				clickEvent: /*onDistributionCards*/ ctx[1],
    				style: "font-size: 1rem;",
    				$$slots: { default: [create_default_slot_3$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button({
    			props: {
    				style: "font-size: 1rem;",
    				color: "secondary",
    				clickEvent: /*func_1*/ ctx[3],
    				$$slots: { default: [create_default_slot_2$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Ваша колода";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div1 = element("div");
    			create_component(table.$$.fragment);
    			t3 = space();
    			div2 = element("div");
    			create_component(button0.$$.fragment);
    			t4 = space();
    			div3 = element("div");
    			create_component(button1.$$.fragment);
    			t5 = space();
    			create_component(button2.$$.fragment);
    			add_location(h1, file$m, 19, 12, 706);
    			add_location(hr, file$m, 20, 12, 740);
    			add_location(div0, file$m, 18, 8, 687);
    			attr_dev(div1, "class", "table svelte-1ah5qxi");
    			add_location(div1, file$m, 22, 8, 772);
    			attr_dev(div2, "class", "buttons customButtons svelte-1ah5qxi");
    			add_location(div2, file$m, 41, 8, 1478);
    			attr_dev(div3, "class", "buttons svelte-1ah5qxi");
    			add_location(div3, file$m, 48, 8, 1747);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, hr);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(table, div1, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(button0, div2, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div3, anchor);
    			mount_component(button1, div3, null);
    			append_dev(div3, t5);
    			mount_component(button2, div3, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope, $selectedCardsStore*/ 257) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			destroy_component(table);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			destroy_component(button0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div3);
    			destroy_component(button1);
    			destroy_component(button2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$9.name,
    		type: "slot",
    		source: "(18:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (17:0) <Layout>
    function create_default_slot$f(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_1$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope, $selectedCardsStore*/ 257) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$f.name,
    		type: "slot",
    		source: "(17:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$f] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, $selectedCardsStore*/ 257) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let $selectedCardsStore;
    	validate_store(selectedCardsStore, 'selectedCardsStore');
    	component_subscribe($$self, selectedCardsStore, $$value => $$invalidate(0, $selectedCardsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DistributionPreview', slots, []);

    	function onDistributionCards() {
    		mainStore.shuffleCards(selectedCardsStore.preloadCardsInViewScreen());
    		navigateTo("show-distribution");
    	}

    	const writable_props = [];

    	Object_1$3.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DistributionPreview> was created with unknown prop '${key}'`);
    	});

    	const func = () => navigateTo("manual-distribution");
    	const func_1 = () => navigateTo("/home");

    	$$self.$capture_state = () => ({
    		navigateTo,
    		Button,
    		Container,
    		Layout,
    		Table,
    		allCardsList,
    		mainStore,
    		selectedCardsStore,
    		onDistributionCards,
    		$selectedCardsStore
    	});

    	return [$selectedCardsStore, onDistributionCards, func, func_1];
    }

    class DistributionPreview extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DistributionPreview",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    /* src\pages\AutoDistribution.svelte generated by Svelte v3.48.0 */

    function create_fragment$n(ctx) {
    	let textinputmodal;
    	let t;
    	let distributionpreview;
    	let current;
    	const textinputmodal_spread_levels = [/*modalParams*/ ctx[0]];
    	let textinputmodal_props = {};

    	for (let i = 0; i < textinputmodal_spread_levels.length; i += 1) {
    		textinputmodal_props = assign(textinputmodal_props, textinputmodal_spread_levels[i]);
    	}

    	textinputmodal = new TextInputModal({
    			props: textinputmodal_props,
    			$$inline: true
    		});

    	distributionpreview = new DistributionPreview({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(textinputmodal.$$.fragment);
    			t = space();
    			create_component(distributionpreview.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinputmodal, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(distributionpreview, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const textinputmodal_changes = (dirty & /*modalParams*/ 1)
    			? get_spread_update(textinputmodal_spread_levels, [get_spread_object(/*modalParams*/ ctx[0])])
    			: {};

    			textinputmodal.$set(textinputmodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinputmodal.$$.fragment, local);
    			transition_in(distributionpreview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinputmodal.$$.fragment, local);
    			transition_out(distributionpreview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinputmodal, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(distributionpreview, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let $autoDistribStore;
    	validate_store(autoDistribStore, 'autoDistribStore');
    	component_subscribe($$self, autoDistribStore, $$value => $$invalidate(1, $autoDistribStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AutoDistribution', slots, []);

    	let modalParams = {
    		showFlag: true,
    		labelName: "Количество игроков",
    		inputValue: $autoDistribStore.playersCount,
    		changeInputEvent: autoDistribStore.onChangePlayersCount,
    		confirmBtnText: "Сохранить",
    		confirmBtnEvent: onSavePlayers,
    		backBtnEvent: () => navigateTo("/home"),
    		errorFlag: false,
    		errorText: "Недопустимое число игроков. Введите корректное число.",
    		inputType: "number"
    	};

    	onMount(() => {
    		selectedCardsStore.reinit();
    	});

    	function onSavePlayers() {
    		if ($autoDistribStore.playersCount.toString().length > 0 && Number($autoDistribStore.playersCount) >= 1) {
    			$$invalidate(0, modalParams.errorFlag = false, modalParams);
    			$$invalidate(0, modalParams.showFlag = false, modalParams);
    			autoDistribStore.calculateDistribution();
    		} else {
    			$$invalidate(0, modalParams.errorFlag = true, modalParams);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AutoDistribution> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		onMount,
    		navigateTo,
    		TextInputModal,
    		autoDistribStore,
    		selectedCardsStore,
    		DistributionPreview,
    		modalParams,
    		onSavePlayers,
    		$autoDistribStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('modalParams' in $$props) $$invalidate(0, modalParams = $$props.modalParams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [modalParams];
    }

    class AutoDistribution extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AutoDistribution",
    			options,
    			id: create_fragment$n.name
    		});
    	}
    }

    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */
    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]';

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeKeys = overArg(Object.keys, Object);

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      // Safari 9 makes `arguments.length` enumerable in strict mode.
      var result = (isArray(value) || isArguments(value))
        ? baseTimes(value.length, String)
        : [];

      var length = result.length,
          skipIndexes = !!length;

      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) &&
            !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * The base implementation of `_.forOwn` without support for iteratee shorthands.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.invert` and `_.invertBy` which inverts
     * `object` with values transformed by `iteratee` and set by `setter`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} setter The function to set `accumulator` values.
     * @param {Function} iteratee The iteratee to transform values.
     * @param {Object} accumulator The initial inverted object.
     * @returns {Function} Returns `accumulator`.
     */
    function baseInverter(object, setter, iteratee, accumulator) {
      baseForOwn(object, function(value, key, object) {
        setter(accumulator, iteratee(value), key, object);
      });
      return accumulator;
    }

    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function like `_.invertBy`.
     *
     * @private
     * @param {Function} setter The function to set accumulator values.
     * @param {Function} toIteratee The function to resolve iteratees.
     * @returns {Function} Returns the new inverter function.
     */
    function createInverter(setter, toIteratee) {
      return function(object, iteratee) {
        return baseInverter(object, setter, toIteratee(iteratee), {});
      };
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length &&
        (typeof value == 'number' || reIsUint.test(value)) &&
        (value > -1 && value % 1 == 0 && value < length);
    }

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

      return value === proto;
    }

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
      return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 8-9 which returns 'object' for typed array and other constructors.
      var tag = isObject(value) ? objectToString.call(value) : '';
      return tag == funcTag || tag == genTag;
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return !!value && typeof value == 'object';
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite
     * property assignments of previous values.
     *
     * @static
     * @memberOf _
     * @since 0.7.0
     * @category Object
     * @param {Object} object The object to invert.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     */
    var invert = createInverter(function(result, value, key) {
      result[value] = key;
    }, constant(identity));

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    var lodash_invert = invert;

    var CyrillicToTranslit = function cyrillicToTranslit(config) {
      const invert = lodash_invert;
      const _preset = config ? config.preset : "ru";

      /*
      ASSOCIATIONS FOR INITIAL POSITION
      */

      // letters shared between languages
      const _firstLetters = {
        "а": "a",
        "б": "b",
        "в": "v",
        "д": "d",
        "з": "z",
        "й": "y",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "ь": ""
      };

      // language-specific letters
      if (_preset === "ru") {
        Object.assign(_firstLetters, {
          "г": "g",
          "и": "i",
          "ъ": "",
          "ы": "i",
          "э": "e",
        });
      } else if (_preset === "uk") {
        Object.assign(_firstLetters, {
          "г": "h",
          "ґ": "g",
          "е": "e",
          "и": "y",
          "і": "i",
          "'": "",
          "’": "",
          "ʼ": "",
        });
      } else if (_preset === "mn") {
        Object.assign(_firstLetters, {
          "г": "g",
          "ө": "o",
          "ү": "u",
          "и": "i",
          "ы": "y",
          "э": "e",
          "ъ": ""
        });
      }

      let _reversedFirstLetters;
      if (_preset === "ru") {
        // Russian: i > always и, y > й in initial position, e > э in initial position
        _reversedFirstLetters = Object.assign(invert(_firstLetters), { "i": "и", "": "" });
      } else if (_preset === "uk") {
        // Ukrainian: i > always i, y > always и, e > always е
        _reversedFirstLetters = Object.assign(invert(_firstLetters), { "": "" });
      } else if (_preset === "mn") {
        _reversedFirstLetters = Object.assign(invert(_firstLetters), { "": "" });
      }

      // digraphs appearing only in initial position
      const _initialDigraphs = (_preset === "ru") ? { "е": "ye" } : { "є": "ye", "ї": "yi" };

      // digraphs appearing in all positions
      const _regularDigraphs = {
        "ё": "yo",
        "ж": "zh",
        "х": "kh",
        "ц": "ts",
        "ч": "ch",
        "ш": "sh",
        "щ": "shch",
        "ю": "yu",
        "я": "ya",
      };

      const _firstDigraphs = Object.assign({}, _regularDigraphs, _initialDigraphs);

      const _reversedFirstDigraphs = Object.assign(invert(_firstDigraphs));

      const _firstAssociations = Object.assign(_firstLetters, _firstDigraphs);

      /*
      ASSOCIATIONS FOR NON-INITIAL POSITION
      */

      const _nonFirstLetters = Object.assign({}, _firstLetters, { "й": "i" });
      if (_preset === "ru") {
        Object.assign(_nonFirstLetters, { "е": "e" });
      } else if (_preset === "uk") {
        Object.assign(_nonFirstLetters, { "ї": "i" });
      } else if (_preset === "mn") {
        Object.assign(_nonFirstLetters, { "е": "e" });
      }

      let _reversedNonFirstLetters;
      if (_preset === "ru") {
        // Russian: i > always и, y > ы in non-initial position, e > е in non-initial position
        _reversedNonFirstLetters = Object.assign(invert(_firstLetters), {
          "i": "и", 
          "y": "ы",
          "e": "е",
          "": "" 
        });
      } else if (_preset === "uk") {
        // Ukrainian: i > always i, y > always и, e > always е
        _reversedNonFirstLetters = Object.assign(invert(_firstLetters), { "": "" });
      }

      // digraphs appearing only in non-initial positions
      let _nonInitialDigraphs = {};
      if (_preset === "uk") {
        _nonInitialDigraphs = {
          "є": "ie",
          "ю": "iu",
          "я": "ia",
        };
      }

      const _nonFirstDigraphs = Object.assign(_regularDigraphs, _nonInitialDigraphs);

      const _reversedNonFirstDigraphs = Object.assign(invert(_nonFirstDigraphs));

      const _nonFirstAssociations = Object.assign(_nonFirstLetters, _nonFirstDigraphs);


      function transform(input, spaceReplacement) {
        if (!input) {
          return "";
        }

        // We must normalize string for transform all unicode chars to uniform form
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
        const normalizedInput = input.normalize();

        let newStr = "";
        let isWordBoundary = false;

        for (let i = 0; i < normalizedInput.length; i++) {
          const isUpperCaseOrWhatever = normalizedInput[i] === normalizedInput[i].toUpperCase();
          let strLowerCase = normalizedInput[i].toLowerCase();

          if (strLowerCase === " ") {
            newStr += spaceReplacement ? spaceReplacement :  " ";
            isWordBoundary = true;
            continue;
          }

          let newLetter;

          if ( _preset === "uk" && normalizedInput.slice(i-1, i+1).toLowerCase() === "зг") {
            // handle ukrainian special case зг > zgh
            newLetter = "gh";
          } else if (i === 0 || isWordBoundary) {
            newLetter = _firstAssociations[strLowerCase];
            isWordBoundary = false;
          } else {
            newLetter = _nonFirstAssociations[strLowerCase];
          }

          if ("undefined" === typeof newLetter) {
            newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
          } else if (isUpperCaseOrWhatever) {
            // handle multi-symbol letters
            newLetter.length > 1
              ? newStr += newLetter[0].toUpperCase() + newLetter.slice(1)
              : newStr += newLetter.toUpperCase();
          } else {
            newStr += newLetter;
          }
        }
        return newStr;
      }

      function reverse(input, spaceReplacement) {

        if (!input) return "";

        const normalizedInput = input.normalize();

        let newStr = "";
        let isWordBoundary = false;
        let i = 0;

        while (i < normalizedInput.length) {
          const isUpperCaseOrWhatever = normalizedInput[i] === normalizedInput[i].toUpperCase();
          let strLowerCase = normalizedInput[i].toLowerCase();
          let currentIndex = i;

          if (strLowerCase === " " || strLowerCase === spaceReplacement) {
            newStr += " ";
            isWordBoundary = true;
            i++;
            continue;
          }
          
          let newLetter;

          let digraph = normalizedInput.slice(i, i + 2).toLowerCase();
          if (i === 0 || isWordBoundary) {
            newLetter = _reversedFirstDigraphs[digraph];
            if (newLetter) {
              i += 2;
            } else {
              newLetter = _reversedFirstLetters[strLowerCase];
              i++;
            }
            isWordBoundary = false;
          } else {
            newLetter = _reversedNonFirstDigraphs[digraph];
            if (newLetter) {
              i += 2;
            } else {
              newLetter = _reversedNonFirstLetters[strLowerCase];
              i++;
            }
          }

          // special cases: щ and зг
          if (normalizedInput.slice(currentIndex, currentIndex + 4).toLowerCase() === "shch") {
            newLetter = "щ";
            i = currentIndex + 4;
          } else if (normalizedInput.slice(currentIndex - 1, currentIndex + 2).toLowerCase() === "zgh") {
            newLetter = "г";
            i = currentIndex + 2;
          }

          if ("undefined" === typeof newLetter) {
            newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
          }
          else {
            if (isUpperCaseOrWhatever) {
                // handle multi-symbol letters
                newLetter.length > 1
                  ? newStr += newLetter[0].toUpperCase() + newLetter.slice(1)
                  : newStr += newLetter.toUpperCase();
            } else {
                newStr += newLetter;
            }
          }
        }

        return newStr;
      }

      return {
        transform: transform,
        reverse: reverse
      };
    };

    //Подгрузка библиотеки транслитерации (для добавления кастом ролей)
    const cyrillicToTranslit = new CyrillicToTranslit();

    function createStore$2() {
        const { update, subscribe } = writable({
            newRoleName: "",
        });

        return {
            subscribe,
            update,
            //Очистка поля "имени" при добавлении кастом роли на модалке
            clearCustomRoleField: () => {
                update((prev) => {
                    return {
                        ...prev,
                        newRoleName: "",
                    };
                });
            },
            //onChange на Input ввода имени при добавлении кастом роли на модалке
            onChangeNameCustomRole: (e) => {
                if (String(e.target.value).trim().length > 0) {
                    update((prev) => {
                        return {
                            ...prev,
                            newRoleName: String(e.target.value).trim(),
                        };
                    });
                }
            },
            //Добавление кастом роли в хранилище
            createCustomRole: () => {
                const newRoleName = get_store_value(manualStore).newRoleName;
                let storageRoleName = cyrillicToTranslit
                    .transform(newRoleName, "_")
                    .toLowerCase();
                if (Number(storageRoleName) !== NaN) {
                    storageRoleName = "role_" + storageRoleName;
                }
                if (localStorage.getItem("customRoles") !== null) {
                    let savedCustomRoles = JSON.parse(
                        localStorage.getItem("customRoles")
                    );
                    if (savedCustomRoles.hasOwnProperty(storageRoleName)) {
                        return false;
                    } else {
                        savedCustomRoles[storageRoleName] = {
                            name: newRoleName,
                            icon: "",
                            description: "",
                        };
                        localStorage.setItem(
                            "customRoles",
                            JSON.stringify(savedCustomRoles)
                        );
                        return true;
                    }
                } else {
                    let savedRole = {};
                    (savedRole[storageRoleName] = {
                        name: newRoleName,
                        icon: "",
                        description: "",
                    }),
                        localStorage.setItem(
                            "customRoles",
                            JSON.stringify({ ...savedRole })
                        );
                    return true;
                }
            },
        };
    }

    const manualStore = createStore$2();

    /* src\pages\ManualDistribution.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1$2 } = globals;
    const file$l = "src\\pages\\ManualDistribution.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i][0];
    	child_ctx[13] = list[i][1];
    	return child_ctx;
    }

    // (75:16) {#each Object.entries(allCardsList()) as [cardName, role]}
    function create_each_block$3(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*role*/ ctx[13].name + "";
    	let t0;
    	let t1;
    	let td1;
    	let button0;
    	let t2;
    	let button0_class_value;
    	let t3;
    	let input;
    	let input_value_value;
    	let input_class_value;
    	let t4;
    	let button1;
    	let t5;
    	let button1_class_value;
    	let t6;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[4](/*cardName*/ ctx[12]);
    	}

    	function input_handler(...args) {
    		return /*input_handler*/ ctx[5](/*cardName*/ ctx[12], ...args);
    	}

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[6](/*cardName*/ ctx[12]);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			button0 = element("button");
    			t2 = text("+");
    			t3 = space();
    			input = element("input");
    			t4 = space();
    			button1 = element("button");
    			t5 = text("-");
    			t6 = space();
    			add_location(td0, file$l, 76, 24, 2807);

    			attr_dev(button0, "class", button0_class_value = "changeCardCountBtn " + (/*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]] >= 100
    			? 'disabledBtn'
    			: '') + " svelte-13nmxl9");

    			add_location(button0, file$l, 78, 28, 2927);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", "100");
    			attr_dev(input, "name", /*cardName*/ ctx[12]);
    			input.value = input_value_value = /*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]];

    			attr_dev(input, "class", input_class_value = "cardCountInput " + (/*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]] !== 0
    			? 'activeCard'
    			: '') + " svelte-13nmxl9");

    			add_location(input, file$l, 88, 28, 3454);

    			attr_dev(button1, "class", button1_class_value = "changeCardCountBtn " + (/*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]] <= 0
    			? 'disabledBtn'
    			: '') + " svelte-13nmxl9");

    			add_location(button1, file$l, 104, 28, 4267);
    			attr_dev(td1, "align", "right");
    			attr_dev(td1, "class", "cardCounterColumn svelte-13nmxl9");
    			add_location(td1, file$l, 77, 24, 2853);
    			add_location(tr, file$l, 75, 20, 2777);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, button0);
    			append_dev(button0, t2);
    			append_dev(td1, t3);
    			append_dev(td1, input);
    			append_dev(td1, t4);
    			append_dev(td1, button1);
    			append_dev(button1, t5);
    			append_dev(tr, t6);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler, false, false, false),
    					listen_dev(input, "input", input_handler, false, false, false),
    					listen_dev(button1, "click", click_handler_1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*$selectedCardsStore*/ 8 && button0_class_value !== (button0_class_value = "changeCardCountBtn " + (/*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]] >= 100
    			? 'disabledBtn'
    			: '') + " svelte-13nmxl9")) {
    				attr_dev(button0, "class", button0_class_value);
    			}

    			if (dirty & /*$selectedCardsStore*/ 8 && input_value_value !== (input_value_value = /*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]]) && input.value !== input_value_value) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (dirty & /*$selectedCardsStore*/ 8 && input_class_value !== (input_class_value = "cardCountInput " + (/*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]] !== 0
    			? 'activeCard'
    			: '') + " svelte-13nmxl9")) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (dirty & /*$selectedCardsStore*/ 8 && button1_class_value !== (button1_class_value = "changeCardCountBtn " + (/*$selectedCardsStore*/ ctx[3].cards[/*cardName*/ ctx[12]] <= 0
    			? 'disabledBtn'
    			: '') + " svelte-13nmxl9")) {
    				attr_dev(button1, "class", button1_class_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(75:16) {#each Object.entries(allCardsList()) as [cardName, role]}",
    		ctx
    	});

    	return block;
    }

    // (70:12) <Table>
    function create_default_slot_4$3(ctx) {
    	let thead;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let each_1_anchor;
    	let each_value = Object.entries(allCardsList());
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			th0 = element("th");
    			th0.textContent = "Название карты";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Количество";
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(th0, "align", "left");
    			add_location(th0, file$l, 71, 20, 2562);
    			attr_dev(th1, "align", "right");
    			add_location(th1, file$l, 72, 20, 2620);
    			add_location(thead, file$l, 70, 16, 2533);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, th0);
    			append_dev(thead, t1);
    			append_dev(thead, th1);
    			insert_dev(target, t3, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$selectedCardsStore, Object, allCardsList, selectedCardsStore*/ 8) {
    				each_value = Object.entries(allCardsList());
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(70:12) <Table>",
    		ctx
    	});

    	return block;
    }

    // (133:12) <Button clickEvent={confirmBtnEvent}>
    function create_default_slot_3$5(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*confirmBtnText*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*confirmBtnText*/ 1) set_data_dev(t, /*confirmBtnText*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$5.name,
    		type: "slot",
    		source: "(133:12) <Button clickEvent={confirmBtnEvent}>",
    		ctx
    	});

    	return block;
    }

    // (134:12) <Button color="secondary" clickEvent={() => navigateTo("/home")}                  >
    function create_default_slot_2$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Назад");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$6.name,
    		type: "slot",
    		source: "(134:12) <Button color=\\\"secondary\\\" clickEvent={() => navigateTo(\\\"/home\\\")}                  >",
    		ctx
    	});

    	return block;
    }

    // (64:4) <Container>
    function create_default_slot_1$8(ctx) {
    	let div0;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div1;
    	let table;
    	let t3;
    	let span;
    	let t5;
    	let h2;
    	let t6;
    	let t7_value = Object.values(/*$selectedCardsStore*/ ctx[3].cards).reduce(func$1, 0) + "";
    	let t7;
    	let t8;
    	let div2;
    	let button0;
    	let t9;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;

    	table = new Table({
    			props: {
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0 = new Button({
    			props: {
    				clickEvent: /*confirmBtnEvent*/ ctx[1],
    				$$slots: { default: [create_default_slot_3$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				color: "secondary",
    				clickEvent: /*func_1*/ ctx[8],
    				$$slots: { default: [create_default_slot_2$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Выберите карты";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div1 = element("div");
    			create_component(table.$$.fragment);
    			t3 = space();
    			span = element("span");
    			span.textContent = "Добавить свою роль";
    			t5 = space();
    			h2 = element("h2");
    			t6 = text("Количество игроков: ");
    			t7 = text(t7_value);
    			t8 = space();
    			div2 = element("div");
    			create_component(button0.$$.fragment);
    			t9 = space();
    			create_component(button1.$$.fragment);
    			add_location(h1, file$l, 65, 12, 2406);
    			add_location(hr, file$l, 66, 12, 2443);
    			add_location(div0, file$l, 64, 8, 2387);
    			attr_dev(div1, "class", "roles svelte-13nmxl9");
    			add_location(div1, file$l, 68, 8, 2475);
    			attr_dev(span, "class", "addCustomRole svelte-13nmxl9");
    			toggle_class(span, "active", /*modalParams*/ ctx[2].showFlag);
    			add_location(span, file$l, 119, 8, 4893);
    			attr_dev(h2, "class", "cardCounterIndicator svelte-13nmxl9");
    			add_location(h2, file$l, 126, 8, 5112);
    			attr_dev(div2, "class", "buttons svelte-13nmxl9");
    			add_location(div2, file$l, 131, 8, 5309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, hr);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div1, anchor);
    			mount_component(table, div1, null);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, span, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t6);
    			append_dev(h2, t7);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(button0, div2, null);
    			append_dev(div2, t9);
    			mount_component(button1, div2, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(span, "click", /*click_handler_2*/ ctx[7], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope, $selectedCardsStore*/ 65544) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);

    			if (dirty & /*modalParams*/ 4) {
    				toggle_class(span, "active", /*modalParams*/ ctx[2].showFlag);
    			}

    			if ((!current || dirty & /*$selectedCardsStore*/ 8) && t7_value !== (t7_value = Object.values(/*$selectedCardsStore*/ ctx[3].cards).reduce(func$1, 0) + "")) set_data_dev(t7, t7_value);
    			const button0_changes = {};
    			if (dirty & /*confirmBtnEvent*/ 2) button0_changes.clickEvent = /*confirmBtnEvent*/ ctx[1];

    			if (dirty & /*$$scope, confirmBtnText*/ 65537) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 65536) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div1);
    			destroy_component(table);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(span);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(div2);
    			destroy_component(button0);
    			destroy_component(button1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$8.name,
    		type: "slot",
    		source: "(64:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (63:0) <Layout>
    function create_default_slot$e(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_1$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope, confirmBtnEvent, confirmBtnText, $selectedCardsStore, modalParams*/ 65551) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$e.name,
    		type: "slot",
    		source: "(63:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let layout;
    	let t;
    	let textinputmodal;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$e] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const textinputmodal_spread_levels = [/*modalParams*/ ctx[2]];
    	let textinputmodal_props = {};

    	for (let i = 0; i < textinputmodal_spread_levels.length; i += 1) {
    		textinputmodal_props = assign(textinputmodal_props, textinputmodal_spread_levels[i]);
    	}

    	textinputmodal = new TextInputModal({
    			props: textinputmodal_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    			t = space();
    			create_component(textinputmodal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(textinputmodal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, confirmBtnEvent, confirmBtnText, $selectedCardsStore, modalParams*/ 65551) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);

    			const textinputmodal_changes = (dirty & /*modalParams*/ 4)
    			? get_spread_update(textinputmodal_spread_levels, [get_spread_object(/*modalParams*/ ctx[2])])
    			: {};

    			textinputmodal.$set(textinputmodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			transition_in(textinputmodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			transition_out(textinputmodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(textinputmodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$1 = (sum, a) => sum + a;

    function instance$m($$self, $$props, $$invalidate) {
    	let $manualStore;
    	let $selectedCardsStore;
    	validate_store(manualStore, 'manualStore');
    	component_subscribe($$self, manualStore, $$value => $$invalidate(9, $manualStore = $$value));
    	validate_store(selectedCardsStore, 'selectedCardsStore');
    	component_subscribe($$self, selectedCardsStore, $$value => $$invalidate(3, $selectedCardsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ManualDistribution', slots, []);
    	let { confirmBtnText = "Подтвердить", confirmBtnEvent = onDistributionComplieted } = $$props;

    	onMount(() => {
    		manualStore.clearCustomRoleField();
    	});

    	//Функция подтверждения завершения выбора карт для раздачи
    	function onDistributionComplieted() {
    		const cardsList = Object.values($selectedCardsStore.cards);

    		for (let i = 0; i < cardsList.length; i++) {
    			if (cardsList[i] !== 0) {
    				navigateTo("preview-distribution");
    				break;
    			}
    		}
    	}

    	//Параметры модалки добавления кастом роли
    	let modalParams = {
    		showFlag: false,
    		labelName: "Название новой роли",
    		inputValue: $manualStore.newRoleName,
    		changeInputEvent: manualStore.onChangeNameCustomRole,
    		confirmBtnText: "Сохранить",
    		confirmBtnEvent: onCreateCustomRole,
    		backBtnEvent: () => {
    			$$invalidate(2, modalParams.showFlag = false, modalParams);
    		},
    		errorFlag: false,
    		errorText: "Недопустимое название роли. Введите корректное название."
    	};

    	function onCreateCustomRole() {
    		$$invalidate(2, modalParams.errorFlag = false, modalParams);

    		if ($manualStore.newRoleName.length > 0) {
    			if (!manualStore.createCustomRole()) {
    				$$invalidate(2, modalParams.errorFlag = true, modalParams);
    			} else {
    				$$invalidate(2, modalParams.showFlag = false, modalParams);
    				manualStore.clearCustomRoleField();
    				selectedCardsStore.reinit();
    			}
    		} else {
    			$$invalidate(2, modalParams.errorFlag = true, modalParams);
    		}
    	}

    	const writable_props = ['confirmBtnText', 'confirmBtnEvent'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ManualDistribution> was created with unknown prop '${key}'`);
    	});

    	const click_handler = cardName => selectedCardsStore.incrementCardCount(cardName);
    	const input_handler = (cardName, e) => selectedCardsStore.onCardCountChanged(cardName, e);
    	const click_handler_1 = cardName => selectedCardsStore.decrementCardCount(cardName);
    	const click_handler_2 = () => $$invalidate(2, modalParams.showFlag = true, modalParams);
    	const func_1 = () => navigateTo("/home");

    	$$self.$$set = $$props => {
    		if ('confirmBtnText' in $$props) $$invalidate(0, confirmBtnText = $$props.confirmBtnText);
    		if ('confirmBtnEvent' in $$props) $$invalidate(1, confirmBtnEvent = $$props.confirmBtnEvent);
    	};

    	$$self.$capture_state = () => ({
    		navigateTo,
    		Button,
    		Container,
    		Layout,
    		Table,
    		allCardsList,
    		manualStore,
    		selectedCardsStore,
    		onMount,
    		TextInputModal,
    		confirmBtnText,
    		confirmBtnEvent,
    		onDistributionComplieted,
    		modalParams,
    		onCreateCustomRole,
    		$manualStore,
    		$selectedCardsStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('confirmBtnText' in $$props) $$invalidate(0, confirmBtnText = $$props.confirmBtnText);
    		if ('confirmBtnEvent' in $$props) $$invalidate(1, confirmBtnEvent = $$props.confirmBtnEvent);
    		if ('modalParams' in $$props) $$invalidate(2, modalParams = $$props.modalParams);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		confirmBtnText,
    		confirmBtnEvent,
    		modalParams,
    		$selectedCardsStore,
    		click_handler,
    		input_handler,
    		click_handler_1,
    		click_handler_2,
    		func_1
    	];
    }

    class ManualDistribution extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { confirmBtnText: 0, confirmBtnEvent: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ManualDistribution",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get confirmBtnText() {
    		throw new Error("<ManualDistribution>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set confirmBtnText(value) {
    		throw new Error("<ManualDistribution>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get confirmBtnEvent() {
    		throw new Error("<ManualDistribution>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set confirmBtnEvent(value) {
    		throw new Error("<ManualDistribution>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Image.svelte generated by Svelte v3.48.0 */
    const file$k = "src\\components\\Image.svelte";

    function create_fragment$l(ctx) {
    	let img;
    	let img_src_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*imgSrc*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*alt*/ ctx[1]);
    			add_location(img, file$k, 22, 0, 511);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    			/*img_binding*/ ctx[5](img);

    			if (!mounted) {
    				dispose = listen_dev(img, "error", /*imgBoundaryEvent*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*imgSrc*/ 1 && !src_url_equal(img.src, img_src_value = /*imgSrc*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*alt*/ 2) {
    				attr_dev(img, "alt", /*alt*/ ctx[1]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    			/*img_binding*/ ctx[5](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Image', slots, []);
    	let { imgSrc, boundaryImgSrc, alt } = $$props;
    	let badBoundaryImg = false;
    	let imgNode;

    	function imgBoundaryEvent(e) {
    		if (!badBoundaryImg) {
    			e.target.src = boundaryImgSrc;
    		} else {
    			e.target.classList.add("badImage");
    		}

    		badBoundaryImg = true;
    	}

    	afterUpdate(() => {
    		badBoundaryImg = false;
    		imgNode.classList.remove("badImage");
    	});

    	const writable_props = ['imgSrc', 'boundaryImgSrc', 'alt'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	function img_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			imgNode = $$value;
    			$$invalidate(2, imgNode);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('imgSrc' in $$props) $$invalidate(0, imgSrc = $$props.imgSrc);
    		if ('boundaryImgSrc' in $$props) $$invalidate(4, boundaryImgSrc = $$props.boundaryImgSrc);
    		if ('alt' in $$props) $$invalidate(1, alt = $$props.alt);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		imgSrc,
    		boundaryImgSrc,
    		alt,
    		badBoundaryImg,
    		imgNode,
    		imgBoundaryEvent
    	});

    	$$self.$inject_state = $$props => {
    		if ('imgSrc' in $$props) $$invalidate(0, imgSrc = $$props.imgSrc);
    		if ('boundaryImgSrc' in $$props) $$invalidate(4, boundaryImgSrc = $$props.boundaryImgSrc);
    		if ('alt' in $$props) $$invalidate(1, alt = $$props.alt);
    		if ('badBoundaryImg' in $$props) badBoundaryImg = $$props.badBoundaryImg;
    		if ('imgNode' in $$props) $$invalidate(2, imgNode = $$props.imgNode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [imgSrc, alt, imgNode, imgBoundaryEvent, boundaryImgSrc, img_binding];
    }

    class Image extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { imgSrc: 0, boundaryImgSrc: 4, alt: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$l.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*imgSrc*/ ctx[0] === undefined && !('imgSrc' in props)) {
    			console.warn("<Image> was created without expected prop 'imgSrc'");
    		}

    		if (/*boundaryImgSrc*/ ctx[4] === undefined && !('boundaryImgSrc' in props)) {
    			console.warn("<Image> was created without expected prop 'boundaryImgSrc'");
    		}

    		if (/*alt*/ ctx[1] === undefined && !('alt' in props)) {
    			console.warn("<Image> was created without expected prop 'alt'");
    		}
    	}

    	get imgSrc() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set imgSrc(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boundaryImgSrc() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boundaryImgSrc(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alt() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alt(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\ShowDistribution.svelte generated by Svelte v3.48.0 */
    const file$j = "src\\pages\\ShowDistribution.svelte";

    // (91:16) {#if !closeDistributionFlag && $settingsStore.viewIconsCards}
    function create_if_block_1$3(ctx) {
    	let image;
    	let current;

    	image = new Image({
    			props: {
    				alt: "Иконка роли",
    				imgSrc: allCardsList()[/*activeCard*/ ctx[1]]?.icon || unknownCardIcon,
    				boundaryImgSrc: unknownCardIcon
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(image.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(image, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const image_changes = {};
    			if (dirty & /*activeCard*/ 2) image_changes.imgSrc = allCardsList()[/*activeCard*/ ctx[1]]?.icon || unknownCardIcon;
    			image.$set(image_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(image.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(image.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(image, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(91:16) {#if !closeDistributionFlag && $settingsStore.viewIconsCards}",
    		ctx
    	});

    	return block;
    }

    // (106:16) {#if !closeDistributionFlag && $settingsStore.viewDescriptionCards}
    function create_if_block$6(ctx) {
    	let p;

    	let t_value = (allCardsList()[/*activeCard*/ ctx[1]]?.description?.length > 0
    	? allCardsList()[/*activeCard*/ ctx[1]]?.description
    	: "Для данной роли нет описания") + "";

    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "roleDescription svelte-1gmhmps");
    			add_location(p, file$j, 106, 20, 4125);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeCard*/ 2 && t_value !== (t_value = (allCardsList()[/*activeCard*/ ctx[1]]?.description?.length > 0
    			? allCardsList()[/*activeCard*/ ctx[1]]?.description
    			: "Для данной роли нет описания") + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(106:16) {#if !closeDistributionFlag && $settingsStore.viewDescriptionCards}",
    		ctx
    	});

    	return block;
    }

    // (85:0) <Layout>
    function create_default_slot$d(ctx) {
    	let div3;
    	let h1;
    	let t1;
    	let div2;
    	let div0;
    	let div0_class_value;
    	let t2;
    	let div1;
    	let t3;
    	let span0;

    	let t4_value = (allCardsList().hasOwnProperty(/*activeCard*/ ctx[1])
    	? allCardsList()[/*activeCard*/ ctx[1]]?.name
    	: /*closeDistributionFlag*/ ctx[3]
    		? /*activeCard*/ ctx[1]
    		: "Неизвестная роль") + "";

    	let t4;
    	let t5;
    	let div1_class_value;
    	let t6;
    	let span1;
    	let t7;
    	let t8_value = /*$mainStore*/ ctx[5].cardsHiddened.length + "";
    	let t8;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = !/*closeDistributionFlag*/ ctx[3] && /*$settingsStore*/ ctx[4].viewIconsCards && create_if_block_1$3(ctx);
    	let if_block1 = !/*closeDistributionFlag*/ ctx[3] && /*$settingsStore*/ ctx[4].viewDescriptionCards && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Нажмите на карту, чтобы получить свою роль";
    			t1 = space();
    			div2 = element("div");
    			div0 = element("div");
    			t2 = space();
    			div1 = element("div");
    			if (if_block0) if_block0.c();
    			t3 = space();
    			span0 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			if (if_block1) if_block1.c();
    			t6 = space();
    			span1 = element("span");
    			t7 = text("Осталось карт: ");
    			t8 = text(t8_value);
    			attr_dev(h1, "class", "svelte-1gmhmps");
    			add_location(h1, file$j, 86, 8, 3038);
    			attr_dev(div0, "class", div0_class_value = "cardFront" + (/*cardViewFlag*/ ctx[0] ? ' cardFrontHiddened' : '') + " svelte-1gmhmps");
    			add_location(div0, file$j, 88, 12, 3176);
    			attr_dev(span0, "class", "activeRoleName svelte-1gmhmps");
    			add_location(span0, file$j, 98, 16, 3706);
    			attr_dev(div1, "class", div1_class_value = "cardBack" + (/*cardViewFlag*/ ctx[0] ? ' cardBackOpened' : '') + " svelte-1gmhmps");
    			add_location(div1, file$j, 89, 12, 3257);
    			attr_dev(div2, "class", "card svelte-1gmhmps");
    			add_location(div2, file$j, 87, 8, 3099);
    			attr_dev(span1, "class", "cardsCounter svelte-1gmhmps");
    			add_location(span1, file$j, 114, 8, 4459);
    			attr_dev(div3, "class", "cardsArea svelte-1gmhmps");
    			add_location(div3, file$j, 85, 4, 3005);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h1);
    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			if (if_block0) if_block0.m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, span0);
    			append_dev(span0, t4);
    			append_dev(div1, t5);
    			if (if_block1) if_block1.m(div1, null);
    			/*div2_binding*/ ctx[7](div2);
    			append_dev(div3, t6);
    			append_dev(div3, span1);
    			append_dev(span1, t7);
    			append_dev(span1, t8);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div2, "click", /*onCardOpened*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*cardViewFlag*/ 1 && div0_class_value !== (div0_class_value = "cardFront" + (/*cardViewFlag*/ ctx[0] ? ' cardFrontHiddened' : '') + " svelte-1gmhmps")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!/*closeDistributionFlag*/ ctx[3] && /*$settingsStore*/ ctx[4].viewIconsCards) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*closeDistributionFlag, $settingsStore*/ 24) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_1$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div1, t3);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if ((!current || dirty & /*activeCard, closeDistributionFlag*/ 10) && t4_value !== (t4_value = (allCardsList().hasOwnProperty(/*activeCard*/ ctx[1])
    			? allCardsList()[/*activeCard*/ ctx[1]]?.name
    			: /*closeDistributionFlag*/ ctx[3]
    				? /*activeCard*/ ctx[1]
    				: "Неизвестная роль") + "")) set_data_dev(t4, t4_value);

    			if (!/*closeDistributionFlag*/ ctx[3] && /*$settingsStore*/ ctx[4].viewDescriptionCards) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$6(ctx);
    					if_block1.c();
    					if_block1.m(div1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (!current || dirty & /*cardViewFlag*/ 1 && div1_class_value !== (div1_class_value = "cardBack" + (/*cardViewFlag*/ ctx[0] ? ' cardBackOpened' : '') + " svelte-1gmhmps")) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if ((!current || dirty & /*$mainStore*/ 32) && t8_value !== (t8_value = /*$mainStore*/ ctx[5].cardsHiddened.length + "")) set_data_dev(t8, t8_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			/*div2_binding*/ ctx[7](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$d.name,
    		type: "slot",
    		source: "(85:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$d] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, $mainStore, cardNode, cardViewFlag, activeCard, closeDistributionFlag, $settingsStore*/ 575) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	let $mainStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(4, $settingsStore = $$value));
    	validate_store(mainStore, 'mainStore');
    	component_subscribe($$self, mainStore, $$value => $$invalidate(5, $mainStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ShowDistribution', slots, []);
    	let cardViewFlag = false;

    	//Название показываемой на данный момент карты
    	let activeCard = "";

    	//Переменная с DOM элементом карточки для выдачи
    	let cardNode = undefined;

    	//Статус завершения раздачи (true - раздача окончена)
    	let closeDistributionFlag = false;

    	//Таймер отображения вскрытой карты на экране
    	let timer = null;

    	//Функция показа ролей карт
    	function onCardOpened() {
    		function disableClickInAnimationTime() {
    			if (cardNode) {
    				$$invalidate(2, cardNode.style.pointerEvents = "none", cardNode);
    			}

    			setTimeout(
    				() => {
    					if (cardNode) {
    						$$invalidate(2, cardNode.style.pointerEvents = "auto", cardNode);
    					}
    				},
    				900
    			);
    		}

    		if (closeDistributionFlag === false) {
    			disableClickInAnimationTime();
    		}

    		if ($mainStore.cardsHiddened.length > 0) {
    			//Если роль на данный момент не видна игроку
    			if (cardViewFlag === false) {
    				$$invalidate(1, activeCard = $mainStore.cardsHiddened[0]);
    				mainStore.deleteOpenedCard();
    				mainStore.pushToHistoryDistribution(activeCard);
    				mainStore.saveDistributionInLocalStorage();
    				$$invalidate(0, cardViewFlag = true);

    				//Если в настройках установлен тип скрытия карт "по таймеру"
    				if ($settingsStore.hiddeningCardsFlag) {
    					if (timer === null) {
    						timer = setTimeout(
    							() => {
    								$$invalidate(0, cardViewFlag = false);
    								clearTimeout(timer);
    								timer = null;
    								disableClickInAnimationTime();
    							},
    							$settingsStore.hiddeningCardsFlagTimer * 1000
    						);
    					}
    				}
    			} else {
    				if (timer === null) {
    					$$invalidate(0, cardViewFlag = false);
    				}
    			}
    		} else {
    			if (closeDistributionFlag === true) {
    				navigateTo("/");
    			}

    			$$invalidate(1, activeCard = "Раздача окончена. Нажмите ещё раз для выхода в меню.");
    			$$invalidate(0, cardViewFlag = true);
    			$$invalidate(3, closeDistributionFlag = true);
    		}
    	}

    	onMount(() => {
    		mainStore.saveDistributionDate();
    		reloadSavedIcons();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ShowDistribution> was created with unknown prop '${key}'`);
    	});

    	function div2_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			cardNode = $$value;
    			$$invalidate(2, cardNode);
    		});
    	}

    	$$self.$capture_state = () => ({
    		mainStore,
    		Layout,
    		navigateTo,
    		onMount,
    		settingsStore,
    		allCardsList,
    		reloadSavedIcons,
    		unknownCardIcon,
    		selectedCardsStore,
    		Image,
    		cardViewFlag,
    		activeCard,
    		cardNode,
    		closeDistributionFlag,
    		timer,
    		onCardOpened,
    		$settingsStore,
    		$mainStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('cardViewFlag' in $$props) $$invalidate(0, cardViewFlag = $$props.cardViewFlag);
    		if ('activeCard' in $$props) $$invalidate(1, activeCard = $$props.activeCard);
    		if ('cardNode' in $$props) $$invalidate(2, cardNode = $$props.cardNode);
    		if ('closeDistributionFlag' in $$props) $$invalidate(3, closeDistributionFlag = $$props.closeDistributionFlag);
    		if ('timer' in $$props) timer = $$props.timer;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		cardViewFlag,
    		activeCard,
    		cardNode,
    		closeDistributionFlag,
    		$settingsStore,
    		$mainStore,
    		onCardOpened,
    		div2_binding
    	];
    }

    class ShowDistribution extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ShowDistribution",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
        };
    }

    /* src\pages\HistoryDistribution.svelte generated by Svelte v3.48.0 */
    const file$i = "src\\pages\\HistoryDistribution.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (111:8) {:else}
    function create_else_block_2(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let t2;
    	let button;
    	let current;

    	button = new Button({
    			props: {
    				clickEvent: /*func*/ ctx[7],
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			span.textContent = "Вы не провели ни одной игры";
    			t2 = space();
    			create_component(button.$$.fragment);
    			if (!src_url_equal(img.src, img_src_value = "assets/nogames.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Грусный смайлик :(");
    			attr_dev(img, "class", "svelte-d3ukxe");
    			add_location(img, file$i, 112, 16, 4317);
    			attr_dev(span, "class", "svelte-d3ukxe");
    			add_location(span, file$i, 113, 16, 4392);
    			attr_dev(div, "class", "noGamesArea svelte-d3ukxe");
    			add_location(div, file$i, 111, 12, 4274);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(div, t2);
    			mount_component(button, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const button_changes = {};

    			if (dirty & /*$$scope*/ 32768) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(111:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (79:8) {#if history.length > 0}
    function create_if_block_2$2(ctx) {
    	let table;
    	let current;

    	table = new Table({
    			props: {
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope, history*/ 32769) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(79:8) {#if history.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (115:16) <Button clickEvent={() => navigateTo("home")}                      >
    function create_default_slot_5$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Начать игру");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(115:16) <Button clickEvent={() => navigateTo(\\\"home\\\")}                      >",
    		ctx
    	});

    	return block;
    }

    // (86:16) {#each history as game, idx (game.dateID)}
    function create_each_block_2(key_1, ctx) {
    	let tr;
    	let td0;
    	let span0;
    	let t0_value = createCurrentDate(/*game*/ ctx[13].dateID) + "";
    	let t0;
    	let t1;
    	let span1;
    	let t2_value = createCurrentTime(/*game*/ ctx[13].dateID) + "";
    	let t2;
    	let t3;
    	let td1;
    	let t4_value = /*game*/ ctx[13].cardsOpened.length + /*game*/ ctx[13].cardsHiddened.length + "";
    	let t4;
    	let t5;
    	let td2;
    	let button0;
    	let t7;
    	let button1;
    	let t9;
    	let tr_transition;
    	let current;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[5](/*idx*/ ctx[11]);
    	}

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[6](/*idx*/ ctx[11]);
    	}

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			span0 = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			span1 = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			td1 = element("td");
    			t4 = text(t4_value);
    			t5 = space();
    			td2 = element("td");
    			button0 = element("button");
    			button0.textContent = "Подробнее";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "Удалить";
    			t9 = space();
    			add_location(span0, file$i, 88, 28, 3255);
    			add_location(span1, file$i, 89, 28, 3330);
    			attr_dev(td0, "class", "dateAndTime svelte-d3ukxe");
    			add_location(td0, file$i, 87, 24, 3201);
    			attr_dev(td1, "align", "center");
    			attr_dev(td1, "class", "svelte-d3ukxe");
    			add_location(td1, file$i, 91, 24, 3432);
    			attr_dev(button0, "class", "detailsBtn svelte-d3ukxe");
    			add_location(button0, file$i, 96, 28, 3688);
    			attr_dev(button1, "class", "deleteBtn svelte-d3ukxe");
    			add_location(button1, file$i, 101, 28, 3931);
    			attr_dev(td2, "align", "right");
    			attr_dev(td2, "class", "actions svelte-d3ukxe");
    			add_location(td2, file$i, 95, 24, 3624);
    			add_location(tr, file$i, 86, 20, 3128);
    			this.first = tr;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, span0);
    			append_dev(span0, t0);
    			append_dev(td0, t1);
    			append_dev(td0, span1);
    			append_dev(span1, t2);
    			append_dev(tr, t3);
    			append_dev(tr, td1);
    			append_dev(td1, t4);
    			append_dev(tr, t5);
    			append_dev(tr, td2);
    			append_dev(td2, button0);
    			append_dev(td2, t7);
    			append_dev(td2, button1);
    			append_dev(tr, t9);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler, false, false, false),
    					listen_dev(button1, "click", click_handler_1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*history*/ 1) && t0_value !== (t0_value = createCurrentDate(/*game*/ ctx[13].dateID) + "")) set_data_dev(t0, t0_value);
    			if ((!current || dirty & /*history*/ 1) && t2_value !== (t2_value = createCurrentTime(/*game*/ ctx[13].dateID) + "")) set_data_dev(t2, t2_value);
    			if ((!current || dirty & /*history*/ 1) && t4_value !== (t4_value = /*game*/ ctx[13].cardsOpened.length + /*game*/ ctx[13].cardsHiddened.length + "")) set_data_dev(t4, t4_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!tr_transition) tr_transition = create_bidirectional_transition(tr, fly, { y: 100, duration: 200 }, true);
    				tr_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!tr_transition) tr_transition = create_bidirectional_transition(tr, fly, { y: 100, duration: 200 }, false);
    			tr_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (detaching && tr_transition) tr_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(86:16) {#each history as game, idx (game.dateID)}",
    		ctx
    	});

    	return block;
    }

    // (80:12) <Table>
    function create_default_slot_4$2(ctx) {
    	let thead;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let th2;
    	let t5;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value_2 = /*history*/ ctx[0];
    	validate_each_argument(each_value_2);
    	const get_key = ctx => /*game*/ ctx[13].dateID;
    	validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		let child_ctx = get_each_context_2(ctx, each_value_2, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			th0 = element("th");
    			th0.textContent = "Дата раздачи";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Карты (шт)";
    			t3 = space();
    			th2 = element("th");
    			th2.textContent = "Действия";
    			t5 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(th0, "align", "left");
    			attr_dev(th0, "class", "svelte-d3ukxe");
    			add_location(th0, file$i, 81, 20, 2877);
    			attr_dev(th1, "align", "center");
    			attr_dev(th1, "class", "svelte-d3ukxe");
    			add_location(th1, file$i, 82, 20, 2933);
    			attr_dev(th2, "align", "right");
    			attr_dev(th2, "class", "svelte-d3ukxe");
    			add_location(th2, file$i, 83, 20, 2989);
    			add_location(thead, file$i, 80, 16, 2848);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, th0);
    			append_dev(thead, t1);
    			append_dev(thead, th1);
    			append_dev(thead, t3);
    			append_dev(thead, th2);
    			insert_dev(target, t5, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*onDeleteGame, history, viewGameDetails, createCurrentTime, createCurrentDate*/ 25) {
    				each_value_2 = /*history*/ ctx[0];
    				validate_each_argument(each_value_2);
    				group_outros();
    				validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_2, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block_2, each_1_anchor, get_each_context_2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t5);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(80:12) <Table>",
    		ctx
    	});

    	return block;
    }

    // (76:4) <Container>
    function create_default_slot_3$4(ctx) {
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$2, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*history*/ ctx[0].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "История игр";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			add_location(h1, file$i, 76, 8, 2739);
    			add_location(hr, file$i, 77, 8, 2769);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t2, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t2);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(76:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (75:0) <Layout>
    function create_default_slot_2$5(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope, history*/ 32769) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(75:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    // (142:20) {:else}
    function create_else_block_1$1(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Вскрытых карт нет";
    			attr_dev(p, "class", "emptyCardsTitle svelte-d3ukxe");
    			add_location(p, file$i, 142, 24, 5564);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1$1.name,
    		type: "else",
    		source: "(142:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (135:20) {#if history[selectedHistoryGameID].cardsOpened.length > 0}
    function create_if_block_1$2(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*history*/ ctx[0][/*selectedHistoryGameID*/ ctx[1]].cardsOpened;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*allCardsList, history, selectedHistoryGameID*/ 3) {
    				each_value_1 = /*history*/ ctx[0][/*selectedHistoryGameID*/ ctx[1]].cardsOpened;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(135:20) {#if history[selectedHistoryGameID].cardsOpened.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (136:24) {#each history[selectedHistoryGameID].cardsOpened as card, idx}
    function create_each_block_1$1(ctx) {
    	let span;
    	let t0_value = /*idx*/ ctx[11] + 1 + "";
    	let t0;
    	let t1;
    	let t2_value = (allCardsList()[/*card*/ ctx[9]]?.name || "Неизвестная роль") + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(". ");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span, "class", "svelte-d3ukxe");
    			add_location(span, file$i, 136, 28, 5301);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(span, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*history, selectedHistoryGameID*/ 3 && t2_value !== (t2_value = (allCardsList()[/*card*/ ctx[9]]?.name || "Неизвестная роль") + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(136:24) {#each history[selectedHistoryGameID].cardsOpened as card, idx}",
    		ctx
    	});

    	return block;
    }

    // (161:20) {:else}
    function create_else_block$3(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Не вскрытых карт нет";
    			attr_dev(p, "class", "emptyCardsTitle svelte-d3ukxe");
    			set_style(p, "padding-bottom", "15px");
    			add_location(p, file$i, 161, 24, 6468);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(161:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (154:20) {#if history[selectedHistoryGameID].cardsHiddened.length > 0}
    function create_if_block$5(ctx) {
    	let each_1_anchor;
    	let each_value = /*history*/ ctx[0][/*selectedHistoryGameID*/ ctx[1]].cardsHiddened;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*allCardsList, history, selectedHistoryGameID*/ 3) {
    				each_value = /*history*/ ctx[0][/*selectedHistoryGameID*/ ctx[1]].cardsHiddened;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(154:20) {#if history[selectedHistoryGameID].cardsHiddened.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (155:24) {#each history[selectedHistoryGameID].cardsHiddened as card, idx}
    function create_each_block$2(ctx) {
    	let span;
    	let t0_value = /*idx*/ ctx[11] + 1 + "";
    	let t0;
    	let t1;
    	let t2_value = (allCardsList()[/*card*/ ctx[9]]?.name || "Неизвестная роль") + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = text(". ");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span, "class", "svelte-d3ukxe");
    			add_location(span, file$i, 155, 28, 6205);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(span, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*history, selectedHistoryGameID*/ 3 && t2_value !== (t2_value = (allCardsList()[/*card*/ ctx[9]]?.name || "Неизвестная роль") + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(155:24) {#each history[selectedHistoryGameID].cardsHiddened as card, idx}",
    		ctx
    	});

    	return block;
    }

    // (127:4) <ModalContainer customStyle="overflow-y: auto; margin: 30px 0px;">
    function create_default_slot_1$7(ctx) {
    	let div4;
    	let div1;
    	let h30;
    	let t1;
    	let div0;
    	let p0;
    	let t3;
    	let t4;
    	let div3;
    	let h31;
    	let t6;
    	let div2;
    	let p1;
    	let t8;

    	function select_block_type_1(ctx, dirty) {
    		if (/*history*/ ctx[0][/*selectedHistoryGameID*/ ctx[1]].cardsOpened.length > 0) return create_if_block_1$2;
    		return create_else_block_1$1;
    	}

    	let current_block_type = select_block_type_1(ctx);
    	let if_block0 = current_block_type(ctx);

    	function select_block_type_2(ctx, dirty) {
    		if (/*history*/ ctx[0][/*selectedHistoryGameID*/ ctx[1]].cardsHiddened.length > 0) return create_if_block$5;
    		return create_else_block$3;
    	}

    	let current_block_type_1 = select_block_type_2(ctx);
    	let if_block1 = current_block_type_1(ctx);

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Вскрытые карты:";
    			t1 = space();
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "В порядке от первой вскрытой к последующим:";
    			t3 = space();
    			if_block0.c();
    			t4 = space();
    			div3 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Не вскрытые карты:";
    			t6 = space();
    			div2 = element("div");
    			p1 = element("p");
    			p1.textContent = "В порядке от первой НЕ вскрытой к последующим:";
    			t8 = space();
    			if_block1.c();
    			add_location(h30, file$i, 129, 16, 4890);
    			attr_dev(p0, "class", "cardsListSubtitle svelte-d3ukxe");
    			add_location(p0, file$i, 131, 20, 4977);
    			attr_dev(div0, "class", "cardsList svelte-d3ukxe");
    			add_location(div0, file$i, 130, 16, 4932);
    			attr_dev(div1, "class", "cardsDetails");
    			add_location(div1, file$i, 128, 12, 4846);
    			attr_dev(h31, "class", "hiddenedCardsTitle svelte-d3ukxe");
    			add_location(h31, file$i, 148, 16, 5743);
    			attr_dev(p1, "class", "cardsListSubtitle svelte-d3ukxe");
    			add_location(p1, file$i, 150, 20, 5874);
    			attr_dev(div2, "class", "cardsList hiddenedCards svelte-d3ukxe");
    			add_location(div2, file$i, 149, 16, 5815);
    			attr_dev(div3, "class", "cardsDetails");
    			add_location(div3, file$i, 147, 12, 5699);
    			attr_dev(div4, "class", "detailsArea svelte-d3ukxe");
    			add_location(div4, file$i, 127, 8, 4807);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div1);
    			append_dev(div1, h30);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			if_block0.m(div0, null);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, h31);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, p1);
    			append_dev(div2, t8);
    			if_block1.m(div2, null);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(div0, null);
    				}
    			}

    			if (current_block_type_1 === (current_block_type_1 = select_block_type_2(ctx)) && if_block1) {
    				if_block1.p(ctx, dirty);
    			} else {
    				if_block1.d(1);
    				if_block1 = current_block_type_1(ctx);

    				if (if_block1) {
    					if_block1.c();
    					if_block1.m(div2, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if_block0.d();
    			if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(127:4) <ModalContainer customStyle=\\\"overflow-y: auto; margin: 30px 0px;\\\">",
    		ctx
    	});

    	return block;
    }

    // (123:0) <Modal      showFlag={viewDetailsModalFlag}      clickEvent={() => (viewDetailsModalFlag = false)}  >
    function create_default_slot$c(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				customStyle: "overflow-y: auto; margin: 30px 0px;",
    				$$slots: { default: [create_default_slot_1$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, history, selectedHistoryGameID*/ 32771) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$c.name,
    		type: "slot",
    		source: "(123:0) <Modal      showFlag={viewDetailsModalFlag}      clickEvent={() => (viewDetailsModalFlag = false)}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$j(ctx) {
    	let layout;
    	let t;
    	let modal;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot_2$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	modal = new Modal({
    			props: {
    				showFlag: /*viewDetailsModalFlag*/ ctx[2],
    				clickEvent: /*func_1*/ ctx[8],
    				$$slots: { default: [create_default_slot$c] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    			t = space();
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, history*/ 32769) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    			const modal_changes = {};
    			if (dirty & /*viewDetailsModalFlag*/ 4) modal_changes.showFlag = /*viewDetailsModalFlag*/ ctx[2];
    			if (dirty & /*viewDetailsModalFlag*/ 4) modal_changes.clickEvent = /*func_1*/ ctx[8];

    			if (dirty & /*$$scope, history, selectedHistoryGameID*/ 32771) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function createCurrentDate(unixDate) {
    	let today = new Date(unixDate * 1000);
    	const yyyy = today.getFullYear();
    	let mm = today.getMonth() + 1;
    	let dd = today.getDate();
    	if (dd < 10) dd = "0" + dd;
    	if (mm < 10) mm = "0" + mm;
    	today = dd + "." + mm + "." + yyyy;
    	return today;
    }

    //Преобразовать UNIX время в время формата: ЧЧ:ММ
    function createCurrentTime(unixDate) {
    	let today = new Date(unixDate * 1000);
    	today = String(today.getHours()).padStart(2, "0") + ":" + String(today.getMinutes()).padStart(2, "0");
    	return today;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HistoryDistribution', slots, []);

    	onMount(() => {
    		window.scrollTo(0, 0);
    	});

    	//Хранилище всех (100 последних) раздач
    	let history = JSON.parse(localStorage.getItem("history")) || [];

    	//Удалить игру из истории раздач по её индексу
    	function onDeleteGame(idx) {
    		let deleteGameInfo = createCurrentDate(history[idx].dateID) + " " + createCurrentTime(history[idx].dateID);
    		history.splice(idx, 1);
    		localStorage.setItem("history", JSON.stringify(history));

    		if (history.length === 0) {
    			localStorage.removeItem("history");
    			$$invalidate(0, history = []);
    		} else {
    			$$invalidate(0, history = JSON.parse(localStorage.getItem("history")));
    		}

    		notificationStore.createNotification("Оповещение", `Информация о раздаче с датой и временем: '${deleteGameInfo}' успешно удалена.`);
    	}

    	//Переменная, хранящяя ID текущей игры (нужно, чтобы модалка по клику на "подробнее" знала, у какой игры брать данные)
    	let selectedHistoryGameID = 0;

    	//Переменная и функция для показа/скрытия меню "подробнее" для игры
    	let viewDetailsModalFlag = false;

    	function viewGameDetails(gameID) {
    		$$invalidate(1, selectedHistoryGameID = gameID);
    		$$invalidate(2, viewDetailsModalFlag = true);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HistoryDistribution> was created with unknown prop '${key}'`);
    	});

    	const click_handler = idx => viewGameDetails(idx);
    	const click_handler_1 = idx => onDeleteGame(idx);
    	const func = () => navigateTo("home");
    	const func_1 = () => $$invalidate(2, viewDetailsModalFlag = false);

    	$$self.$capture_state = () => ({
    		Container,
    		Layout,
    		Table,
    		fly,
    		Button,
    		navigateTo,
    		Modal,
    		ModalContainer,
    		allCardsList,
    		onMount,
    		notificationStore,
    		history,
    		createCurrentDate,
    		createCurrentTime,
    		onDeleteGame,
    		selectedHistoryGameID,
    		viewDetailsModalFlag,
    		viewGameDetails
    	});

    	$$self.$inject_state = $$props => {
    		if ('history' in $$props) $$invalidate(0, history = $$props.history);
    		if ('selectedHistoryGameID' in $$props) $$invalidate(1, selectedHistoryGameID = $$props.selectedHistoryGameID);
    		if ('viewDetailsModalFlag' in $$props) $$invalidate(2, viewDetailsModalFlag = $$props.viewDetailsModalFlag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		history,
    		selectedHistoryGameID,
    		viewDetailsModalFlag,
    		onDeleteGame,
    		viewGameDetails,
    		click_handler,
    		click_handler_1,
    		func,
    		func_1
    	];
    }

    class HistoryDistribution extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HistoryDistribution",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src\pages\SettingsPage\Setting.svelte generated by Svelte v3.48.0 */

    const file$h = "src\\pages\\SettingsPage\\Setting.svelte";

    function create_fragment$i(ctx) {
    	let div;
    	let t;
    	let hr;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			t = space();
    			hr = element("hr");
    			attr_dev(hr, "class", "settingSeparator svelte-1pe9hve");
    			add_location(hr, file$h, 2, 4, 41);
    			attr_dev(div, "class", "setting svelte-1pe9hve");
    			add_location(div, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			append_dev(div, t);
    			append_dev(div, hr);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Setting', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Setting> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Setting extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Setting",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    /* src\components\Textarea.svelte generated by Svelte v3.48.0 */

    const file$g = "src\\components\\Textarea.svelte";

    function create_fragment$h(ctx) {
    	let textarea;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			textarea = element("textarea");
    			attr_dev(textarea, "type", /*type*/ ctx[4]);
    			attr_dev(textarea, "placeholder", /*placeholder*/ ctx[5]);
    			textarea.value = /*value*/ ctx[1];
    			attr_dev(textarea, "rows", /*rows*/ ctx[6]);
    			attr_dev(textarea, "id", /*id*/ ctx[3]);
    			attr_dev(textarea, "style", /*style*/ ctx[0]);
    			attr_dev(textarea, "class", "svelte-1megsgq");
    			add_location(textarea, file$g, 10, 0, 164);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, textarea, anchor);

    			if (!mounted) {
    				dispose = listen_dev(
    					textarea,
    					"input",
    					function () {
    						if (is_function(/*onChange*/ ctx[2])) /*onChange*/ ctx[2].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*type*/ 16) {
    				attr_dev(textarea, "type", /*type*/ ctx[4]);
    			}

    			if (dirty & /*placeholder*/ 32) {
    				attr_dev(textarea, "placeholder", /*placeholder*/ ctx[5]);
    			}

    			if (dirty & /*value*/ 2) {
    				prop_dev(textarea, "value", /*value*/ ctx[1]);
    			}

    			if (dirty & /*rows*/ 64) {
    				attr_dev(textarea, "rows", /*rows*/ ctx[6]);
    			}

    			if (dirty & /*id*/ 8) {
    				attr_dev(textarea, "id", /*id*/ ctx[3]);
    			}

    			if (dirty & /*style*/ 1) {
    				attr_dev(textarea, "style", /*style*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(textarea);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Textarea', slots, []);
    	let { style, value, onChange, id, type = "text", placeholder = "", rows = 3 } = $$props;
    	const writable_props = ['style', 'value', 'onChange', 'id', 'type', 'placeholder', 'rows'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Textarea> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('onChange' in $$props) $$invalidate(2, onChange = $$props.onChange);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(5, placeholder = $$props.placeholder);
    		if ('rows' in $$props) $$invalidate(6, rows = $$props.rows);
    	};

    	$$self.$capture_state = () => ({
    		style,
    		value,
    		onChange,
    		id,
    		type,
    		placeholder,
    		rows
    	});

    	$$self.$inject_state = $$props => {
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('value' in $$props) $$invalidate(1, value = $$props.value);
    		if ('onChange' in $$props) $$invalidate(2, onChange = $$props.onChange);
    		if ('id' in $$props) $$invalidate(3, id = $$props.id);
    		if ('type' in $$props) $$invalidate(4, type = $$props.type);
    		if ('placeholder' in $$props) $$invalidate(5, placeholder = $$props.placeholder);
    		if ('rows' in $$props) $$invalidate(6, rows = $$props.rows);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [style, value, onChange, id, type, placeholder, rows];
    }

    class Textarea extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			style: 0,
    			value: 1,
    			onChange: 2,
    			id: 3,
    			type: 4,
    			placeholder: 5,
    			rows: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Textarea",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*style*/ ctx[0] === undefined && !('style' in props)) {
    			console.warn("<Textarea> was created without expected prop 'style'");
    		}

    		if (/*value*/ ctx[1] === undefined && !('value' in props)) {
    			console.warn("<Textarea> was created without expected prop 'value'");
    		}

    		if (/*onChange*/ ctx[2] === undefined && !('onChange' in props)) {
    			console.warn("<Textarea> was created without expected prop 'onChange'");
    		}

    		if (/*id*/ ctx[3] === undefined && !('id' in props)) {
    			console.warn("<Textarea> was created without expected prop 'id'");
    		}
    	}

    	get style() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onChange() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onChange(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get id() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get placeholder() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set placeholder(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get rows() {
    		throw new Error("<Textarea>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rows(value) {
    		throw new Error("<Textarea>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Dropdown.svelte generated by Svelte v3.48.0 */
    const file$f = "src\\components\\Dropdown.svelte";

    // (23:4) <Transition          {showFlag}          mountClass="dropdownOpened"          unmountClass="dropdownClosed"          unmountDuration={400}      >
    function create_default_slot$b(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "details svelte-1sepnmp");
    			add_location(div, file$f, 28, 8, 714);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$b.name,
    		type: "slot",
    		source: "(23:4) <Transition          {showFlag}          mountClass=\\\"dropdownOpened\\\"          unmountClass=\\\"dropdownClosed\\\"          unmountDuration={400}      >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t0;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let transition;
    	let current;
    	let mounted;
    	let dispose;

    	transition = new Transition({
    			props: {
    				showFlag: /*showFlag*/ ctx[2],
    				mountClass: "dropdownOpened",
    				unmountClass: "dropdownClosed",
    				unmountDuration: 400,
    				$$slots: { default: [create_default_slot$b] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			create_component(transition.$$.fragment);
    			attr_dev(h2, "class", "svelte-1sepnmp");
    			add_location(h2, file$f, 11, 8, 260);
    			attr_dev(img, "class", "arrowBtn svelte-1sepnmp");
    			if (!src_url_equal(img.src, img_src_value = "assets/arrow.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Стрелка показа подробного инфо");
    			toggle_class(img, "opened", /*showFlag*/ ctx[2]);
    			add_location(img, file$f, 12, 8, 286);
    			attr_dev(div0, "class", "preview svelte-1sepnmp");
    			add_location(div0, file$f, 10, 4, 229);
    			attr_dev(div1, "class", "dropdown svelte-1sepnmp");
    			attr_dev(div1, "style", /*style*/ ctx[1]);
    			add_location(div1, file$f, 9, 0, 193);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(h2, t0);
    			append_dev(div0, t1);
    			append_dev(div0, img);
    			append_dev(div1, t2);
    			mount_component(transition, div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(img, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);

    			if (dirty & /*showFlag*/ 4) {
    				toggle_class(img, "opened", /*showFlag*/ ctx[2]);
    			}

    			const transition_changes = {};
    			if (dirty & /*showFlag*/ 4) transition_changes.showFlag = /*showFlag*/ ctx[2];

    			if (dirty & /*$$scope*/ 32) {
    				transition_changes.$$scope = { dirty, ctx };
    			}

    			transition.$set(transition_changes);

    			if (!current || dirty & /*style*/ 2) {
    				attr_dev(div1, "style", /*style*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(transition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(transition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(transition);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Dropdown', slots, ['default']);
    	let { title = "", style = "" } = $$props;
    	let showFlag = false;
    	const writable_props = ['title', 'style'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Dropdown> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(2, showFlag = !showFlag);
    	};

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		Transition,
    		title,
    		style,
    		showFlag
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('showFlag' in $$props) $$invalidate(2, showFlag = $$props.showFlag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, style, showFlag, slots, click_handler, $$scope];
    }

    class Dropdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, { title: 0, style: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Dropdown",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get title() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Dropdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Dropdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\SettingsPage\SettingsList\CustomRoles.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1$1 } = globals;
    const file$e = "src\\pages\\SettingsPage\\SettingsList\\CustomRoles.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[17] = list[i];
    	child_ctx[19] = i;
    	return child_ctx;
    }

    // (142:4) {:else}
    function create_else_block$2(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "В приложение не добавлено ещё ни одной пользовательской роли";
    			set_style(span, "margin-top", "15px");
    			set_style(span, "margin-bottom", "10px");
    			add_location(span, file$e, 142, 8, 5236);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(142:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (104:4) {#if customRoles.length > 0}
    function create_if_block$4(ctx) {
    	let table;
    	let t;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;

    	table = new Table({
    			props: {
    				style: "margin-top: 20px;",
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value = /*customRoles*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*role*/ ctx[17][0];
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);

    			if (dirty & /*customRoles, changeIconParams, onChangeDescriptionRole, onDeleteCustomRole*/ 53) {
    				each_value = /*customRoles*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    			if (detaching) detach_dev(t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(104:4) {#if customRoles.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (105:8) <Table style="margin-top: 20px;">
    function create_default_slot_10(ctx) {
    	let thead;
    	let th0;
    	let t1;
    	let th1;

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			th0 = element("th");
    			th0.textContent = "Название карты";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Действия";
    			attr_dev(th0, "align", "left");
    			attr_dev(th0, "class", "svelte-12j0lim");
    			add_location(th0, file$e, 106, 16, 3861);
    			attr_dev(th1, "align", "right");
    			attr_dev(th1, "class", "svelte-12j0lim");
    			add_location(th1, file$e, 107, 16, 3915);
    			add_location(thead, file$e, 105, 12, 3836);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, th0);
    			append_dev(thead, t1);
    			append_dev(thead, th1);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(105:8) <Table style=\\\"margin-top: 20px;\\\">",
    		ctx
    	});

    	return block;
    }

    // (112:12) <Dropdown title={role[1].name}>
    function create_default_slot_9(ctx) {
    	let div;
    	let button0;
    	let t1;
    	let button1;
    	let t3;
    	let button2;
    	let t5;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[8](/*role*/ ctx[17]);
    	}

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[9](/*role*/ ctx[17]);
    	}

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[10](/*role*/ ctx[17]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			button0 = element("button");
    			button0.textContent = "Удалить";
    			t1 = space();
    			button1 = element("button");
    			button1.textContent = "Изменить описание";
    			t3 = space();
    			button2 = element("button");
    			button2.textContent = "Изменить иконку";
    			t5 = space();
    			attr_dev(button0, "class", "customRolesDeleteBtn svelte-12j0lim");
    			add_location(button0, file$e, 113, 20, 4154);
    			attr_dev(button1, "class", "customRolesChangeDescBtn svelte-12j0lim");
    			add_location(button1, file$e, 119, 20, 4394);
    			attr_dev(button2, "class", "customRolesChangeIconBtn svelte-12j0lim");
    			add_location(button2, file$e, 127, 20, 4712);
    			attr_dev(div, "class", "customRoleButtons svelte-12j0lim");
    			add_location(div, file$e, 112, 16, 4101);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button0);
    			append_dev(div, t1);
    			append_dev(div, button1);
    			append_dev(div, t3);
    			append_dev(div, button2);
    			insert_dev(target, t5, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler, false, false, false),
    					listen_dev(button1, "click", click_handler_1, false, false, false),
    					listen_dev(button2, "click", click_handler_2, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(112:12) <Dropdown title={role[1].name}>",
    		ctx
    	});

    	return block;
    }

    // (111:8) {#each customRoles as role, idx (role[0])}
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let dropdown;
    	let current;

    	dropdown = new Dropdown({
    			props: {
    				title: /*role*/ ctx[17][1].name,
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(dropdown.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(dropdown, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const dropdown_changes = {};
    			if (dirty & /*customRoles*/ 1) dropdown_changes.title = /*role*/ ctx[17][1].name;

    			if (dirty & /*$$scope, changeIconParams, customRoles*/ 1048581) {
    				dropdown_changes.$$scope = { dirty, ctx };
    			}

    			dropdown.$set(dropdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(dropdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(dropdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(dropdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(111:8) {#each customRoles as role, idx (role[0])}",
    		ctx
    	});

    	return block;
    }

    // (98:0) <Setting>
    function create_default_slot_8(ctx) {
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$4, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*customRoles*/ ctx[0].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Пользовательские роли:";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Эта настройка позволяет взаимодействовать с параметрами ролей, которые\r\n        ведущий добавил в приложение самостоятельно.";
    			t3 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			add_location(h2, file$e, 98, 4, 3561);
    			add_location(p, file$e, 99, 4, 3598);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p, anchor);
    			insert_dev(target, t3, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t3);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(98:0) <Setting>",
    		ctx
    	});

    	return block;
    }

    // (160:12) <Button clickEvent={onSaveDescription} style="font-size: 1rem;"                  >
    function create_default_slot_7(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Сохранить");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(160:12) <Button clickEvent={onSaveDescription} style=\\\"font-size: 1rem;\\\"                  >",
    		ctx
    	});

    	return block;
    }

    // (163:12) <Button                  clickEvent={() => {                      changeDescriptionParams.viewFlag = false;                  }}                  style="font-size: 1rem;"                  color="secondary">
    function create_default_slot_6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Назад");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(163:12) <Button                  clickEvent={() => {                      changeDescriptionParams.viewFlag = false;                  }}                  style=\\\"font-size: 1rem;\\\"                  color=\\\"secondary\\\">",
    		ctx
    	});

    	return block;
    }

    // (150:4) <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
    function create_default_slot_5(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let textarea;
    	let t2;
    	let button0;
    	let t3;
    	let button1;
    	let t4;
    	let span;
    	let t5;
    	let span_class_value;
    	let current;

    	textarea = new Textarea({
    			props: {
    				rows: "5",
    				value: /*changeDescriptionParams*/ ctx[1].inputValue,
    				onChange: /*func*/ ctx[11],
    				style: "margin-bottom: 15px;"
    			},
    			$$inline: true
    		});

    	button0 = new Button({
    			props: {
    				clickEvent: /*onSaveDescription*/ ctx[6],
    				style: "font-size: 1rem;",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				clickEvent: /*func_1*/ ctx[12],
    				style: "font-size: 1rem;",
    				color: "secondary",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Изменить описание";
    			t1 = space();
    			create_component(textarea.$$.fragment);
    			t2 = space();
    			create_component(button0.$$.fragment);
    			t3 = space();
    			create_component(button1.$$.fragment);
    			t4 = space();
    			span = element("span");
    			t5 = text("Описание должно иметь не менее 1 и не более 255 символов.");
    			attr_dev(h2, "class", "settingTitle svelte-12j0lim");
    			add_location(h2, file$e, 151, 12, 5576);
    			attr_dev(div, "class", "modalArea buttons");
    			add_location(div, file$e, 150, 8, 5531);
    			attr_dev(span, "class", span_class_value = "modalError " + (/*changeDescriptionParams*/ ctx[1].inputValue.length === 0 && /*changeDescriptionParams*/ ctx[1].inputValue.length > 255 && 'modalShow') + " svelte-12j0lim");
    			add_location(span, file$e, 170, 8, 6305);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			mount_component(textarea, div, null);
    			append_dev(div, t2);
    			mount_component(button0, div, null);
    			append_dev(div, t3);
    			mount_component(button1, div, null);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, span, anchor);
    			append_dev(span, t5);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textarea_changes = {};
    			if (dirty & /*changeDescriptionParams*/ 2) textarea_changes.value = /*changeDescriptionParams*/ ctx[1].inputValue;
    			if (dirty & /*changeDescriptionParams*/ 2) textarea_changes.onChange = /*func*/ ctx[11];
    			textarea.$set(textarea_changes);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*changeDescriptionParams*/ 2) button1_changes.clickEvent = /*func_1*/ ctx[12];

    			if (dirty & /*$$scope*/ 1048576) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);

    			if (!current || dirty & /*changeDescriptionParams*/ 2 && span_class_value !== (span_class_value = "modalError " + (/*changeDescriptionParams*/ ctx[1].inputValue.length === 0 && /*changeDescriptionParams*/ ctx[1].inputValue.length > 255 && 'modalShow') + " svelte-12j0lim")) {
    				attr_dev(span, "class", span_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(textarea);
    			destroy_component(button0);
    			destroy_component(button1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(150:4) <ModalContainer customStyle=\\\"padding: 5px 30px 25px 30px;\\\">",
    		ctx
    	});

    	return block;
    }

    // (149:0) <Modal showFlag={changeDescriptionParams.viewFlag}>
    function create_default_slot_4$1(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				customStyle: "padding: 5px 30px 25px 30px;",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, changeDescriptionParams*/ 1048578) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(149:0) <Modal showFlag={changeDescriptionParams.viewFlag}>",
    		ctx
    	});

    	return block;
    }

    // (211:16) <Button clickEvent={onSaveIcon} style="font-size: 1rem;"                      >
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Сохранить");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(211:16) <Button clickEvent={onSaveIcon} style=\\\"font-size: 1rem;\\\"                      >",
    		ctx
    	});

    	return block;
    }

    // (214:16) <Button                      clickEvent={() => {                          changeIconParams.viewFlag = false;                      }}                      style="font-size: 1rem;"                      color="secondary">
    function create_default_slot_2$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Назад");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(214:16) <Button                      clickEvent={() => {                          changeIconParams.viewFlag = false;                      }}                      style=\\\"font-size: 1rem;\\\"                      color=\\\"secondary\\\">",
    		ctx
    	});

    	return block;
    }

    // (183:4) <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
    function create_default_slot_1$6(ctx) {
    	let div3;
    	let h2;
    	let t1;
    	let div1;
    	let input;
    	let t2;
    	let div0;
    	let button0;
    	let span0;
    	let t4_value = (/*changeIconParams*/ ctx[2].file?.name || "Не выбран") + "";
    	let t4;
    	let t5;
    	let div2;
    	let button1;
    	let t6;
    	let button2;
    	let t7;
    	let span1;
    	let t8;
    	let span1_class_value;
    	let current;
    	let mounted;
    	let dispose;

    	button1 = new Button({
    			props: {
    				clickEvent: /*onSaveIcon*/ ctx[7],
    				style: "font-size: 1rem;",
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button({
    			props: {
    				clickEvent: /*func_2*/ ctx[16],
    				style: "font-size: 1rem;",
    				color: "secondary",
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Изменить иконку";
    			t1 = space();
    			div1 = element("div");
    			input = element("input");
    			t2 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Выбрать файл";
    			span0 = element("span");
    			t4 = text(t4_value);
    			t5 = space();
    			div2 = element("div");
    			create_component(button1.$$.fragment);
    			t6 = space();
    			create_component(button2.$$.fragment);
    			t7 = space();
    			span1 = element("span");
    			t8 = text("Картинка не выбрана или превышает размер в 3 мегабайта.");
    			attr_dev(h2, "class", "settingTitle svelte-12j0lim");
    			add_location(h2, file$e, 184, 12, 6816);
    			set_style(input, "display", "none");
    			set_style(input, "margin", "0");
    			attr_dev(input, "type", "file");
    			attr_dev(input, "accept", "image/*");
    			add_location(input, file$e, 187, 16, 6900);
    			attr_dev(button0, "class", "selectIconBtn svelte-12j0lim");
    			add_location(button0, file$e, 200, 20, 7432);
    			attr_dev(span0, "class", "selectedIconFilename svelte-12j0lim");
    			add_location(span0, file$e, 204, 21, 7621);
    			attr_dev(div0, "class", "fileInputArea svelte-12j0lim");
    			add_location(div0, file$e, 199, 16, 7383);
    			attr_dev(div1, "class", "svelte-12j0lim");
    			add_location(div1, file$e, 186, 12, 6877);
    			attr_dev(div2, "class", "buttons svelte-12j0lim");
    			add_location(div2, file$e, 209, 12, 7813);
    			attr_dev(div3, "class", "modalArea changeIconArea svelte-12j0lim");
    			add_location(div3, file$e, 183, 8, 6764);
    			attr_dev(span1, "class", span1_class_value = "modalError " + (/*changeIconParams*/ ctx[2].errorFlag && 'modalShow') + " svelte-12j0lim");
    			add_location(span1, file$e, 222, 8, 8281);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h2);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, input);
    			/*input_binding*/ ctx[13](input);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, span0);
    			append_dev(span0, t4);
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			mount_component(button1, div2, null);
    			append_dev(div2, t6);
    			mount_component(button2, div2, null);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, span1, anchor);
    			append_dev(span1, t8);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_handler*/ ctx[14], false, false, false),
    					listen_dev(button0, "click", /*click_handler_3*/ ctx[15], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*changeIconParams*/ 4) && t4_value !== (t4_value = (/*changeIconParams*/ ctx[2].file?.name || "Не выбран") + "")) set_data_dev(t4, t4_value);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};
    			if (dirty & /*changeIconParams*/ 4) button2_changes.clickEvent = /*func_2*/ ctx[16];

    			if (dirty & /*$$scope*/ 1048576) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);

    			if (!current || dirty & /*changeIconParams*/ 4 && span1_class_value !== (span1_class_value = "modalError " + (/*changeIconParams*/ ctx[2].errorFlag && 'modalShow') + " svelte-12j0lim")) {
    				attr_dev(span1, "class", span1_class_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			/*input_binding*/ ctx[13](null);
    			destroy_component(button1);
    			destroy_component(button2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(span1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(183:4) <ModalContainer customStyle=\\\"padding: 5px 30px 25px 30px;\\\">",
    		ctx
    	});

    	return block;
    }

    // (182:0) <Modal showFlag={changeIconParams.viewFlag}>
    function create_default_slot$a(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				customStyle: "padding: 5px 30px 25px 30px;",
    				$$slots: { default: [create_default_slot_1$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, changeIconParams, selectIconNode*/ 1048588) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$a.name,
    		type: "slot",
    		source: "(182:0) <Modal showFlag={changeIconParams.viewFlag}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let setting;
    	let t0;
    	let modal0;
    	let t1;
    	let modal1;
    	let current;

    	setting = new Setting({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	modal0 = new Modal({
    			props: {
    				showFlag: /*changeDescriptionParams*/ ctx[1].viewFlag,
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	modal1 = new Modal({
    			props: {
    				showFlag: /*changeIconParams*/ ctx[2].viewFlag,
    				$$slots: { default: [create_default_slot$a] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(setting.$$.fragment);
    			t0 = space();
    			create_component(modal0.$$.fragment);
    			t1 = space();
    			create_component(modal1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(modal0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(modal1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const setting_changes = {};

    			if (dirty & /*$$scope, customRoles, changeIconParams*/ 1048581) {
    				setting_changes.$$scope = { dirty, ctx };
    			}

    			setting.$set(setting_changes);
    			const modal0_changes = {};
    			if (dirty & /*changeDescriptionParams*/ 2) modal0_changes.showFlag = /*changeDescriptionParams*/ ctx[1].viewFlag;

    			if (dirty & /*$$scope, changeDescriptionParams*/ 1048578) {
    				modal0_changes.$$scope = { dirty, ctx };
    			}

    			modal0.$set(modal0_changes);
    			const modal1_changes = {};
    			if (dirty & /*changeIconParams*/ 4) modal1_changes.showFlag = /*changeIconParams*/ ctx[2].viewFlag;

    			if (dirty & /*$$scope, changeIconParams, selectIconNode*/ 1048588) {
    				modal1_changes.$$scope = { dirty, ctx };
    			}

    			modal1.$set(modal1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting.$$.fragment, local);
    			transition_in(modal0.$$.fragment, local);
    			transition_in(modal1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting.$$.fragment, local);
    			transition_out(modal0.$$.fragment, local);
    			transition_out(modal1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(modal0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(modal1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CustomRoles', slots, []);
    	let customRoles = [];
    	let changeDescriptionParams = { viewFlag: false, inputValue: "", key: "" }; // Модалка изменения описания кастом роли (флаг показа, строка с описанием роли, ключ роли)

    	let changeIconParams = {
    		viewFlag: false,
    		file: null,
    		key: "",
    		errorFlag: false
    	}; // Модалка изменения иконки кастом роли (флаг показа, файл иконки, ключ роли)

    	let selectIconNode = null; //DOM элемент с нодой input file для выбора иконки роли

    	onMount(() => {
    		if (localStorage.getItem("customRoles") !== null) {
    			$$invalidate(0, customRoles = Object.entries(JSON.parse(localStorage.getItem("customRoles"))));
    		}
    	});

    	function onDeleteCustomRole(key) {
    		if (localStorage.getItem("customRoles") === null) {
    			return;
    		}

    		let rolesList = JSON.parse(localStorage.getItem("customRoles"));
    		delete rolesList[key];
    		localStorage.setItem("customRoles", JSON.stringify(rolesList));
    		$$invalidate(0, customRoles = Object.entries(rolesList));
    	}

    	function onChangeDescriptionRole(key) {
    		$$invalidate(1, changeDescriptionParams.viewFlag = true, changeDescriptionParams);

    		if (localStorage.getItem("customRoles") !== null) {
    			let roles = JSON.parse(localStorage.getItem("customRoles"));
    			$$invalidate(1, changeDescriptionParams.inputValue = String(roles[key].description), changeDescriptionParams);
    		} else {
    			$$invalidate(1, changeDescriptionParams.inputValue = "", changeDescriptionParams);
    		}

    		$$invalidate(1, changeDescriptionParams.key = key, changeDescriptionParams);
    	}

    	function onSaveDescription() {
    		let roles = JSON.parse(localStorage.getItem("customRoles"));

    		if (roles[changeDescriptionParams.key].description !== changeDescriptionParams.inputValue) {
    			roles[changeDescriptionParams.key].description = changeDescriptionParams.inputValue;
    			localStorage.setItem("customRoles", JSON.stringify(roles));
    			$$invalidate(1, changeDescriptionParams.viewFlag = false, changeDescriptionParams);
    			notificationStore.createNotification("Оповещение", "Описание для роли успешно изменено");
    		} else {
    			$$invalidate(1, changeDescriptionParams.viewFlag = false, changeDescriptionParams);
    		}
    	}

    	function onSaveIcon() {
    		if (changeIconParams.file === null || changeIconParams?.file?.size / 1024 ** 2 > 3) {
    			$$invalidate(2, changeIconParams.errorFlag = true, changeIconParams);
    		} else {
    			settingsStore.saveCustomIcon(changeIconParams.key, changeIconParams.file);

    			$$invalidate(2, changeIconParams = {
    				viewFlag: false,
    				file: null,
    				key: "",
    				errorFlag: false
    			});
    		}
    	}

    	const writable_props = [];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CustomRoles> was created with unknown prop '${key}'`);
    	});

    	const click_handler = role => onDeleteCustomRole(role[0]);

    	const click_handler_1 = role => {
    		onChangeDescriptionRole(role[0]);
    	};

    	const click_handler_2 = role => $$invalidate(2, changeIconParams = {
    		...changeIconParams,
    		key: role[0],
    		viewFlag: true
    	});

    	const func = e => $$invalidate(1, changeDescriptionParams.inputValue = e.target.value, changeDescriptionParams);

    	const func_1 = () => {
    		$$invalidate(1, changeDescriptionParams.viewFlag = false, changeDescriptionParams);
    	};

    	function input_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			selectIconNode = $$value;
    			$$invalidate(3, selectIconNode);
    		});
    	}

    	const input_handler = e => $$invalidate(2, changeIconParams = {
    		...changeIconParams,
    		file: e.target.files[0],
    		errorFlag: false
    	});

    	const click_handler_3 = () => selectIconNode.click();

    	const func_2 = () => {
    		$$invalidate(2, changeIconParams.viewFlag = false, changeIconParams);
    	};

    	$$self.$capture_state = () => ({
    		Table,
    		Setting,
    		fly,
    		onMount,
    		Modal,
    		ModalContainer,
    		Button,
    		Textarea,
    		settingsStore,
    		notificationStore,
    		Dropdown,
    		customRoles,
    		changeDescriptionParams,
    		changeIconParams,
    		selectIconNode,
    		onDeleteCustomRole,
    		onChangeDescriptionRole,
    		onSaveDescription,
    		onSaveIcon
    	});

    	$$self.$inject_state = $$props => {
    		if ('customRoles' in $$props) $$invalidate(0, customRoles = $$props.customRoles);
    		if ('changeDescriptionParams' in $$props) $$invalidate(1, changeDescriptionParams = $$props.changeDescriptionParams);
    		if ('changeIconParams' in $$props) $$invalidate(2, changeIconParams = $$props.changeIconParams);
    		if ('selectIconNode' in $$props) $$invalidate(3, selectIconNode = $$props.selectIconNode);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		customRoles,
    		changeDescriptionParams,
    		changeIconParams,
    		selectIconNode,
    		onDeleteCustomRole,
    		onChangeDescriptionRole,
    		onSaveDescription,
    		onSaveIcon,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		func,
    		func_1,
    		input_binding,
    		input_handler,
    		click_handler_3,
    		func_2
    	];
    }

    class CustomRoles extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CustomRoles",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* src\pages\SettingsPage\SettingsList\DeathZoneSwipes.svelte generated by Svelte v3.48.0 */
    const file$d = "src\\pages\\SettingsPage\\SettingsList\\DeathZoneSwipes.svelte";

    // (6:0) <Setting>
    function create_default_slot$9(ctx) {
    	let h2;
    	let t1;
    	let div;
    	let input;
    	let input_value_value;
    	let t2;
    	let span;
    	let t3_value = /*$settingsStore*/ ctx[0].deathZoneSwipe + "";
    	let t3;
    	let t4;
    	let p;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Мертвая зона свайпов:";
    			t1 = space();
    			div = element("div");
    			input = element("input");
    			t2 = space();
    			span = element("span");
    			t3 = text(t3_value);
    			t4 = space();
    			p = element("p");
    			p.textContent = "\"Мертвая зона\" указывает на то, насколько далеко вы должны проводить\r\n        пальцем по экрану, чтобы вызвать\\скрыть меню (значение указывается в\r\n        процентах от ширины вашего экрана)";
    			add_location(h2, file$d, 6, 4, 149);
    			attr_dev(input, "id", "deathZoneSwipesInput");
    			attr_dev(input, "type", "range");
    			attr_dev(input, "max", "90");
    			attr_dev(input, "min", "5");
    			input.value = input_value_value = /*$settingsStore*/ ctx[0].deathZoneSwipe;
    			attr_dev(input, "class", "svelte-mczdso");
    			add_location(input, file$d, 8, 8, 237);
    			attr_dev(span, "class", "svelte-mczdso");
    			add_location(span, file$d, 16, 8, 495);
    			attr_dev(div, "class", "deathZoneSettinSelectedValue svelte-mczdso");
    			add_location(div, file$d, 7, 4, 185);
    			attr_dev(p, "class", "mt-10 svelte-mczdso");
    			add_location(p, file$d, 18, 4, 557);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			append_dev(div, t2);
    			append_dev(div, span);
    			append_dev(span, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_handler*/ ctx[1], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$settingsStore*/ 1 && input_value_value !== (input_value_value = /*$settingsStore*/ ctx[0].deathZoneSwipe)) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (dirty & /*$settingsStore*/ 1 && t3_value !== (t3_value = /*$settingsStore*/ ctx[0].deathZoneSwipe + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$9.name,
    		type: "slot",
    		source: "(6:0) <Setting>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let setting;
    	let current;

    	setting = new Setting({
    			props: {
    				$$slots: { default: [create_default_slot$9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(setting.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const setting_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 5) {
    				setting_changes.$$scope = { dirty, ctx };
    			}

    			setting.$set(setting_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DeathZoneSwipes', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DeathZoneSwipes> was created with unknown prop '${key}'`);
    	});

    	const input_handler = e => settingsStore.onChangeDeathZoneSwipe(e);
    	$$self.$capture_state = () => ({ Setting, settingsStore, $settingsStore });
    	return [$settingsStore, input_handler];
    }

    class DeathZoneSwipes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DeathZoneSwipes",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src\pages\SettingsPage\SettingsList\DisableTransitions.svelte generated by Svelte v3.48.0 */
    const file$c = "src\\pages\\SettingsPage\\SettingsList\\DisableTransitions.svelte";

    // (28:8) {:else}
    function create_else_block$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("ВКЛЮЧЕНЫ");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(28:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {#if $settingsStore.disableAnimationsFlag}
    function create_if_block$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("ВЫКЛЮЧЕНЫ");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(26:8) {#if $settingsStore.disableAnimationsFlag}",
    		ctx
    	});

    	return block;
    }

    // (6:0) <Setting>
    function create_default_slot$8(ctx) {
    	let h2;
    	let t1;
    	let div1;
    	let span;
    	let t3;
    	let div0;
    	let input;
    	let input_checked_value;
    	let t4;
    	let label;
    	let t6;
    	let p;
    	let t7;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*$settingsStore*/ ctx[0].disableAnimationsFlag) return create_if_block$3;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Отключение анимаций:";
    			t1 = space();
    			div1 = element("div");
    			span = element("span");
    			span.textContent = "Отключить отображение анимаций и переходов";
    			t3 = space();
    			div0 = element("div");
    			input = element("input");
    			t4 = space();
    			label = element("label");
    			label.textContent = "Toggle";
    			t6 = space();
    			p = element("p");
    			t7 = text("Если у вас слабое устройство, отключение анимаций позволит существенно\r\n        ускорить работу приложения. Сейчас анимации:\r\n        ");
    			if_block.c();
    			add_location(h2, file$c, 6, 4, 149);
    			attr_dev(span, "class", "svelte-niu1ik");
    			toggle_class(span, "disabled", !/*$settingsStore*/ ctx[0].viewIconsCards);
    			add_location(span, file$c, 8, 8, 226);
    			attr_dev(input, "id", "switchBtn2");
    			attr_dev(input, "class", "switchBtn svelte-niu1ik");
    			attr_dev(input, "type", "checkbox");
    			input.checked = input_checked_value = /*$settingsStore*/ ctx[0].disableAnimationsFlag;
    			add_location(input, file$c, 12, 12, 382);
    			attr_dev(label, "for", "switchBtn2");
    			attr_dev(label, "class", "switchBtnLabel svelte-niu1ik");
    			add_location(label, file$c, 19, 12, 655);
    			attr_dev(div0, "class", "svelte-niu1ik");
    			add_location(div0, file$c, 11, 8, 363);
    			attr_dev(div1, "class", "roleDetailsSetting svelte-niu1ik");
    			add_location(div1, file$c, 7, 4, 184);
    			attr_dev(p, "class", "mt-10 svelte-niu1ik");
    			add_location(p, file$c, 22, 4, 750);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			append_dev(div0, t4);
    			append_dev(div0, label);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t7);
    			if_block.m(p, null);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", settingsStore.onChangeDisableAnimationsFlag, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$settingsStore*/ 1) {
    				toggle_class(span, "disabled", !/*$settingsStore*/ ctx[0].viewIconsCards);
    			}

    			if (dirty & /*$settingsStore*/ 1 && input_checked_value !== (input_checked_value = /*$settingsStore*/ ctx[0].disableAnimationsFlag)) {
    				prop_dev(input, "checked", input_checked_value);
    			}

    			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(p, null);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p);
    			if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(6:0) <Setting>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let setting;
    	let current;

    	setting = new Setting({
    			props: {
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(setting.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const setting_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 3) {
    				setting_changes.$$scope = { dirty, ctx };
    			}

    			setting.$set(setting_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DisableTransitions', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DisableTransitions> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Setting, settingsStore, $settingsStore });
    	return [$settingsStore];
    }

    class DisableTransitions extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DisableTransitions",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* src\pages\SettingsPage\SettingsList\HiddeningDistributionCards.svelte generated by Svelte v3.48.0 */
    const file$b = "src\\pages\\SettingsPage\\SettingsList\\HiddeningDistributionCards.svelte";

    // (30:4) {#if $settingsStore.hiddeningCardsFlag}
    function create_if_block$2(ctx) {
    	let div;
    	let label;
    	let t1;
    	let input;
    	let input_value_value;
    	let t2;
    	let p;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			label = element("label");
    			label.textContent = "Таймер:";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			p = element("p");
    			p.textContent = "Таймер показывает, через сколько секунд карта, которую игрок увидел,\r\n            скроется";
    			attr_dev(label, "for", "timerViewCard");
    			add_location(label, file$b, 31, 12, 1029);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "id", "timerViewCard");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", "100");
    			input.value = input_value_value = /*$settingsStore*/ ctx[0].hiddeningCardsFlagTimer;
    			attr_dev(input, "class", "svelte-dvpalk");
    			add_location(input, file$b, 32, 12, 1085);
    			attr_dev(div, "class", "timer svelte-dvpalk");
    			add_location(div, file$b, 30, 8, 996);
    			add_location(p, file$b, 41, 8, 1386);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, label);
    			append_dev(div, t1);
    			append_dev(div, input);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", settingsStore.onChangeHiddeningCardsTimer, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$settingsStore*/ 1 && input_value_value !== (input_value_value = /*$settingsStore*/ ctx[0].hiddeningCardsFlagTimer) && input.value !== input_value_value) {
    				prop_dev(input, "value", input_value_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(30:4) {#if $settingsStore.hiddeningCardsFlag}",
    		ctx
    	});

    	return block;
    }

    // (6:0) <Setting>
    function create_default_slot$7(ctx) {
    	let h2;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let div0;
    	let input;
    	let input_checked_value;
    	let t4;
    	let label;
    	let t6;
    	let span1;
    	let t8;
    	let if_block_anchor;
    	let mounted;
    	let dispose;
    	let if_block = /*$settingsStore*/ ctx[0].hiddeningCardsFlag && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Скрытие карт во время выдачи:";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "По клику на карту";
    			t3 = space();
    			div0 = element("div");
    			input = element("input");
    			t4 = space();
    			label = element("label");
    			label.textContent = "Toggle";
    			t6 = space();
    			span1 = element("span");
    			span1.textContent = "По истечению таймера";
    			t8 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(h2, file$b, 6, 4, 149);
    			attr_dev(span0, "class", "svelte-dvpalk");
    			toggle_class(span0, "disabled", /*$settingsStore*/ ctx[0].hiddeningCardsFlag);
    			add_location(span0, file$b, 8, 8, 230);
    			attr_dev(input, "id", "switchBtn");
    			attr_dev(input, "class", "switchBtn svelte-dvpalk");
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "max", "90");
    			attr_dev(input, "min", "5");
    			input.checked = input_checked_value = /*$settingsStore*/ ctx[0].hiddeningCardsFlag;
    			add_location(input, file$b, 12, 12, 364);
    			attr_dev(label, "for", "switchBtn");
    			attr_dev(label, "class", "switchBtnLabel svelte-dvpalk");
    			add_location(label, file$b, 21, 12, 681);
    			add_location(div0, file$b, 11, 8, 345);
    			set_style(span1, "text-align", "right");
    			attr_dev(span1, "class", "svelte-dvpalk");
    			toggle_class(span1, "disabled", !/*$settingsStore*/ ctx[0].hiddeningCardsFlag);
    			add_location(span1, file$b, 23, 8, 767);
    			attr_dev(div1, "class", "switchBtnArea svelte-dvpalk");
    			add_location(div1, file$b, 7, 4, 193);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, input);
    			append_dev(div0, t4);
    			append_dev(div0, label);
    			append_dev(div1, t6);
    			append_dev(div1, span1);
    			insert_dev(target, t8, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", settingsStore.onChangeFlagHiddeningCards, false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$settingsStore*/ 1) {
    				toggle_class(span0, "disabled", /*$settingsStore*/ ctx[0].hiddeningCardsFlag);
    			}

    			if (dirty & /*$settingsStore*/ 1 && input_checked_value !== (input_checked_value = /*$settingsStore*/ ctx[0].hiddeningCardsFlag)) {
    				prop_dev(input, "checked", input_checked_value);
    			}

    			if (dirty & /*$settingsStore*/ 1) {
    				toggle_class(span1, "disabled", !/*$settingsStore*/ ctx[0].hiddeningCardsFlag);
    			}

    			if (/*$settingsStore*/ ctx[0].hiddeningCardsFlag) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t8);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(6:0) <Setting>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let setting;
    	let current;

    	setting = new Setting({
    			props: {
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(setting.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const setting_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 3) {
    				setting_changes.$$scope = { dirty, ctx };
    			}

    			setting.$set(setting_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HiddeningDistributionCards', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HiddeningDistributionCards> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Setting, settingsStore, $settingsStore });
    	return [$settingsStore];
    }

    class HiddeningDistributionCards extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HiddeningDistributionCards",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src\pages\SettingsPage\SettingsList\RoleDetailsDistribution.svelte generated by Svelte v3.48.0 */
    const file$a = "src\\pages\\SettingsPage\\SettingsList\\RoleDetailsDistribution.svelte";

    // (6:0) <Setting>
    function create_default_slot$6(ctx) {
    	let h2;
    	let t1;
    	let div1;
    	let span0;
    	let t3;
    	let div0;
    	let input0;
    	let input0_checked_value;
    	let t4;
    	let label0;
    	let t6;
    	let div3;
    	let span1;
    	let t8;
    	let div2;
    	let input1;
    	let input1_checked_value;
    	let t9;
    	let label1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Отображение информации о ролях:";
    			t1 = space();
    			div1 = element("div");
    			span0 = element("span");
    			span0.textContent = "Показывать картинки во время выдачи ролей";
    			t3 = space();
    			div0 = element("div");
    			input0 = element("input");
    			t4 = space();
    			label0 = element("label");
    			label0.textContent = "Toggle";
    			t6 = space();
    			div3 = element("div");
    			span1 = element("span");
    			span1.textContent = "Показывать описания к ролям во время выдачи";
    			t8 = space();
    			div2 = element("div");
    			input1 = element("input");
    			t9 = space();
    			label1 = element("label");
    			label1.textContent = "Toggle";
    			add_location(h2, file$a, 6, 4, 149);
    			attr_dev(span0, "class", "svelte-1l29hjb");
    			toggle_class(span0, "disabled", !/*$settingsStore*/ ctx[0].viewIconsCards);
    			add_location(span0, file$a, 8, 8, 237);
    			attr_dev(input0, "id", "switchBtn2");
    			attr_dev(input0, "class", "switchBtn svelte-1l29hjb");
    			attr_dev(input0, "type", "checkbox");
    			input0.checked = input0_checked_value = /*$settingsStore*/ ctx[0].viewIconsCards;
    			add_location(input0, file$a, 12, 12, 392);
    			attr_dev(label0, "for", "switchBtn2");
    			attr_dev(label0, "class", "switchBtnLabel svelte-1l29hjb");
    			add_location(label0, file$a, 19, 12, 650);
    			attr_dev(div0, "class", "svelte-1l29hjb");
    			add_location(div0, file$a, 11, 8, 373);
    			attr_dev(div1, "class", "roleDetailsSetting svelte-1l29hjb");
    			add_location(div1, file$a, 7, 4, 195);
    			attr_dev(span1, "class", "svelte-1l29hjb");
    			toggle_class(span1, "disabled", !/*$settingsStore*/ ctx[0].viewDescriptionCards);
    			add_location(span1, file$a, 23, 8, 787);
    			attr_dev(input1, "id", "switchBtn3");
    			attr_dev(input1, "class", "switchBtn svelte-1l29hjb");
    			attr_dev(input1, "type", "checkbox");
    			input1.checked = input1_checked_value = /*$settingsStore*/ ctx[0].viewDescriptionCards;
    			add_location(input1, file$a, 27, 12, 950);
    			attr_dev(label1, "for", "switchBtn3");
    			attr_dev(label1, "class", "switchBtnLabel svelte-1l29hjb");
    			add_location(label1, file$a, 34, 12, 1221);
    			attr_dev(div2, "class", "svelte-1l29hjb");
    			add_location(div2, file$a, 26, 8, 931);
    			attr_dev(div3, "class", "roleDetailsSetting svelte-1l29hjb");
    			add_location(div3, file$a, 22, 4, 745);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span0);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, input0);
    			append_dev(div0, t4);
    			append_dev(div0, label0);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, span1);
    			append_dev(div3, t8);
    			append_dev(div3, div2);
    			append_dev(div2, input1);
    			append_dev(div2, t9);
    			append_dev(div2, label1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", settingsStore.onChangeViewIconsFlag, false, false, false),
    					listen_dev(input1, "input", settingsStore.onChangeViewDescriptionsFlag, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$settingsStore*/ 1) {
    				toggle_class(span0, "disabled", !/*$settingsStore*/ ctx[0].viewIconsCards);
    			}

    			if (dirty & /*$settingsStore*/ 1 && input0_checked_value !== (input0_checked_value = /*$settingsStore*/ ctx[0].viewIconsCards)) {
    				prop_dev(input0, "checked", input0_checked_value);
    			}

    			if (dirty & /*$settingsStore*/ 1) {
    				toggle_class(span1, "disabled", !/*$settingsStore*/ ctx[0].viewDescriptionCards);
    			}

    			if (dirty & /*$settingsStore*/ 1 && input1_checked_value !== (input1_checked_value = /*$settingsStore*/ ctx[0].viewDescriptionCards)) {
    				prop_dev(input1, "checked", input1_checked_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(div3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(6:0) <Setting>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let setting;
    	let current;

    	setting = new Setting({
    			props: {
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(setting.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(setting, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const setting_changes = {};

    			if (dirty & /*$$scope, $settingsStore*/ 3) {
    				setting_changes.$$scope = { dirty, ctx };
    			}

    			setting.$set(setting_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(setting, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $settingsStore;
    	validate_store(settingsStore, 'settingsStore');
    	component_subscribe($$self, settingsStore, $$value => $$invalidate(0, $settingsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('RoleDetailsDistribution', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<RoleDetailsDistribution> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Setting, settingsStore, $settingsStore });
    	return [$settingsStore];
    }

    class RoleDetailsDistribution extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "RoleDetailsDistribution",
    			options,
    			id: create_fragment$b.name
    		});
    	}
    }

    /* src\pages\SettingsPage\Settings.svelte generated by Svelte v3.48.0 */
    const file$9 = "src\\pages\\SettingsPage\\Settings.svelte";

    // (12:4) <Container>
    function create_default_slot_1$5(ctx) {
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div;
    	let deathzoneswipe;
    	let t3;
    	let hiddeningdistributioncards;
    	let t4;
    	let disabletransitions;
    	let t5;
    	let roledetailsdistribution;
    	let t6;
    	let customroles;
    	let current;
    	deathzoneswipe = new DeathZoneSwipes({ $$inline: true });
    	hiddeningdistributioncards = new HiddeningDistributionCards({ $$inline: true });
    	disabletransitions = new DisableTransitions({ $$inline: true });
    	roledetailsdistribution = new RoleDetailsDistribution({ $$inline: true });
    	customroles = new CustomRoles({ $$inline: true });

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Настройки";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div = element("div");
    			create_component(deathzoneswipe.$$.fragment);
    			t3 = space();
    			create_component(hiddeningdistributioncards.$$.fragment);
    			t4 = space();
    			create_component(disabletransitions.$$.fragment);
    			t5 = space();
    			create_component(roledetailsdistribution.$$.fragment);
    			t6 = space();
    			create_component(customroles.$$.fragment);
    			add_location(h1, file$9, 12, 8, 585);
    			add_location(hr, file$9, 13, 8, 613);
    			attr_dev(div, "class", "settingsArea svelte-dq4efc");
    			add_location(div, file$9, 14, 8, 629);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div, anchor);
    			mount_component(deathzoneswipe, div, null);
    			append_dev(div, t3);
    			mount_component(hiddeningdistributioncards, div, null);
    			append_dev(div, t4);
    			mount_component(disabletransitions, div, null);
    			append_dev(div, t5);
    			mount_component(roledetailsdistribution, div, null);
    			append_dev(div, t6);
    			mount_component(customroles, div, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(deathzoneswipe.$$.fragment, local);
    			transition_in(hiddeningdistributioncards.$$.fragment, local);
    			transition_in(disabletransitions.$$.fragment, local);
    			transition_in(roledetailsdistribution.$$.fragment, local);
    			transition_in(customroles.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(deathzoneswipe.$$.fragment, local);
    			transition_out(hiddeningdistributioncards.$$.fragment, local);
    			transition_out(disabletransitions.$$.fragment, local);
    			transition_out(roledetailsdistribution.$$.fragment, local);
    			transition_out(customroles.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div);
    			destroy_component(deathzoneswipe);
    			destroy_component(hiddeningdistributioncards);
    			destroy_component(disabletransitions);
    			destroy_component(roledetailsdistribution);
    			destroy_component(customroles);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(12:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (11:0) <Layout>
    function create_default_slot$5(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(11:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Container,
    		Layout,
    		CustomRoles,
    		DeathZoneSwipe: DeathZoneSwipes,
    		DisableTransitions,
    		HiddeningDistributionCards,
    		RoleDetailsDistribution
    	});

    	return [];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src\pages\HelpPage\Instructions\DistributionInstruction.svelte generated by Svelte v3.48.0 */

    const file$8 = "src\\pages\\HelpPage\\Instructions\\DistributionInstruction.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let p0;
    	let t3;
    	let a0;
    	let t5;
    	let a1;
    	let t7;
    	let t8;
    	let p1;
    	let t9;
    	let a2;
    	let t11;
    	let h30;
    	let t13;
    	let aside0;
    	let t14;
    	let br0;
    	let t15;
    	let nav;
    	let ul;
    	let li0;
    	let t17;
    	let li1;
    	let t19;
    	let li2;
    	let t21;
    	let li3;
    	let t23;
    	let li4;
    	let t25;
    	let aside1;
    	let t26;
    	let br1;
    	let t27;
    	let p2;
    	let t28;
    	let br2;
    	let t29;
    	let t30;
    	let p3;
    	let t32;
    	let p4;
    	let t34;
    	let p5;
    	let t36;
    	let p6;
    	let t38;
    	let p7;
    	let t39;
    	let a3;
    	let t41;
    	let h31;
    	let t43;
    	let aside2;
    	let t44;
    	let br3;
    	let t45;
    	let p8;
    	let t47;
    	let p9;
    	let t49;
    	let p10;
    	let t51;
    	let p11;
    	let t53;
    	let p12;
    	let t55;
    	let p13;
    	let t57;
    	let p14;
    	let t59;
    	let p15;
    	let t60;
    	let a4;
    	let t62;
    	let h32;
    	let t64;
    	let p16;
    	let t66;
    	let aside3;
    	let t68;
    	let p17;
    	let t70;
    	let p18;
    	let t72;
    	let p19;
    	let t74;
    	let p20;
    	let t76;
    	let aside4;
    	let t78;
    	let p21;
    	let t80;
    	let aside5;
    	let t82;
    	let p22;
    	let t83;
    	let br4;
    	let t84;
    	let t85;
    	let p23;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Как раздать карты";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			p0 = element("p");
    			t3 = text("Для раздачи карт в приложении существует два способа:\r\n        ");
    			a0 = element("a");
    			a0.textContent = "1. Автоматический.";
    			t5 = space();
    			a1 = element("a");
    			a1.textContent = "2. Ручной.";
    			t7 = text("\r\n        Для выбора режима сделайте свайп вправо по экрану для вызова меню и выберите\r\n        пункт \"Раздать карты\".");
    			t8 = space();
    			p1 = element("p");
    			t9 = text("Если вы уже сформировали карты для выдачи, но не знаете как выдавать их\r\n        игрокам, ");
    			a2 = element("a");
    			a2.textContent = "нажмите сюда.";
    			t11 = space();
    			h30 = element("h3");
    			h30.textContent = "Автоматический режим";
    			t13 = space();
    			aside0 = element("aside");
    			t14 = text("ВАЖНО!!! ");
    			br0 = element("br");
    			t15 = text("\r\n    В автоматическом режиме система может раздать роли только следующего типа:\r\n    ");
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "Мафия";
    			t17 = space();
    			li1 = element("li");
    			li1.textContent = "Дон мафии";
    			t19 = space();
    			li2 = element("li");
    			li2.textContent = "Мирный житель";
    			t21 = space();
    			li3 = element("li");
    			li3.textContent = "Коммиссар";
    			t23 = space();
    			li4 = element("li");
    			li4.textContent = "Доктор";
    			t25 = space();
    			aside1 = element("aside");
    			t26 = text("Формирование колоды ");
    			br1 = element("br");
    			t27 = space();
    			p2 = element("p");
    			t28 = text("1. В автоматическом режиме система предлагает вам ввести количество\r\n        игроков, который присутствуют на данный момент. ");
    			br2 = element("br");
    			t29 = text("Далее, после ввода\r\n        игроков вам будет предложен набор карт, которые система предлагает для\r\n        выдачи.");
    			t30 = space();
    			p3 = element("p");
    			p3.textContent = "2. Если вам не нравится предложенная системой колода, можете заменить её\r\n        нажать на кнопку \"Изменить раздачу\".";
    			t32 = space();
    			p4 = element("p");
    			p4.textContent = "3. После выбора всех ролей игроков нажмите на кнопку \"Подтвердить\" (или\r\n        \"Раздать\").";
    			t34 = space();
    			p5 = element("p");
    			p5.textContent = "4. Перед вами откроется окно предпросмотра всех выбранных ролей и их\r\n        количества в колоде.";
    			t36 = space();
    			p6 = element("p");
    			p6.textContent = "5. Если вас устраивает текущий список ролей, нажмите на кнопку\r\n        \"Раздать\".";
    			t38 = space();
    			p7 = element("p");
    			t39 = text("Для того, чтобы посмотреть, как раздавать карты непосредственно после\r\n        выбора ролей, ");
    			a3 = element("a");
    			a3.textContent = "нажмите сюда.";
    			t41 = space();
    			h31 = element("h3");
    			h31.textContent = "Ручной режим";
    			t43 = space();
    			aside2 = element("aside");
    			t44 = text("Формирование колоды ");
    			br3 = element("br");
    			t45 = space();
    			p8 = element("p");
    			p8.textContent = "0. В ручном режиме вам самому необходимо выбрать роли всех игроков,\r\n        которые будете раздавать далее.";
    			t47 = space();
    			p9 = element("p");
    			p9.textContent = "1. Для выбора роли (после того как в меню выбора типа раздачи вы\r\n        кликнули на кнопку \"Ручной\"), перед вами показывается интерфейс выбора\r\n        ролей.";
    			t49 = space();
    			p10 = element("p");
    			p10.textContent = "2. Чтобы добавить роль (например роль - \"Мафия\") в колоду для раздачи,\r\n        кликните на кнопку \"+\" рядом с ролью с нужным названием. Соответственно\r\n        чтобы удалить карту из раздачи, кликните на кнопку \"-\" рядом с ролью с\r\n        нужным названием.";
    			t51 = space();
    			p11 = element("p");
    			p11.textContent = "2.1. Количество карт в колоде для каждой роли отображается цифрой между\r\n        кнопок \"+\" и \"-\". Каждой роли можно добавить от 0 до 100 карт.";
    			t53 = space();
    			p12 = element("p");
    			p12.textContent = "2.2. Если вам необходимо добавить сразу много ролей (или убрать сразу\r\n        много), кликните на цифру между кнопок \"+\" и \"-\". Откроется клавиатура,\r\n        где количество карт можно ввести вручную.";
    			t55 = space();
    			p13 = element("p");
    			p13.textContent = "2.3. Суммарное количество всех карт можно посмотреть снизу экрана в\r\n        графе \"Количество игроков\".";
    			t57 = space();
    			p14 = element("p");
    			p14.textContent = "3. После выбора нужных ролей нажмите на кнопку \"Подтвердить\".";
    			t59 = space();
    			p15 = element("p");
    			t60 = text("4. Для того, чтобы посмотреть, как раздавать карты непосредственно после\r\n        выбора ролей, ");
    			a4 = element("a");
    			a4.textContent = "нажмите сюда.";
    			t62 = space();
    			h32 = element("h3");
    			h32.textContent = "Раздача карт игрокам";
    			t64 = space();
    			p16 = element("p");
    			p16.textContent = "После того, как вы сформировали все роли в ручном или автоматическом\r\n        режиме, настало время раздать все карты игрокам.";
    			t66 = space();
    			aside3 = element("aside");
    			aside3.textContent = "Раздача карт";
    			t68 = space();
    			p17 = element("p");
    			p17.textContent = "1. Перед выдачей ролей вы должны \"отправить в ночь\" всех игроков.";
    			t70 = space();
    			p18 = element("p");
    			p18.textContent = "2. Далее вы пробуждаете одного игрока и даёте ему ваше устройство, где\r\n        показывается \"рубашка\" карты. Игрок должен кликнуть на \"рубашку\" и она\r\n        повернётся другой стороной, где показывается его ролью.";
    			t72 = space();
    			p19 = element("p");
    			p19.textContent = "3. После того, как игрок увидел свою роль, он должен либо повторно\r\n        кликнуть на карту, чтобы она скрылась, либо дождаться истечения таймера\r\n        на скрытие (режим скрытия карт можно изменить в настройках приложения).";
    			t74 = space();
    			p20 = element("p");
    			p20.textContent = "4. Когда игрок увидел свою роль и карта скрылась, он должен заснуть.\r\n        Пробудите другого игрока и повторите процедуру выдачи, пока игроков без\r\n        роли не останется.";
    			t76 = space();
    			aside4 = element("aside");
    			aside4.textContent = "ВАЖНО №1!!!";
    			t78 = space();
    			p21 = element("p");
    			p21.textContent = "Если вдруг игрок не успел посмотреть на свою роль или забыл, вы можете\r\n        вернуть последнюю вскрытую карту обратно на выдачу, свайпнув вправо для\r\n        вызова меню и выбрав там пункт \"Вернуть прошлую карту в ротацию\".";
    			t80 = space();
    			aside5 = element("aside");
    			aside5.textContent = "ВАЖНО №2!!!";
    			t82 = space();
    			p22 = element("p");
    			t83 = text("Существует два способа, которыми вы можете показывать карты игрокам: по\r\n        клику или по истечению таймера. ");
    			br4 = element("br");
    			t84 = text("Для выбора соответствующего режима\r\n        перейдите в настройки (вызвав меню по свайпу вправо) и выберите нужный\r\n        режим в пункте \"Скрытие карт во время выдачи\".");
    			t85 = space();
    			p23 = element("p");
    			p23.textContent = "Для того, чтобы узнать о каждом режиме подробнее, перейдите в пункт\r\n        \"Описание настроек приложения\", в разделе \"Помощь\".";
    			add_location(h2, file$8, 1, 4, 31);
    			add_location(hr, file$8, 2, 4, 63);
    			attr_dev(a0, "href", "#automode");
    			attr_dev(a0, "class", "link m-10");
    			add_location(a0, file$8, 5, 8, 151);
    			attr_dev(a1, "href", "#manualmode");
    			attr_dev(a1, "class", "link m-10");
    			add_location(a1, file$8, 6, 8, 222);
    			add_location(p0, file$8, 3, 4, 75);
    			attr_dev(a2, "href", "#distribution");
    			attr_dev(a2, "class", "link");
    			add_location(a2, file$8, 12, 17, 514);
    			add_location(p1, file$8, 10, 4, 411);
    			attr_dev(h30, "id", "automode");
    			add_location(h30, file$8, 14, 4, 584);
    			add_location(br0, file$8, 16, 17, 679);
    			attr_dev(aside0, "class", "mt-20 mb-10");
    			add_location(aside0, file$8, 15, 4, 633);
    			add_location(li0, file$8, 21, 12, 818);
    			add_location(li1, file$8, 22, 12, 846);
    			add_location(li2, file$8, 23, 12, 878);
    			add_location(li3, file$8, 24, 12, 914);
    			add_location(li4, file$8, 25, 12, 946);
    			add_location(ul, file$8, 20, 8, 800);
    			add_location(nav, file$8, 19, 4, 785);
    			add_location(br1, file$8, 29, 28, 1051);
    			attr_dev(aside1, "class", "mt-20 mb-10");
    			add_location(aside1, file$8, 28, 4, 994);
    			add_location(br2, file$8, 33, 56, 1215);
    			add_location(p2, file$8, 31, 4, 1077);
    			add_location(p3, file$8, 37, 4, 1352);
    			add_location(p4, file$8, 41, 4, 1499);
    			add_location(p5, file$8, 45, 4, 1620);
    			add_location(p6, file$8, 49, 4, 1747);
    			attr_dev(a3, "href", "#distribution");
    			attr_dev(a3, "class", "link");
    			add_location(a3, file$8, 55, 22, 1964);
    			add_location(p7, file$8, 53, 4, 1858);
    			attr_dev(h31, "id", "manualmode");
    			add_location(h31, file$8, 58, 4, 2036);
    			add_location(br3, file$8, 60, 28, 2136);
    			attr_dev(aside2, "class", "mt-20 mb-10");
    			add_location(aside2, file$8, 59, 4, 2079);
    			add_location(p8, file$8, 62, 4, 2162);
    			add_location(p9, file$8, 66, 4, 2299);
    			add_location(p10, file$8, 71, 4, 2488);
    			add_location(p11, file$8, 77, 4, 2775);
    			add_location(p12, file$8, 81, 4, 2947);
    			add_location(p13, file$8, 86, 4, 3177);
    			add_location(p14, file$8, 90, 4, 3310);
    			attr_dev(a4, "href", "#distribution");
    			attr_dev(a4, "class", "link");
    			add_location(a4, file$8, 93, 22, 3493);
    			add_location(p15, file$8, 91, 4, 3384);
    			attr_dev(h32, "id", "distribution");
    			add_location(h32, file$8, 95, 4, 3563);
    			add_location(p16, file$8, 96, 4, 3616);
    			attr_dev(aside3, "class", "mt-20 mb-10");
    			add_location(aside3, file$8, 100, 4, 3771);
    			add_location(p17, file$8, 101, 4, 3824);
    			add_location(p18, file$8, 102, 4, 3902);
    			add_location(p19, file$8, 107, 4, 4146);
    			add_location(p20, file$8, 112, 4, 4403);
    			attr_dev(aside4, "class", "mt-20 mb-10");
    			add_location(aside4, file$8, 117, 4, 4609);
    			add_location(p21, file$8, 118, 4, 4661);
    			attr_dev(aside5, "class", "mt-20 mb-10");
    			add_location(aside5, file$8, 123, 4, 4916);
    			add_location(br4, file$8, 126, 40, 5094);
    			add_location(p22, file$8, 124, 4, 4968);
    			add_location(p23, file$8, 130, 4, 5286);
    			attr_dev(div, "class", "instruction svelte-ou8b2b");
    			add_location(div, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, hr);
    			append_dev(div, t2);
    			append_dev(div, p0);
    			append_dev(p0, t3);
    			append_dev(p0, a0);
    			append_dev(p0, t5);
    			append_dev(p0, a1);
    			append_dev(p0, t7);
    			append_dev(div, t8);
    			append_dev(div, p1);
    			append_dev(p1, t9);
    			append_dev(p1, a2);
    			append_dev(div, t11);
    			append_dev(div, h30);
    			append_dev(div, t13);
    			append_dev(div, aside0);
    			append_dev(aside0, t14);
    			append_dev(aside0, br0);
    			append_dev(div, t15);
    			append_dev(div, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t17);
    			append_dev(ul, li1);
    			append_dev(ul, t19);
    			append_dev(ul, li2);
    			append_dev(ul, t21);
    			append_dev(ul, li3);
    			append_dev(ul, t23);
    			append_dev(ul, li4);
    			append_dev(div, t25);
    			append_dev(div, aside1);
    			append_dev(aside1, t26);
    			append_dev(aside1, br1);
    			append_dev(div, t27);
    			append_dev(div, p2);
    			append_dev(p2, t28);
    			append_dev(p2, br2);
    			append_dev(p2, t29);
    			append_dev(div, t30);
    			append_dev(div, p3);
    			append_dev(div, t32);
    			append_dev(div, p4);
    			append_dev(div, t34);
    			append_dev(div, p5);
    			append_dev(div, t36);
    			append_dev(div, p6);
    			append_dev(div, t38);
    			append_dev(div, p7);
    			append_dev(p7, t39);
    			append_dev(p7, a3);
    			append_dev(div, t41);
    			append_dev(div, h31);
    			append_dev(div, t43);
    			append_dev(div, aside2);
    			append_dev(aside2, t44);
    			append_dev(aside2, br3);
    			append_dev(div, t45);
    			append_dev(div, p8);
    			append_dev(div, t47);
    			append_dev(div, p9);
    			append_dev(div, t49);
    			append_dev(div, p10);
    			append_dev(div, t51);
    			append_dev(div, p11);
    			append_dev(div, t53);
    			append_dev(div, p12);
    			append_dev(div, t55);
    			append_dev(div, p13);
    			append_dev(div, t57);
    			append_dev(div, p14);
    			append_dev(div, t59);
    			append_dev(div, p15);
    			append_dev(p15, t60);
    			append_dev(p15, a4);
    			append_dev(div, t62);
    			append_dev(div, h32);
    			append_dev(div, t64);
    			append_dev(div, p16);
    			append_dev(div, t66);
    			append_dev(div, aside3);
    			append_dev(div, t68);
    			append_dev(div, p17);
    			append_dev(div, t70);
    			append_dev(div, p18);
    			append_dev(div, t72);
    			append_dev(div, p19);
    			append_dev(div, t74);
    			append_dev(div, p20);
    			append_dev(div, t76);
    			append_dev(div, aside4);
    			append_dev(div, t78);
    			append_dev(div, p21);
    			append_dev(div, t80);
    			append_dev(div, aside5);
    			append_dev(div, t82);
    			append_dev(div, p22);
    			append_dev(p22, t83);
    			append_dev(p22, br4);
    			append_dev(p22, t84);
    			append_dev(div, t85);
    			append_dev(div, p23);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DistributionInstruction', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DistributionInstruction> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class DistributionInstruction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DistributionInstruction",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\pages\HelpPage\Instructions\HistoryGamesInstruction.svelte generated by Svelte v3.48.0 */

    const file$7 = "src\\pages\\HelpPage\\Instructions\\HistoryGamesInstruction.svelte";

    function create_fragment$8(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let p0;
    	let t4;
    	let p1;
    	let t6;
    	let p2;
    	let t8;
    	let h3;
    	let t10;
    	let p3;
    	let t12;
    	let p4;
    	let t14;
    	let p5;
    	let t16;
    	let p6;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "История игр";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "Чтобы посмотреть историю всех предыдущих игр, свайпните вправо для\r\n        вызова меню и выберите пункт \"История игр\".";
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Перед вами будут отображены последние 100 игр, для которых ранее\r\n        производилась раздача карт. (Даже если раздача не завершена до конца)";
    			t6 = space();
    			p2 = element("p");
    			p2.textContent = "Игры отсортированы по дате от самой последней сыгранной, к самой старой.";
    			t8 = space();
    			h3 = element("h3");
    			h3.textContent = "Инфо о раздаче";
    			t10 = space();
    			p3 = element("p");
    			p3.textContent = "0. Для каждой раздачи система сохраняет все выданные и не выданные (если\r\n        раздача не закончилась) карты, присутствовавшие в колоде.";
    			t12 = space();
    			p4 = element("p");
    			p4.textContent = "1. Чтобы посмотреть историю конкретной раздачи, кликните на кнопку\r\n        \"Подробнее\" для нужной игры.";
    			t14 = space();
    			p5 = element("p");
    			p5.textContent = "2. Перед вами отобразится всплывающее окно со всеми картами, которые\r\n        присутствовали в колоде.";
    			t16 = space();
    			p6 = element("p");
    			p6.textContent = "3. Все выданные и не выданные карты отсортированы по новизне, то есть,\r\n        например самой первой картой в списке \"вскрытых\" будет та, которая была\r\n        вскрыта раньше всех. Для не вскрытых карт сортировка аналогична.";
    			add_location(h2, file$7, 1, 4, 31);
    			add_location(hr, file$7, 2, 4, 57);
    			add_location(p0, file$7, 3, 4, 69);
    			add_location(p1, file$7, 7, 4, 217);
    			add_location(p2, file$7, 11, 4, 389);
    			add_location(h3, file$7, 14, 4, 490);
    			add_location(p3, file$7, 15, 4, 519);
    			add_location(p4, file$7, 19, 4, 687);
    			add_location(p5, file$7, 23, 4, 820);
    			add_location(p6, file$7, 27, 4, 951);
    			attr_dev(div, "class", "instruction svelte-ou8b2b");
    			add_location(div, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, hr);
    			append_dev(div, t2);
    			append_dev(div, p0);
    			append_dev(div, t4);
    			append_dev(div, p1);
    			append_dev(div, t6);
    			append_dev(div, p2);
    			append_dev(div, t8);
    			append_dev(div, h3);
    			append_dev(div, t10);
    			append_dev(div, p3);
    			append_dev(div, t12);
    			append_dev(div, p4);
    			append_dev(div, t14);
    			append_dev(div, p5);
    			append_dev(div, t16);
    			append_dev(div, p6);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('HistoryGamesInstruction', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<HistoryGamesInstruction> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class HistoryGamesInstruction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "HistoryGamesInstruction",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\pages\HelpPage\Instructions\SettingsInstruction.svelte generated by Svelte v3.48.0 */

    const file$6 = "src\\pages\\HelpPage\\Instructions\\SettingsInstruction.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let p0;
    	let t4;
    	let p1;
    	let t6;
    	let nav;
    	let ul;
    	let li0;
    	let a0;
    	let t8;
    	let li1;
    	let a1;
    	let t10;
    	let h30;
    	let t12;
    	let p2;
    	let t14;
    	let p3;
    	let t16;
    	let h31;
    	let t18;
    	let p4;
    	let t19;
    	let br;
    	let t20;
    	let t21;
    	let p5;
    	let t22;
    	let span0;
    	let t24;
    	let t25;
    	let p6;
    	let t26;
    	let span1;
    	let t28;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Описание настроек приложения";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "У приложения присутствуют несколько различных настроек. Для их изменения\r\n        свайпните по экрану вправо, чтобы вызвать меню и выберите там пункт\r\n        \"Настройки\".";
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Кликните на нужную настройку ниже, чтобы прочитать о ней подробнее.";
    			t6 = text("\r\n    В автоматическом режиме система может раздать роли только следующего типа:\r\n    ");
    			nav = element("nav");
    			ul = element("ul");
    			li0 = element("li");
    			a0 = element("a");
    			a0.textContent = "Мертвая зона свайпов";
    			t8 = space();
    			li1 = element("li");
    			a1 = element("a");
    			a1.textContent = "Скрытие карт во время выдачи";
    			t10 = space();
    			h30 = element("h3");
    			h30.textContent = "Мертвая зона свайпов";
    			t12 = space();
    			p2 = element("p");
    			p2.textContent = "\"Мертвая зона\" указывает на то, насколько далеко вы должны проводить\r\n        пальцем по экрану, чтобы вызвать\\скрыть меню (значение указывается в\r\n        процентах от ширины вашего экрана)";
    			t14 = space();
    			p3 = element("p");
    			p3.textContent = "Например, если значение \"мертвой зоны\" у вас стоит как 25, это означает,\r\n        что пока вы не проведёте пальцем больше чем 25% ширины экрана, меню НЕ\r\n        будет вызвано/скрыто.";
    			t16 = space();
    			h31 = element("h3");
    			h31.textContent = "Скрытие карт во время выдачи";
    			t18 = space();
    			p4 = element("p");
    			t19 = text("Существует два способа, которыми вы можете показывать карты игрокам: по\r\n        клику или по истечению таймера. ");
    			br = element("br");
    			t20 = text("Для выбора соответствующего режима\r\n        перейдите в настройки (вызвав меню по свайпу вправо) и выберите нужный\r\n        режим в пункте \"Скрытие карт во время выдачи\".");
    			t21 = space();
    			p5 = element("p");
    			t22 = text("1. В режиме ");
    			span0 = element("span");
    			span0.textContent = "\"По клику на карту\"";
    			t24 = text(" для того, чтобы скрыть карту,\r\n        которую игрок увидел, он должен кликнуть по ней ещё раз (после того, как\r\n        открыл).");
    			t25 = space();
    			p6 = element("p");
    			t26 = text("2. В режиме ");
    			span1 = element("span");
    			span1.textContent = "\"По истечению таймера\"";
    			t28 = text(" карта скроется от игрока\r\n        автоматически через некоторое время (его можно настроить в соответствующем\r\n        пункте меню настроек).");
    			add_location(h2, file$6, 1, 4, 31);
    			add_location(hr, file$6, 2, 4, 74);
    			add_location(p0, file$6, 3, 4, 86);
    			add_location(p1, file$6, 8, 4, 286);
    			attr_dev(a0, "href", "#deathZone");
    			attr_dev(a0, "class", "link");
    			add_location(a0, file$6, 12, 16, 483);
    			add_location(li0, file$6, 12, 12, 479);
    			attr_dev(a1, "href", "#distributionType");
    			attr_dev(a1, "class", "link");
    			add_location(a1, file$6, 14, 16, 582);
    			add_location(li1, file$6, 13, 12, 560);
    			add_location(ul, file$6, 11, 8, 461);
    			add_location(nav, file$6, 10, 4, 446);
    			attr_dev(h30, "id", "deathZone");
    			add_location(h30, file$6, 20, 4, 747);
    			add_location(p2, file$6, 21, 4, 797);
    			add_location(p3, file$6, 26, 4, 1016);
    			attr_dev(h31, "id", "distributionType");
    			add_location(h31, file$6, 31, 4, 1228);
    			add_location(br, file$6, 34, 40, 1419);
    			add_location(p4, file$6, 32, 4, 1293);
    			add_location(span0, file$6, 39, 20, 1636);
    			add_location(p5, file$6, 38, 4, 1611);
    			add_location(span1, file$6, 44, 20, 1839);
    			add_location(p6, file$6, 43, 4, 1814);
    			attr_dev(div, "class", "instruction svelte-ou8b2b");
    			add_location(div, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, hr);
    			append_dev(div, t2);
    			append_dev(div, p0);
    			append_dev(div, t4);
    			append_dev(div, p1);
    			append_dev(div, t6);
    			append_dev(div, nav);
    			append_dev(nav, ul);
    			append_dev(ul, li0);
    			append_dev(li0, a0);
    			append_dev(ul, t8);
    			append_dev(ul, li1);
    			append_dev(li1, a1);
    			append_dev(div, t10);
    			append_dev(div, h30);
    			append_dev(div, t12);
    			append_dev(div, p2);
    			append_dev(div, t14);
    			append_dev(div, p3);
    			append_dev(div, t16);
    			append_dev(div, h31);
    			append_dev(div, t18);
    			append_dev(div, p4);
    			append_dev(p4, t19);
    			append_dev(p4, br);
    			append_dev(p4, t20);
    			append_dev(div, t21);
    			append_dev(div, p5);
    			append_dev(p5, t22);
    			append_dev(p5, span0);
    			append_dev(p5, t24);
    			append_dev(div, t25);
    			append_dev(div, p6);
    			append_dev(p6, t26);
    			append_dev(p6, span1);
    			append_dev(p6, t28);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SettingsInstruction', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SettingsInstruction> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class SettingsInstruction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SettingsInstruction",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\pages\HelpPage\Instructions\Contacts.svelte generated by Svelte v3.48.0 */

    const file$5 = "src\\pages\\HelpPage\\Instructions\\Contacts.svelte";

    function create_fragment$6(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let p0;
    	let t4;
    	let a;
    	let t5;
    	let img;
    	let img_src_value;
    	let t6;
    	let p1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Контакты";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "Если вы обнаружили баг или у вас есть предложение по улучшению\r\n        приложения, можете написать на данную почту.";
    			t4 = space();
    			a = element("a");
    			t5 = text("mafia.leading@mail.ru ");
    			img = element("img");
    			t6 = space();
    			p1 = element("p");
    			p1.textContent = "Ваш запрос будет рассмотрен в ближайшее время после поступления.";
    			add_location(h2, file$5, 1, 4, 31);
    			add_location(hr, file$5, 2, 4, 54);
    			add_location(p0, file$5, 3, 4, 66);
    			if (!src_url_equal(img.src, img_src_value = "assets/clipboard.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Копировать в буфер обмена");
    			attr_dev(img, "class", "svelte-1vop6ft");
    			add_location(img, file$5, 12, 30, 412);
    			attr_dev(a, "class", "email link svelte-1vop6ft");
    			add_location(a, file$5, 8, 4, 262);
    			add_location(p1, file$5, 17, 4, 529);
    			attr_dev(div, "class", "instruction svelte-1vop6ft");
    			add_location(div, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, hr);
    			append_dev(div, t2);
    			append_dev(div, p0);
    			append_dev(div, t4);
    			append_dev(div, a);
    			append_dev(a, t5);
    			append_dev(a, img);
    			append_dev(div, t6);
    			append_dev(div, p1);

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[0], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contacts', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contacts> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => navigator.clipboard.writeText("mafia.leading@mail.ru");
    	return [click_handler];
    }

    class Contacts extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contacts",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\pages\HelpPage\Help.svelte generated by Svelte v3.48.0 */
    const file$4 = "src\\pages\\HelpPage\\Help.svelte";

    // (22:4) <Container>
    function create_default_slot_3$2(ctx) {
    	let div2;
    	let div0;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div1;
    	let button0;
    	let t4;
    	let button1;
    	let t6;
    	let button2;
    	let t8;
    	let button3;
    	let t10;
    	let span;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Помощь";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div1 = element("div");
    			button0 = element("button");
    			button0.textContent = "1. Как раздать карты?";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "2. Описание функций истории игр";
    			t6 = space();
    			button2 = element("button");
    			button2.textContent = "3. Описание настроек приложения";
    			t8 = space();
    			button3 = element("button");
    			button3.textContent = "4. Связь с разработчиком";
    			t10 = space();
    			span = element("span");
    			span.textContent = "Alexander Pankratov. 2022";
    			add_location(h1, file$4, 24, 16, 889);
    			add_location(hr, file$4, 25, 16, 922);
    			add_location(div0, file$4, 23, 12, 866);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "svelte-1uqmizf");
    			add_location(button0, file$4, 28, 16, 1002);
    			attr_dev(button1, "type", "button");
    			attr_dev(button1, "class", "svelte-1uqmizf");
    			add_location(button1, file$4, 33, 16, 1213);
    			attr_dev(button2, "type", "button");
    			attr_dev(button2, "class", "svelte-1uqmizf");
    			add_location(button2, file$4, 38, 16, 1429);
    			attr_dev(button3, "type", "button");
    			attr_dev(button3, "class", "svelte-1uqmizf");
    			add_location(button3, file$4, 43, 16, 1646);
    			attr_dev(div1, "class", "sections svelte-1uqmizf");
    			add_location(div1, file$4, 27, 12, 962);
    			attr_dev(span, "class", "author svelte-1uqmizf");
    			add_location(span, file$4, 49, 12, 1869);
    			attr_dev(div2, "class", "helpArea svelte-1uqmizf");
    			add_location(div2, file$4, 22, 8, 830);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, hr);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, button0);
    			append_dev(div1, t4);
    			append_dev(div1, button1);
    			append_dev(div1, t6);
    			append_dev(div1, button2);
    			append_dev(div1, t8);
    			append_dev(div1, button3);
    			append_dev(div2, t10);
    			append_dev(div2, span);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[4], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[5], false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[6], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(22:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (21:0) <Layout>
    function create_default_slot_2$3(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(21:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    // (60:8) {#if helpSection === "distributionInstruction"}
    function create_if_block_3(ctx) {
    	let distributioninstruction;
    	let current;
    	distributioninstruction = new DistributionInstruction({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(distributioninstruction.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(distributioninstruction, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(distributioninstruction.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(distributioninstruction.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(distributioninstruction, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(60:8) {#if helpSection === \\\"distributionInstruction\\\"}",
    		ctx
    	});

    	return block;
    }

    // (63:8) {#if helpSection === "historyInstruction"}
    function create_if_block_2$1(ctx) {
    	let historygamesinstruction;
    	let current;
    	historygamesinstruction = new HistoryGamesInstruction({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(historygamesinstruction.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(historygamesinstruction, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(historygamesinstruction.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(historygamesinstruction.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(historygamesinstruction, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(63:8) {#if helpSection === \\\"historyInstruction\\\"}",
    		ctx
    	});

    	return block;
    }

    // (66:8) {#if helpSection === "settingsInstruction"}
    function create_if_block_1$1(ctx) {
    	let settingsinstruction;
    	let current;
    	settingsinstruction = new SettingsInstruction({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(settingsinstruction.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(settingsinstruction, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(settingsinstruction.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(settingsinstruction.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(settingsinstruction, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(66:8) {#if helpSection === \\\"settingsInstruction\\\"}",
    		ctx
    	});

    	return block;
    }

    // (69:8) {#if helpSection === "developerContact"}
    function create_if_block$1(ctx) {
    	let contacts;
    	let current;
    	contacts = new Contacts({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(contacts.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contacts, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contacts.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contacts.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contacts, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(69:8) {#if helpSection === \\\"developerContact\\\"}",
    		ctx
    	});

    	return block;
    }

    // (56:4) <ModalContainer          customStyle="padding: 10px 20px; max-height: 80vh;"          clickEvent={(e) => e.stopPropagation()}      >
    function create_default_slot_1$4(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let if_block3_anchor;
    	let current;
    	let if_block0 = /*helpSection*/ ctx[1] === "distributionInstruction" && create_if_block_3(ctx);
    	let if_block1 = /*helpSection*/ ctx[1] === "historyInstruction" && create_if_block_2$1(ctx);
    	let if_block2 = /*helpSection*/ ctx[1] === "settingsInstruction" && create_if_block_1$1(ctx);
    	let if_block3 = /*helpSection*/ ctx[1] === "developerContact" && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			if (if_block2) if_block2.c();
    			t2 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert_dev(target, if_block3_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*helpSection*/ ctx[1] === "distributionInstruction") {
    				if (if_block0) {
    					if (dirty & /*helpSection*/ 2) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*helpSection*/ ctx[1] === "historyInstruction") {
    				if (if_block1) {
    					if (dirty & /*helpSection*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2$1(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*helpSection*/ ctx[1] === "settingsInstruction") {
    				if (if_block2) {
    					if (dirty & /*helpSection*/ 2) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block_1$1(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t2.parentNode, t2);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}

    			if (/*helpSection*/ ctx[1] === "developerContact") {
    				if (if_block3) {
    					if (dirty & /*helpSection*/ 2) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block$1(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(if_block2);
    			transition_in(if_block3);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(if_block2);
    			transition_out(if_block3);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach_dev(if_block3_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(56:4) <ModalContainer          customStyle=\\\"padding: 10px 20px; max-height: 80vh;\\\"          clickEvent={(e) => e.stopPropagation()}      >",
    		ctx
    	});

    	return block;
    }

    // (55:0) <Modal showFlag={modalFlag} clickEvent={() => (modalFlag = false)}>
    function create_default_slot$4(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				customStyle: "padding: 10px 20px; max-height: 80vh;",
    				clickEvent: func,
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, helpSection*/ 258) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(55:0) <Modal showFlag={modalFlag} clickEvent={() => (modalFlag = false)}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let layout;
    	let t;
    	let modal;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	modal = new Modal({
    			props: {
    				showFlag: /*modalFlag*/ ctx[0],
    				clickEvent: /*func_1*/ ctx[7],
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    			t = space();
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 256) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    			const modal_changes = {};
    			if (dirty & /*modalFlag*/ 1) modal_changes.showFlag = /*modalFlag*/ ctx[0];
    			if (dirty & /*modalFlag*/ 1) modal_changes.clickEvent = /*func_1*/ ctx[7];

    			if (dirty & /*$$scope, helpSection*/ 258) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = e => e.stopPropagation();

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Help', slots, []);
    	let modalFlag = false, helpSection = "distributionInstruction";

    	function onClickSection(sectionName) {
    		$$invalidate(0, modalFlag = true);
    		$$invalidate(1, helpSection = sectionName);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Help> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => onClickSection("distributionInstruction");
    	const click_handler_1 = () => onClickSection("historyInstruction");
    	const click_handler_2 = () => onClickSection("settingsInstruction");
    	const click_handler_3 = () => onClickSection("developerContact");
    	const func_1 = () => $$invalidate(0, modalFlag = false);

    	$$self.$capture_state = () => ({
    		Container,
    		Layout,
    		Modal,
    		ModalContainer,
    		DistributionInstruction,
    		HistoryGamesInstruction,
    		SettingsInstruction,
    		Contacts,
    		modalFlag,
    		helpSection,
    		onClickSection
    	});

    	$$self.$inject_state = $$props => {
    		if ('modalFlag' in $$props) $$invalidate(0, modalFlag = $$props.modalFlag);
    		if ('helpSection' in $$props) $$invalidate(1, helpSection = $$props.helpSection);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		modalFlag,
    		helpSection,
    		onClickSection,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		func_1
    	];
    }

    class Help extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Help",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\pages\Rules.svelte generated by Svelte v3.48.0 */
    const file$3 = "src\\pages\\Rules.svelte";

    // (7:4) <Container>
    function create_default_slot_1$3(ctx) {
    	let div0;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div6;
    	let div1;
    	let h30;
    	let t4;
    	let p0;
    	let span0;
    	let t6;
    	let t7;
    	let p1;
    	let span1;
    	let t9;
    	let t10;
    	let div2;
    	let h31;
    	let t12;
    	let nav0;
    	let ul0;
    	let li0;
    	let span2;
    	let t14;
    	let t15;
    	let li1;
    	let span3;
    	let t17;
    	let t18;
    	let li2;
    	let span4;
    	let t20;
    	let t21;
    	let div3;
    	let h32;
    	let t23;
    	let span5;
    	let t25;
    	let nav1;
    	let ul1;
    	let li3;
    	let t27;
    	let li4;
    	let t29;
    	let li5;
    	let t31;
    	let li6;
    	let t33;
    	let li7;
    	let t35;
    	let p2;
    	let t37;
    	let span6;
    	let t39;
    	let p3;
    	let t41;
    	let p4;
    	let t43;
    	let div4;
    	let span7;
    	let t45;
    	let p5;
    	let t47;
    	let nav2;
    	let ul2;
    	let li8;
    	let t49;
    	let li9;
    	let t51;
    	let div5;
    	let span8;
    	let t53;
    	let p6;
    	let t55;
    	let nav3;
    	let ul3;
    	let li10;
    	let span9;
    	let t57;
    	let t58;
    	let li11;
    	let span10;
    	let t60;
    	let t61;
    	let li12;
    	let span11;
    	let t63;
    	let t64;
    	let li13;
    	let span12;
    	let t66;
    	let t67;
    	let li14;
    	let span13;
    	let t69;
    	let t70;
    	let li15;
    	let span14;
    	let t72;
    	let t73;
    	let aside;
    	let t74;
    	let a;
    	let t76;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Правила игры";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div6 = element("div");
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Рекомендации перед началом игры";
    			t4 = space();
    			p0 = element("p");
    			span0 = element("span");
    			span0.textContent = "Количество игроков:";
    			t6 = text(" от 10 (при меньшем количестве\r\n                    игра быстро заканчивается).");
    			t7 = space();
    			p1 = element("p");
    			span1 = element("span");
    			span1.textContent = "Цель игры:";
    			t9 = text(" для мирных людей вычислить и убить мафию,\r\n                    для мафии — перестрелять всех мирных.");
    			t10 = space();
    			div2 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Основные роли";
    			t12 = space();
    			nav0 = element("nav");
    			ul0 = element("ul");
    			li0 = element("li");
    			span2 = element("span");
    			span2.textContent = "Мафия.";
    			t14 = text(" Убивает одного из игроков каждую\r\n                            ночь. Цель: оставить \"за столом\" игроков только с ролью\r\n                            \"мафия\".");
    			t15 = space();
    			li1 = element("li");
    			span3 = element("span");
    			span3.textContent = "Мирный житель.";
    			t17 = text(" Роль, активная только в дневное\r\n                            время. Способна только исключать голосованием игрока.\r\n                            Цель: исключить всех игроков с ролью \"мафии\".");
    			t18 = space();
    			li2 = element("li");
    			span4 = element("span");
    			span4.textContent = "Коммиссар.";
    			t20 = text(" Просыпается каждую ночь и выбирает\r\n                            одного из игроков для \"проверки\". Если выбранный игрок\r\n                            имеет роль \"мафии\", ведущий показывает жест, подтверждающий\r\n                            это. Цель аналогична мирным жителям - исключить всех\r\n                            \"мафий\" голосованием.");
    			t21 = space();
    			div3 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Как вести игру";
    			t23 = space();
    			span5 = element("span");
    			span5.textContent = "В первую ночь ведущий обьявляет:";
    			t25 = space();
    			nav1 = element("nav");
    			ul1 = element("ul");
    			li3 = element("li");
    			li3.textContent = "Наступает ночь (все игроки закрывают глаза).";
    			t27 = space();
    			li4 = element("li");
    			li4.textContent = "Мафия просыпается и знакомится (все игроки, которым\r\n                            выпала роль мафии, открывают глаза и запоминают свою\r\n                            «команду»).";
    			t29 = space();
    			li5 = element("li");
    			li5.textContent = "Мафия засыпает (все закрывают глаза).";
    			t31 = space();
    			li6 = element("li");
    			li6.textContent = "Наступает утро, все игроки просыпаются (все\r\n                            открывают глаза).";
    			t33 = space();
    			li7 = element("li");
    			li7.textContent = "Итак, господа, у нас в городе обосновалась МАФИЯ!\r\n                            (речь ведущего).";
    			t35 = space();
    			p2 = element("p");
    			p2.textContent = "Далее игроки на основании легенд и своих догадок, а мафия на\r\n                    основании того, что они друг о друге знают, высказывают\r\n                    мнения о подозрительных личностях. После того, как все\r\n                    высказались, проводится голосование. Тот, за кого\r\n                    проголосовало большинство, считается убитым. Исключенный\r\n                    голосованием игрок выбывает из игры.";
    			t37 = space();
    			span6 = element("span");
    			span6.textContent = "Вторая и последующие ночи:";
    			t39 = space();
    			p3 = element("p");
    			p3.textContent = "Во вторую и последующие «ночи» сначала просыпается мафия,\r\n                    совещается и показывает ведущему, кого она убивает\r\n                    (несколько мафий выбирают коллективно ОДНУ жертву), затем\r\n                    просыпается комиссар и указывая ведущему на любого игрока\r\n                    спрашивает мафия он или нет. Ведущий отвечает заранее\r\n                    оговоренным жестом.";
    			t41 = space();
    			p4 = element("p");
    			p4.textContent = "Также сейчас популярна ещё и роль доктора (хотя в своем)\r\n                    изначальном виде данная карточная игра такой роли не\r\n                    предполагала. Доктор также просыпается каждую ночь (начиная\r\n                    со второй) и \"лечит\" одного из игроков. Если мафия и доктор\r\n                    указали на одного и того же игрока, то данный игрок\r\n                    выживает. Доктор может излечить и себя, но не каждую ночь\r\n                    подряд (иначе доктор будет неуязвим и игру невозможно будет\r\n                    выиграть за мафию).";
    			t43 = space();
    			div4 = element("div");
    			span7 = element("span");
    			span7.textContent = "Окончание игры:";
    			t45 = space();
    			p5 = element("p");
    			p5.textContent = "В классическом варианте игра заканчивается одним из двух\r\n                    вариантов событий:";
    			t47 = space();
    			nav2 = element("nav");
    			ul2 = element("ul");
    			li8 = element("li");
    			li8.textContent = "Мирные игроки исключили всех игроков с ролью\r\n                            \"мафия\". Таким образом объявляется победа мирных.";
    			t49 = space();
    			li9 = element("li");
    			li9.textContent = "Мафия убила (или исключила голосованием) всех\r\n                            игроков с любой ролью не мафии. Тем самым\r\n                            объявляется победа мафии (даже если \"за столом\"\r\n                            находятся не все игроки с ролью мафии).";
    			t51 = space();
    			div5 = element("div");
    			span8 = element("span");
    			span8.textContent = "Дополнительные роли:";
    			t53 = space();
    			p6 = element("p");
    			p6.textContent = "Если игроков \"за столом\" собралось более 12, чаще всего\r\n                    добавляют роли в раздачу из следующего набора:";
    			t55 = space();
    			nav3 = element("nav");
    			ul3 = element("ul");
    			li10 = element("li");
    			span9 = element("span");
    			span9.textContent = "Дон мафии.";
    			t57 = text(" Роль в помощь для мафии. Просыпается\r\n                            ночью и проверяет одного из игроков, является ли тот\r\n                            комиссаром.");
    			t58 = space();
    			li11 = element("li");
    			span10 = element("span");
    			span10.textContent = "Маньяк.";
    			t60 = text(" Играет \"сам за себя\". Просыпается\r\n                            ночью (НЕ одновременно с мафией) и убивает одного из\r\n                            игроков. Цель: остаться единственным игроком \"за столом\".");
    			t61 = space();
    			li12 = element("li");
    			span11 = element("span");
    			span11.textContent = "Путана (Проститутка).";
    			t63 = text(" Просыпается ночью\r\n                            и \"ходит\" к одному из игроков. Днём игрока, к которому\r\n                            \"сходила\" путана нельзя исключить голосованием.");
    			t64 = space();
    			li13 = element("li");
    			span12 = element("span");
    			span12.textContent = "Босс.";
    			t66 = text(" Главный среди мафиози. Просыпается\r\n                            каждую ночь и убивает одного из игроков (если мафиози\r\n                            выбрали другого игрока, их выбор не учитывается).");
    			t67 = space();
    			li14 = element("li");
    			span13 = element("span");
    			span13.textContent = "Якудза.";
    			t69 = text(" Задача: истребить мирных жителей\r\n                            и мафию. Просыпается каждую ночь. В первую ночь договаривается\r\n                            об убийствах, а начиная со второй стреляет.");
    			t70 = space();
    			li15 = element("li");
    			span14 = element("span");
    			span14.textContent = "Вор.";
    			t72 = text(" Играет за мирных жителей. Просыпается\r\n                            первым и лишает спецдействия одного из игроков. Таким\r\n                            образом игрок не может совершить действие ночью.");
    			t73 = space();
    			aside = element("aside");
    			t74 = text("Описание ролей и правила игры частично взяты с ");
    			a = element("a");
    			a.textContent = "этого";
    			t76 = text(" сайта");
    			add_location(h1, file$3, 8, 12, 193);
    			attr_dev(hr, "class", "titleUnderline svelte-1tmrnxh");
    			add_location(hr, file$3, 9, 12, 228);
    			add_location(div0, file$3, 7, 8, 174);
    			attr_dev(h30, "class", "svelte-1tmrnxh");
    			add_location(h30, file$3, 13, 16, 362);
    			attr_dev(span0, "class", "svelte-1tmrnxh");
    			add_location(span0, file$3, 15, 20, 445);
    			attr_dev(p0, "class", "svelte-1tmrnxh");
    			add_location(p0, file$3, 14, 16, 420);
    			attr_dev(span1, "class", "svelte-1tmrnxh");
    			add_location(span1, file$3, 19, 20, 621);
    			attr_dev(p1, "class", "svelte-1tmrnxh");
    			add_location(p1, file$3, 18, 16, 596);
    			attr_dev(div1, "class", "recomendations");
    			add_location(div1, file$3, 12, 12, 316);
    			attr_dev(h31, "class", "svelte-1tmrnxh");
    			add_location(h31, file$3, 24, 16, 838);
    			attr_dev(span2, "class", "svelte-1tmrnxh");
    			add_location(span2, file$3, 28, 28, 969);
    			attr_dev(li0, "class", "svelte-1tmrnxh");
    			add_location(li0, file$3, 27, 24, 935);
    			attr_dev(span3, "class", "svelte-1tmrnxh");
    			add_location(span3, file$3, 33, 28, 1235);
    			attr_dev(li1, "class", "svelte-1tmrnxh");
    			add_location(li1, file$3, 32, 24, 1201);
    			attr_dev(span4, "class", "svelte-1tmrnxh");
    			add_location(span4, file$3, 38, 28, 1543);
    			attr_dev(li2, "class", "svelte-1tmrnxh");
    			add_location(li2, file$3, 37, 24, 1509);
    			add_location(ul0, file$3, 26, 20, 905);
    			attr_dev(nav0, "class", "svelte-1tmrnxh");
    			add_location(nav0, file$3, 25, 16, 878);
    			attr_dev(div2, "class", "roles");
    			add_location(div2, file$3, 23, 12, 801);
    			attr_dev(h32, "class", "svelte-1tmrnxh");
    			add_location(h32, file$3, 48, 16, 2061);
    			attr_dev(span5, "class", "svelte-1tmrnxh");
    			add_location(span5, file$3, 49, 16, 2102);
    			attr_dev(li3, "class", "svelte-1tmrnxh");
    			add_location(li3, file$3, 52, 24, 2222);
    			attr_dev(li4, "class", "svelte-1tmrnxh");
    			add_location(li4, file$3, 53, 24, 2301);
    			attr_dev(li5, "class", "svelte-1tmrnxh");
    			add_location(li5, file$3, 58, 24, 2566);
    			attr_dev(li6, "class", "svelte-1tmrnxh");
    			add_location(li6, file$3, 59, 24, 2638);
    			attr_dev(li7, "class", "svelte-1tmrnxh");
    			add_location(li7, file$3, 63, 24, 2819);
    			add_location(ul1, file$3, 51, 20, 2192);
    			attr_dev(nav1, "class", "svelte-1tmrnxh");
    			add_location(nav1, file$3, 50, 16, 2165);
    			set_style(p2, "margin-top", "30px");
    			attr_dev(p2, "class", "svelte-1tmrnxh");
    			add_location(p2, file$3, 69, 16, 3048);
    			set_style(span6, "display", "block");
    			set_style(span6, "margin-top", "40px");
    			attr_dev(span6, "class", "svelte-1tmrnxh");
    			add_location(span6, file$3, 77, 16, 3559);
    			attr_dev(p3, "class", "svelte-1tmrnxh");
    			add_location(p3, file$3, 80, 16, 3697);
    			set_style(p4, "margin-top", "30px");
    			attr_dev(p4, "class", "svelte-1tmrnxh");
    			add_location(p4, file$3, 88, 16, 4165);
    			attr_dev(div3, "class", "leader");
    			add_location(div3, file$3, 47, 12, 2023);
    			set_style(span7, "display", "block");
    			set_style(span7, "margin-top", "40px");
    			attr_dev(span7, "class", "svelte-1tmrnxh");
    			add_location(span7, file$3, 100, 16, 4874);
    			attr_dev(p5, "class", "svelte-1tmrnxh");
    			add_location(p5, file$3, 103, 16, 5001);
    			attr_dev(li8, "class", "svelte-1tmrnxh");
    			add_location(li8, file$3, 109, 24, 5219);
    			attr_dev(li9, "class", "svelte-1tmrnxh");
    			add_location(li9, file$3, 113, 24, 5433);
    			add_location(ul2, file$3, 108, 20, 5189);
    			attr_dev(nav2, "class", "svelte-1tmrnxh");
    			add_location(nav2, file$3, 107, 16, 5162);
    			attr_dev(div4, "class", "goal");
    			add_location(div4, file$3, 99, 12, 4838);
    			set_style(span8, "display", "block");
    			set_style(span8, "margin-top", "40px");
    			attr_dev(span8, "class", "svelte-1tmrnxh");
    			add_location(span8, file$3, 123, 16, 5892);
    			attr_dev(p6, "class", "svelte-1tmrnxh");
    			add_location(p6, file$3, 126, 16, 6024);
    			attr_dev(span9, "class", "svelte-1tmrnxh");
    			add_location(span9, file$3, 133, 28, 6303);
    			attr_dev(li10, "class", "svelte-1tmrnxh");
    			add_location(li10, file$3, 132, 24, 6269);
    			attr_dev(span10, "class", "svelte-1tmrnxh");
    			add_location(span10, file$3, 138, 28, 6577);
    			attr_dev(li11, "class", "svelte-1tmrnxh");
    			add_location(li11, file$3, 137, 24, 6543);
    			attr_dev(span11, "class", "svelte-1tmrnxh");
    			add_location(span11, file$3, 143, 28, 6891);
    			attr_dev(li12, "class", "svelte-1tmrnxh");
    			add_location(li12, file$3, 142, 24, 6857);
    			attr_dev(span12, "class", "svelte-1tmrnxh");
    			add_location(span12, file$3, 148, 28, 7195);
    			attr_dev(li13, "class", "svelte-1tmrnxh");
    			add_location(li13, file$3, 147, 24, 7161);
    			attr_dev(span13, "class", "svelte-1tmrnxh");
    			add_location(span13, file$3, 153, 28, 7501);
    			attr_dev(li14, "class", "svelte-1tmrnxh");
    			add_location(li14, file$3, 152, 24, 7467);
    			attr_dev(span14, "class", "svelte-1tmrnxh");
    			add_location(span14, file$3, 158, 28, 7810);
    			attr_dev(li15, "class", "svelte-1tmrnxh");
    			add_location(li15, file$3, 157, 24, 7776);
    			add_location(ul3, file$3, 131, 20, 6239);
    			attr_dev(nav3, "class", "svelte-1tmrnxh");
    			add_location(nav3, file$3, 130, 16, 6212);
    			attr_dev(div5, "class", "additionalRoles");
    			add_location(div5, file$3, 122, 12, 5845);
    			attr_dev(a, "href", "https://summoning.ru/games/mafia.shtml");
    			attr_dev(a, "class", "svelte-1tmrnxh");
    			add_location(a, file$3, 166, 63, 8227);
    			attr_dev(aside, "class", "link svelte-1tmrnxh");
    			add_location(aside, file$3, 165, 12, 8142);
    			attr_dev(div6, "class", "rules svelte-1tmrnxh");
    			add_location(div6, file$3, 11, 8, 283);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, h1);
    			append_dev(div0, t1);
    			append_dev(div0, hr);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, div1);
    			append_dev(div1, h30);
    			append_dev(div1, t4);
    			append_dev(div1, p0);
    			append_dev(p0, span0);
    			append_dev(p0, t6);
    			append_dev(div1, t7);
    			append_dev(div1, p1);
    			append_dev(p1, span1);
    			append_dev(p1, t9);
    			append_dev(div6, t10);
    			append_dev(div6, div2);
    			append_dev(div2, h31);
    			append_dev(div2, t12);
    			append_dev(div2, nav0);
    			append_dev(nav0, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, span2);
    			append_dev(li0, t14);
    			append_dev(ul0, t15);
    			append_dev(ul0, li1);
    			append_dev(li1, span3);
    			append_dev(li1, t17);
    			append_dev(ul0, t18);
    			append_dev(ul0, li2);
    			append_dev(li2, span4);
    			append_dev(li2, t20);
    			append_dev(div6, t21);
    			append_dev(div6, div3);
    			append_dev(div3, h32);
    			append_dev(div3, t23);
    			append_dev(div3, span5);
    			append_dev(div3, t25);
    			append_dev(div3, nav1);
    			append_dev(nav1, ul1);
    			append_dev(ul1, li3);
    			append_dev(ul1, t27);
    			append_dev(ul1, li4);
    			append_dev(ul1, t29);
    			append_dev(ul1, li5);
    			append_dev(ul1, t31);
    			append_dev(ul1, li6);
    			append_dev(ul1, t33);
    			append_dev(ul1, li7);
    			append_dev(div3, t35);
    			append_dev(div3, p2);
    			append_dev(div3, t37);
    			append_dev(div3, span6);
    			append_dev(div3, t39);
    			append_dev(div3, p3);
    			append_dev(div3, t41);
    			append_dev(div3, p4);
    			append_dev(div6, t43);
    			append_dev(div6, div4);
    			append_dev(div4, span7);
    			append_dev(div4, t45);
    			append_dev(div4, p5);
    			append_dev(div4, t47);
    			append_dev(div4, nav2);
    			append_dev(nav2, ul2);
    			append_dev(ul2, li8);
    			append_dev(ul2, t49);
    			append_dev(ul2, li9);
    			append_dev(div6, t51);
    			append_dev(div6, div5);
    			append_dev(div5, span8);
    			append_dev(div5, t53);
    			append_dev(div5, p6);
    			append_dev(div5, t55);
    			append_dev(div5, nav3);
    			append_dev(nav3, ul3);
    			append_dev(ul3, li10);
    			append_dev(li10, span9);
    			append_dev(li10, t57);
    			append_dev(ul3, t58);
    			append_dev(ul3, li11);
    			append_dev(li11, span10);
    			append_dev(li11, t60);
    			append_dev(ul3, t61);
    			append_dev(ul3, li12);
    			append_dev(li12, span11);
    			append_dev(li12, t63);
    			append_dev(ul3, t64);
    			append_dev(ul3, li13);
    			append_dev(li13, span12);
    			append_dev(li13, t66);
    			append_dev(ul3, t67);
    			append_dev(ul3, li14);
    			append_dev(li14, span13);
    			append_dev(li14, t69);
    			append_dev(ul3, t70);
    			append_dev(ul3, li15);
    			append_dev(li15, span14);
    			append_dev(li15, t72);
    			append_dev(div6, t73);
    			append_dev(div6, aside);
    			append_dev(aside, t74);
    			append_dev(aside, a);
    			append_dev(aside, t76);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(div6);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(7:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (6:0) <Layout>
    function create_default_slot$3(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(6:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Rules', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Rules> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Container, Layout });
    	return [];
    }

    class Rules extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Rules",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    function createStore$1() {
        const { update, subscribe } = writable({
            presets: JSON.parse(localStorage.getItem("presets")) || [],
        });

        return {
            update,
            subscribe,
            createPreset: (name, cards) => {
                const savedPresets =
                    JSON.parse(localStorage.getItem("presets")) || [];
                savedPresets.push({ name, cards });
                localStorage.setItem("presets", JSON.stringify(savedPresets));
            },
            deletePreset: (idx) => {
                const savedPresets =
                    JSON.parse(localStorage.getItem("presets")) || [];
                savedPresets.splice(idx, 1);
                localStorage.setItem("presets", JSON.stringify(savedPresets));
            },
        };
    }

    const presetsStore = createStore$1();

    /* src\components\modals\ConfirmActionModal.svelte generated by Svelte v3.48.0 */
    const file$2 = "src\\components\\modals\\ConfirmActionModal.svelte";

    // (18:12) <Button clickEvent={confirmBtnEvent} style="font-size: 1rem;"                  >
    function create_default_slot_3$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*confirmBtnText*/ ctx[2]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*confirmBtnText*/ 4) set_data_dev(t, /*confirmBtnText*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(18:12) <Button clickEvent={confirmBtnEvent} style=\\\"font-size: 1rem;\\\"                  >",
    		ctx
    	});

    	return block;
    }

    // (21:12) <Button                  clickEvent={backBtnEvent}                  style="font-size: 1rem;"                  color="secondary">
    function create_default_slot_2$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*backBtnText*/ ctx[4]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*backBtnText*/ 16) set_data_dev(t, /*backBtnText*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(21:12) <Button                  clickEvent={backBtnEvent}                  style=\\\"font-size: 1rem;\\\"                  color=\\\"secondary\\\">",
    		ctx
    	});

    	return block;
    }

    // (15:4) <ModalContainer>
    function create_default_slot_1$2(ctx) {
    	let div;
    	let h2;
    	let t0;
    	let t1;
    	let button0;
    	let t2;
    	let button1;
    	let current;

    	button0 = new Button({
    			props: {
    				clickEvent: /*confirmBtnEvent*/ ctx[3],
    				style: "font-size: 1rem;",
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				clickEvent: /*backBtnEvent*/ ctx[5],
    				style: "font-size: 1rem;",
    				color: "secondary",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			t0 = text(/*title*/ ctx[0]);
    			t1 = space();
    			create_component(button0.$$.fragment);
    			t2 = space();
    			create_component(button1.$$.fragment);
    			attr_dev(h2, "class", "svelte-q57li8");
    			add_location(h2, file$2, 16, 12, 465);
    			attr_dev(div, "class", "modalArea buttons svelte-q57li8");
    			add_location(div, file$2, 15, 8, 420);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(h2, t0);
    			append_dev(div, t1);
    			mount_component(button0, div, null);
    			append_dev(div, t2);
    			mount_component(button1, div, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*title*/ 1) set_data_dev(t0, /*title*/ ctx[0]);
    			const button0_changes = {};
    			if (dirty & /*confirmBtnEvent*/ 8) button0_changes.clickEvent = /*confirmBtnEvent*/ ctx[3];

    			if (dirty & /*$$scope, confirmBtnText*/ 68) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};
    			if (dirty & /*backBtnEvent*/ 32) button1_changes.clickEvent = /*backBtnEvent*/ ctx[5];

    			if (dirty & /*$$scope, backBtnText*/ 80) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(button0);
    			destroy_component(button1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(15:4) <ModalContainer>",
    		ctx
    	});

    	return block;
    }

    // (14:0) <Modal {showFlag}>
    function create_default_slot$2(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, backBtnEvent, backBtnText, confirmBtnEvent, confirmBtnText, title*/ 125) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(14:0) <Modal {showFlag}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let modal;
    	let current;

    	modal = new Modal({
    			props: {
    				showFlag: /*showFlag*/ ctx[1],
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const modal_changes = {};
    			if (dirty & /*showFlag*/ 2) modal_changes.showFlag = /*showFlag*/ ctx[1];

    			if (dirty & /*$$scope, backBtnEvent, backBtnText, confirmBtnEvent, confirmBtnText, title*/ 125) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ConfirmActionModal', slots, []);

    	let { title = "", showFlag = false, confirmBtnText = "Подтвердить", confirmBtnEvent = () => {
    		
    	}, backBtnText = "Назад", backBtnEvent = () => {
    		
    	} } = $$props;

    	const writable_props = [
    		'title',
    		'showFlag',
    		'confirmBtnText',
    		'confirmBtnEvent',
    		'backBtnText',
    		'backBtnEvent'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ConfirmActionModal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('showFlag' in $$props) $$invalidate(1, showFlag = $$props.showFlag);
    		if ('confirmBtnText' in $$props) $$invalidate(2, confirmBtnText = $$props.confirmBtnText);
    		if ('confirmBtnEvent' in $$props) $$invalidate(3, confirmBtnEvent = $$props.confirmBtnEvent);
    		if ('backBtnText' in $$props) $$invalidate(4, backBtnText = $$props.backBtnText);
    		if ('backBtnEvent' in $$props) $$invalidate(5, backBtnEvent = $$props.backBtnEvent);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Modal,
    		ModalContainer,
    		title,
    		showFlag,
    		confirmBtnText,
    		confirmBtnEvent,
    		backBtnText,
    		backBtnEvent
    	});

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate(0, title = $$props.title);
    		if ('showFlag' in $$props) $$invalidate(1, showFlag = $$props.showFlag);
    		if ('confirmBtnText' in $$props) $$invalidate(2, confirmBtnText = $$props.confirmBtnText);
    		if ('confirmBtnEvent' in $$props) $$invalidate(3, confirmBtnEvent = $$props.confirmBtnEvent);
    		if ('backBtnText' in $$props) $$invalidate(4, backBtnText = $$props.backBtnText);
    		if ('backBtnEvent' in $$props) $$invalidate(5, backBtnEvent = $$props.backBtnEvent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [title, showFlag, confirmBtnText, confirmBtnEvent, backBtnText, backBtnEvent];
    }

    class ConfirmActionModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			title: 0,
    			showFlag: 1,
    			confirmBtnText: 2,
    			confirmBtnEvent: 3,
    			backBtnText: 4,
    			backBtnEvent: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ConfirmActionModal",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get title() {
    		throw new Error("<ConfirmActionModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ConfirmActionModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showFlag() {
    		throw new Error("<ConfirmActionModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showFlag(value) {
    		throw new Error("<ConfirmActionModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get confirmBtnText() {
    		throw new Error("<ConfirmActionModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set confirmBtnText(value) {
    		throw new Error("<ConfirmActionModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get confirmBtnEvent() {
    		throw new Error("<ConfirmActionModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set confirmBtnEvent(value) {
    		throw new Error("<ConfirmActionModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backBtnText() {
    		throw new Error("<ConfirmActionModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backBtnText(value) {
    		throw new Error("<ConfirmActionModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get backBtnEvent() {
    		throw new Error("<ConfirmActionModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set backBtnEvent(value) {
    		throw new Error("<ConfirmActionModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\pages\Presets.svelte generated by Svelte v3.48.0 */

    const { Object: Object_1 } = globals;
    const file$1 = "src\\pages\\Presets.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	child_ctx[22] = i;
    	return child_ctx;
    }

    // (162:0) {:else}
    function create_else_block_1(ctx) {
    	let manualdistribution;
    	let current;

    	manualdistribution = new ManualDistribution({
    			props: {
    				confirmBtnText: "Создать пресет",
    				confirmBtnEvent: /*onSavePreset*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(manualdistribution.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(manualdistribution, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(manualdistribution.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(manualdistribution.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(manualdistribution, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(162:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (109:0) {#if !createPresetFlag}
    function create_if_block_1(ctx) {
    	let layout;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, modalParamsCreatePreset, savedPresets*/ 8388613) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(109:0) {#if !createPresetFlag}",
    		ctx
    	});

    	return block;
    }

    // (146:20) {:else}
    function create_else_block(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Вы ещё не создали ни одного пресета";
    			attr_dev(p, "class", "emptyPresets svelte-e3boo3");
    			add_location(p, file$1, 146, 24, 6155);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(146:20) {:else}",
    		ctx
    	});

    	return block;
    }

    // (116:20) {#if savedPresets.length > 0}
    function create_if_block_2(ctx) {
    	let table;
    	let current;

    	table = new Table({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(table.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(table, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const table_changes = {};

    			if (dirty & /*$$scope, savedPresets*/ 8388609) {
    				table_changes.$$scope = { dirty, ctx };
    			}

    			table.$set(table_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(table.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(table.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(table, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(116:20) {#if savedPresets.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (122:28) {#each savedPresets as preset, idx}
    function create_each_block_1(ctx) {
    	let tr;
    	let td0;
    	let t0_value = /*preset*/ ctx[18].name + "";
    	let t0;
    	let t1;
    	let td1;
    	let button0;
    	let t3;
    	let button1;
    	let t5;
    	let tr_transition;
    	let current;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[9](/*idx*/ ctx[22]);
    	}

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[10](/*idx*/ ctx[22]);
    	}

    	function click_handler_2() {
    		return /*click_handler_2*/ ctx[11](/*idx*/ ctx[22]);
    	}

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			td0 = element("td");
    			t0 = text(t0_value);
    			t1 = space();
    			td1 = element("td");
    			button0 = element("button");
    			button0.textContent = "Инфо";
    			t3 = space();
    			button1 = element("button");
    			button1.textContent = "Удалить";
    			t5 = space();
    			add_location(td0, file$1, 123, 36, 4955);
    			attr_dev(button0, "class", "infoPresetBtn svelte-e3boo3");
    			add_location(button0, file$1, 127, 40, 5190);
    			attr_dev(button1, "class", "deletePresetBtn svelte-e3boo3");
    			add_location(button1, file$1, 134, 40, 5586);
    			attr_dev(td1, "align", "right");
    			add_location(td1, file$1, 126, 36, 5130);
    			add_location(tr, file$1, 122, 32, 4870);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);
    			append_dev(tr, td0);
    			append_dev(td0, t0);
    			append_dev(tr, t1);
    			append_dev(tr, td1);
    			append_dev(td1, button0);
    			append_dev(td1, t3);
    			append_dev(td1, button1);
    			append_dev(tr, t5);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(td0, "click", click_handler, false, false, false),
    					listen_dev(button0, "click", click_handler_1, false, false, false),
    					listen_dev(button1, "click", click_handler_2, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*savedPresets*/ 1) && t0_value !== (t0_value = /*preset*/ ctx[18].name + "")) set_data_dev(t0, t0_value);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!tr_transition) tr_transition = create_bidirectional_transition(tr, fly, { y: 100, duration: 200 }, true);
    				tr_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!tr_transition) tr_transition = create_bidirectional_transition(tr, fly, { y: 100, duration: 200 }, false);
    			tr_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (detaching && tr_transition) tr_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(122:28) {#each savedPresets as preset, idx}",
    		ctx
    	});

    	return block;
    }

    // (117:24) <Table>
    function create_default_slot_4(ctx) {
    	let thead;
    	let th0;
    	let t1;
    	let th1;
    	let t3;
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*savedPresets*/ ctx[0];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			th0 = element("th");
    			th0.textContent = "Название";
    			t1 = space();
    			th1 = element("th");
    			th1.textContent = "Действия";
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			attr_dev(th0, "align", "left");
    			add_location(th0, file$1, 118, 32, 4638);
    			attr_dev(th1, "align", "right");
    			add_location(th1, file$1, 119, 32, 4702);
    			add_location(thead, file$1, 117, 28, 4597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);
    			append_dev(thead, th0);
    			append_dev(thead, t1);
    			append_dev(thead, th1);
    			insert_dev(target, t3, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*viewModalDeletePreset, viewModalInfoPreset, onLoadPreset, savedPresets*/ 417) {
    				each_value_1 = /*savedPresets*/ ctx[0];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (detaching) detach_dev(t3);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(117:24) <Table>",
    		ctx
    	});

    	return block;
    }

    // (111:8) <Container>
    function create_default_slot_3(ctx) {
    	let div2;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let div1;
    	let current_block_type_index;
    	let if_block;
    	let t3;
    	let div0;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_2, create_else_block];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*savedPresets*/ ctx[0].length > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Пресеты";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div1 = element("div");
    			if_block.c();
    			t3 = space();
    			div0 = element("div");
    			div0.textContent = "Добавить новый пресет";
    			add_location(h1, file$1, 112, 16, 4404);
    			add_location(hr, file$1, 113, 16, 4438);
    			attr_dev(div0, "class", "addPresetBtn svelte-e3boo3");
    			add_location(div0, file$1, 150, 20, 6323);
    			attr_dev(div1, "class", "presets svelte-e3boo3");
    			add_location(div1, file$1, 114, 16, 4462);
    			add_location(div2, file$1, 111, 12, 4381);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, h1);
    			append_dev(div2, t1);
    			append_dev(div2, hr);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			if_blocks[current_block_type_index].m(div1, null);
    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*click_handler_3*/ ctx[12], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div1, t3);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(111:8) <Container>",
    		ctx
    	});

    	return block;
    }

    // (110:4) <Layout>
    function create_default_slot_2$1(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope, modalParamsCreatePreset, savedPresets*/ 8388613) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(110:4) <Layout>",
    		ctx
    	});

    	return block;
    }

    // (185:24) {#if preset[1] > 0}
    function create_if_block(ctx) {
    	let li;
    	let t0_value = (allCardsList()[/*preset*/ ctx[18][0]]?.name || "Неизвестная роль") + "";
    	let t0;
    	let t1;
    	let t2_value = /*preset*/ ctx[18][1] + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(" : ");
    			t2 = text(t2_value);
    			t3 = text(" шт.\r\n                            ");
    			attr_dev(li, "class", "svelte-e3boo3");
    			add_location(li, file$1, 185, 28, 7509);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    			append_dev(li, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*savedPresets, presetDetails*/ 17 && t0_value !== (t0_value = (allCardsList()[/*preset*/ ctx[18][0]]?.name || "Неизвестная роль") + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*savedPresets, presetDetails*/ 17 && t2_value !== (t2_value = /*preset*/ ctx[18][1] + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(185:24) {#if preset[1] > 0}",
    		ctx
    	});

    	return block;
    }

    // (184:20) {#each Object.entries(savedPresets[presetDetails.idxPreset].cards) as preset}
    function create_each_block(ctx) {
    	let if_block_anchor;
    	let if_block = /*preset*/ ctx[18][1] > 0 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*preset*/ ctx[18][1] > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(184:20) {#each Object.entries(savedPresets[presetDetails.idxPreset].cards) as preset}",
    		ctx
    	});

    	return block;
    }

    // (175:4) <ModalContainer customStyle="padding: 5px 30px 25px 30px;">
    function create_default_slot_1$1(ctx) {
    	let div;
    	let h2;
    	let t1;
    	let p;
    	let t3;
    	let nav;
    	let ul;
    	let each_value = Object.entries(/*savedPresets*/ ctx[0][/*presetDetails*/ ctx[4].idxPreset].cards);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			h2.textContent = "Информация о ролях:";
    			t1 = space();
    			p = element("p");
    			p.textContent = "Здесь хранится информация о ролях, которые сохранены в выбранном\r\n                вами пресете.";
    			t3 = space();
    			nav = element("nav");
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-e3boo3");
    			add_location(h2, file$1, 176, 12, 7118);
    			attr_dev(p, "class", "svelte-e3boo3");
    			add_location(p, file$1, 177, 12, 7160);
    			add_location(ul, file$1, 182, 16, 7331);
    			attr_dev(nav, "class", "svelte-e3boo3");
    			add_location(nav, file$1, 181, 12, 7308);
    			attr_dev(div, "class", "modalArea svelte-e3boo3");
    			add_location(div, file$1, 175, 8, 7081);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(div, t3);
    			append_dev(div, nav);
    			append_dev(nav, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*Object, savedPresets, presetDetails, allCardsList*/ 17) {
    				each_value = Object.entries(/*savedPresets*/ ctx[0][/*presetDetails*/ ctx[4].idxPreset].cards);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(175:4) <ModalContainer customStyle=\\\"padding: 5px 30px 25px 30px;\\\">",
    		ctx
    	});

    	return block;
    }

    // (171:0) <Modal      showFlag={presetDetails.showFlag}      clickEvent={() => (presetDetails.showFlag = false)}  >
    function create_default_slot$1(ctx) {
    	let modalcontainer;
    	let current;

    	modalcontainer = new ModalContainer({
    			props: {
    				customStyle: "padding: 5px 30px 25px 30px;",
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(modalcontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(modalcontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const modalcontainer_changes = {};

    			if (dirty & /*$$scope, savedPresets, presetDetails*/ 8388625) {
    				modalcontainer_changes.$$scope = { dirty, ctx };
    			}

    			modalcontainer.$set(modalcontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(modalcontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(modalcontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(modalcontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(171:0) <Modal      showFlag={presetDetails.showFlag}      clickEvent={() => (presetDetails.showFlag = false)}  >",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let t0;
    	let textinputmodal;
    	let t1;
    	let confirmactionmodal;
    	let t2;
    	let modal;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*createPresetFlag*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	const textinputmodal_spread_levels = [/*modalParamsCreatePreset*/ ctx[2]];
    	let textinputmodal_props = {};

    	for (let i = 0; i < textinputmodal_spread_levels.length; i += 1) {
    		textinputmodal_props = assign(textinputmodal_props, textinputmodal_spread_levels[i]);
    	}

    	textinputmodal = new TextInputModal({
    			props: textinputmodal_props,
    			$$inline: true
    		});

    	const confirmactionmodal_spread_levels = [/*modalParamsDeletePreset*/ ctx[3]];
    	let confirmactionmodal_props = {};

    	for (let i = 0; i < confirmactionmodal_spread_levels.length; i += 1) {
    		confirmactionmodal_props = assign(confirmactionmodal_props, confirmactionmodal_spread_levels[i]);
    	}

    	confirmactionmodal = new ConfirmActionModal({
    			props: confirmactionmodal_props,
    			$$inline: true
    		});

    	modal = new Modal({
    			props: {
    				showFlag: /*presetDetails*/ ctx[4].showFlag,
    				clickEvent: /*func*/ ctx[13],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			if_block.c();
    			t0 = space();
    			create_component(textinputmodal.$$.fragment);
    			t1 = space();
    			create_component(confirmactionmodal.$$.fragment);
    			t2 = space();
    			create_component(modal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(textinputmodal, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(confirmactionmodal, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(modal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(t0.parentNode, t0);
    			}

    			const textinputmodal_changes = (dirty & /*modalParamsCreatePreset*/ 4)
    			? get_spread_update(textinputmodal_spread_levels, [get_spread_object(/*modalParamsCreatePreset*/ ctx[2])])
    			: {};

    			textinputmodal.$set(textinputmodal_changes);

    			const confirmactionmodal_changes = (dirty & /*modalParamsDeletePreset*/ 8)
    			? get_spread_update(confirmactionmodal_spread_levels, [get_spread_object(/*modalParamsDeletePreset*/ ctx[3])])
    			: {};

    			confirmactionmodal.$set(confirmactionmodal_changes);
    			const modal_changes = {};
    			if (dirty & /*presetDetails*/ 16) modal_changes.showFlag = /*presetDetails*/ ctx[4].showFlag;
    			if (dirty & /*presetDetails*/ 16) modal_changes.clickEvent = /*func*/ ctx[13];

    			if (dirty & /*$$scope, savedPresets, presetDetails*/ 8388625) {
    				modal_changes.$$scope = { dirty, ctx };
    			}

    			modal.$set(modal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(textinputmodal.$$.fragment, local);
    			transition_in(confirmactionmodal.$$.fragment, local);
    			transition_in(modal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			transition_out(textinputmodal.$$.fragment, local);
    			transition_out(confirmactionmodal.$$.fragment, local);
    			transition_out(modal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(textinputmodal, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(confirmactionmodal, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(modal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $selectedCardsStore;
    	validate_store(selectedCardsStore, 'selectedCardsStore');
    	component_subscribe($$self, selectedCardsStore, $$value => $$invalidate(14, $selectedCardsStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Presets', slots, []);
    	let savedPresets = JSON.parse(localStorage.getItem("presets")) || [];

    	function updateSavedPresets() {
    		$$invalidate(0, savedPresets = JSON.parse(localStorage.getItem("presets")) || []);
    	}

    	//Загрузить пресет на выдачу
    	function onLoadPreset(idx) {
    		selectedCardsStore.loadCustomCardsList(savedPresets[idx].cards);
    		navigateTo("preview-distribution");
    	}

    	let createPresetFlag = false; //Флаг состояния создания пресета (если true - пользователь попадает на страницу выбора ролей для пресета)

    	//Параметры модалки создания нового пресета
    	let modalParamsCreatePreset = {
    		showFlag: false,
    		labelName: "Название пресета",
    		inputValue: "",
    		changeInputEvent: e => $$invalidate(2, modalParamsCreatePreset.inputValue = e.target.value, modalParamsCreatePreset),
    		confirmBtnText: "Сохранить",
    		confirmBtnEvent: onCreatePreset,
    		backBtnEvent: () => $$invalidate(2, modalParamsCreatePreset.showFlag = false, modalParamsCreatePreset),
    		errorFlag: false,
    		errorText: "Название пресета должно содержать минимум 1 и максимум 255 символов. Также нельзя создать два пресета с одинаковыми названиями"
    	};

    	//Вызов селектора выбора ролей для создания пресета
    	function onCreatePreset() {
    		let checkSamePresets = savedPresets.filter(item => item.name !== modalParamsCreatePreset.inputValue);
    		$$invalidate(2, modalParamsCreatePreset.errorFlag = false, modalParamsCreatePreset);

    		if (modalParamsCreatePreset.inputValue.length > 0 && modalParamsCreatePreset.inputValue.length < 255 && checkSamePresets.length === savedPresets.length) {
    			$$invalidate(2, modalParamsCreatePreset.showFlag = false, modalParamsCreatePreset);
    			$$invalidate(1, createPresetFlag = true);
    		} else {
    			$$invalidate(2, modalParamsCreatePreset.errorFlag = true, modalParamsCreatePreset);
    		}
    	}

    	//Сохранение пресета в хранилище
    	function onSavePreset() {
    		presetsStore.createPreset(modalParamsCreatePreset.inputValue, $selectedCardsStore.cards);
    		$$invalidate(1, createPresetFlag = false);
    		$$invalidate(2, modalParamsCreatePreset.inputValue = "", modalParamsCreatePreset);
    		selectedCardsStore.reinit();
    		updateSavedPresets();
    		notificationStore.createNotification("Оповещение", "Пресет создан");
    	}

    	//Параметры показа модалки удаления пресета
    	let modalParamsDeletePreset = {
    		showFlag: false,
    		title: "Вы точно хотите удалить пресет?",
    		confirmBtnText: "Удалить",
    		confirmBtnEvent: onDeletePreset,
    		backBtnEvent: () => {
    			$$invalidate(3, modalParamsDeletePreset.showFlag = false, modalParamsDeletePreset);
    		},
    		idxPreset: 0
    	};

    	//Удалить пресет по клику на кнопку внутри модалки
    	function onDeletePreset() {
    		presetsStore.deletePreset(modalParamsDeletePreset.idxPreset);
    		$$invalidate(3, modalParamsDeletePreset.showFlag = false, modalParamsDeletePreset);
    		$$invalidate(3, modalParamsDeletePreset.idxPreset = 0, modalParamsDeletePreset);
    		updateSavedPresets();
    	}

    	function viewModalDeletePreset(idx) {
    		$$invalidate(3, modalParamsDeletePreset.showFlag = true, modalParamsDeletePreset);
    		$$invalidate(3, modalParamsDeletePreset.idxPreset = idx, modalParamsDeletePreset);
    	}

    	//Переменная модалки с инфо о пресете (кол-во ролей)
    	let presetDetails = { showFlag: false, idxPreset: 0 };

    	function viewModalInfoPreset(idx) {
    		$$invalidate(4, presetDetails.showFlag = true, presetDetails);
    		$$invalidate(4, presetDetails.idxPreset = idx, presetDetails);
    	}

    	const writable_props = [];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Presets> was created with unknown prop '${key}'`);
    	});

    	const click_handler = idx => onLoadPreset(idx);
    	const click_handler_1 = idx => viewModalInfoPreset(idx);
    	const click_handler_2 = idx => viewModalDeletePreset(idx);
    	const click_handler_3 = () => $$invalidate(2, modalParamsCreatePreset.showFlag = true, modalParamsCreatePreset);
    	const func = () => $$invalidate(4, presetDetails.showFlag = false, presetDetails);

    	$$self.$capture_state = () => ({
    		fly,
    		Container,
    		Layout,
    		Table,
    		allCardsList,
    		ManualDistribution,
    		presetsStore,
    		navigateTo,
    		notificationStore,
    		selectedCardsStore,
    		TextInputModal,
    		Modal,
    		ModalContainer,
    		ConfirmActionModal,
    		savedPresets,
    		updateSavedPresets,
    		onLoadPreset,
    		createPresetFlag,
    		modalParamsCreatePreset,
    		onCreatePreset,
    		onSavePreset,
    		modalParamsDeletePreset,
    		onDeletePreset,
    		viewModalDeletePreset,
    		presetDetails,
    		viewModalInfoPreset,
    		$selectedCardsStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('savedPresets' in $$props) $$invalidate(0, savedPresets = $$props.savedPresets);
    		if ('createPresetFlag' in $$props) $$invalidate(1, createPresetFlag = $$props.createPresetFlag);
    		if ('modalParamsCreatePreset' in $$props) $$invalidate(2, modalParamsCreatePreset = $$props.modalParamsCreatePreset);
    		if ('modalParamsDeletePreset' in $$props) $$invalidate(3, modalParamsDeletePreset = $$props.modalParamsDeletePreset);
    		if ('presetDetails' in $$props) $$invalidate(4, presetDetails = $$props.presetDetails);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		savedPresets,
    		createPresetFlag,
    		modalParamsCreatePreset,
    		modalParamsDeletePreset,
    		presetDetails,
    		onLoadPreset,
    		onSavePreset,
    		viewModalDeletePreset,
    		viewModalInfoPreset,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		func
    	];
    }

    class Presets extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Presets",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    function createStore() {
        const { set, update, subscribe } = writable({
            activeNight: 0,
            notesList: [],
        });

        return {
            update,
            subscribe,
            onChangeNote: (noteName, text) => {
                const notes = get_store_value(notesStore).notesList;
                const activeNight = get_store_value(notesStore).activeNight;
                if (notes[activeNight] === undefined) {
                    notes[activeNight] = {};
                }
                notes[activeNight][noteName] = text;
                update((prev) => {
                    return {
                        ...prev,
                        notesList: notes,
                    };
                });
            },
            changeActiveNight: (newNightValue) => {
                update((prev) => {
                    return {
                        ...prev,
                        activeNight: newNightValue,
                    };
                });
            },
            clearAllNotes: () => {
                set({ activeNight: 0, notesList: [] });
            },
        };
    }

    const notesStore = createStore();

    /* src\pages\Notes.svelte generated by Svelte v3.48.0 */
    const file = "src\\pages\\Notes.svelte";

    // (49:8) <Transition              {showFlag}              mountClass={"noteMounted"}              unmountClass={"noteUnmounted"}              unmountDuration={200}          >
    function create_default_slot_2(ctx) {
    	let div7;
    	let div4;
    	let div0;
    	let h30;
    	let t1;
    	let textarea0;
    	let t2;
    	let div1;
    	let h31;
    	let t4;
    	let textarea1;
    	let t5;
    	let div2;
    	let h32;
    	let t7;
    	let textarea2;
    	let t8;
    	let div3;
    	let h33;
    	let t10;
    	let textarea3;
    	let t11;
    	let div6;
    	let span;
    	let t12;
    	let t13_value = /*$notesStore*/ ctx[0].activeNight + "";
    	let t13;
    	let t14;
    	let div5;
    	let button0;
    	let t16;
    	let button1;
    	let t18;
    	let button2;
    	let current;
    	let mounted;
    	let dispose;

    	textarea0 = new Textarea({
    			props: {
    				value: /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.kills || "",
    				onChange: /*func*/ ctx[3]
    			},
    			$$inline: true
    		});

    	textarea1 = new Textarea({
    			props: {
    				value: /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.checks || "",
    				onChange: /*func_1*/ ctx[4]
    			},
    			$$inline: true
    		});

    	textarea2 = new Textarea({
    			props: {
    				value: /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.hills || "",
    				onChange: /*func_2*/ ctx[5]
    			},
    			$$inline: true
    		});

    	textarea3 = new Textarea({
    			props: {
    				value: /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.other || "",
    				onChange: /*func_3*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Мафия убила:";
    			t1 = space();
    			create_component(textarea0.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Коммиссар проверил:";
    			t4 = space();
    			create_component(textarea1.$$.fragment);
    			t5 = space();
    			div2 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Доктор вылечил:";
    			t7 = space();
    			create_component(textarea2.$$.fragment);
    			t8 = space();
    			div3 = element("div");
    			h33 = element("h3");
    			h33.textContent = "Другое:";
    			t10 = space();
    			create_component(textarea3.$$.fragment);
    			t11 = space();
    			div6 = element("div");
    			span = element("span");
    			t12 = text("Текущая ночь: ");
    			t13 = text(t13_value);
    			t14 = space();
    			div5 = element("div");
    			button0 = element("button");
    			button0.textContent = `${`<`}`;
    			t16 = space();
    			button1 = element("button");
    			button1.textContent = "Очистить все поля";
    			t18 = space();
    			button2 = element("button");
    			button2.textContent = `${`>`}`;
    			attr_dev(h30, "class", "svelte-47lkgc");
    			add_location(h30, file, 57, 24, 1766);
    			attr_dev(div0, "class", "note svelte-47lkgc");
    			add_location(div0, file, 56, 20, 1722);
    			attr_dev(h31, "class", "svelte-47lkgc");
    			add_location(h31, file, 70, 24, 2343);
    			attr_dev(div1, "class", "note svelte-47lkgc");
    			add_location(div1, file, 69, 20, 2299);
    			attr_dev(h32, "class", "svelte-47lkgc");
    			add_location(h32, file, 83, 24, 2929);
    			attr_dev(div2, "class", "note svelte-47lkgc");
    			add_location(div2, file, 82, 20, 2885);
    			attr_dev(h33, "class", "svelte-47lkgc");
    			add_location(h33, file, 96, 24, 3509);
    			attr_dev(div3, "class", "note svelte-47lkgc");
    			add_location(div3, file, 95, 20, 3465);
    			attr_dev(div4, "class", "notes svelte-47lkgc");
    			add_location(div4, file, 55, 16, 1681);
    			attr_dev(span, "class", "activeNight svelte-47lkgc");
    			add_location(span, file, 110, 20, 4100);
    			attr_dev(button0, "class", "prevBtn svelte-47lkgc");
    			toggle_class(button0, "disabled", /*$notesStore*/ ctx[0].activeNight === 0);
    			add_location(button0, file, 114, 24, 4297);
    			attr_dev(button1, "class", "clearAllFields svelte-47lkgc");
    			add_location(button1, file, 124, 24, 4757);
    			attr_dev(button2, "class", "nextBtn svelte-47lkgc");
    			toggle_class(button2, "disabled", /*$notesStore*/ ctx[0].activeNight >= 100);
    			add_location(button2, file, 129, 24, 5001);
    			attr_dev(div5, "class", "prevNextButtons svelte-47lkgc");
    			add_location(div5, file, 113, 20, 4242);
    			attr_dev(div6, "class", "actions svelte-47lkgc");
    			add_location(div6, file, 109, 16, 4057);
    			attr_dev(div7, "class", "notesContainer svelte-47lkgc");
    			add_location(div7, file, 54, 12, 1635);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div4);
    			append_dev(div4, div0);
    			append_dev(div0, h30);
    			append_dev(div0, t1);
    			mount_component(textarea0, div0, null);
    			append_dev(div4, t2);
    			append_dev(div4, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t4);
    			mount_component(textarea1, div1, null);
    			append_dev(div4, t5);
    			append_dev(div4, div2);
    			append_dev(div2, h32);
    			append_dev(div2, t7);
    			mount_component(textarea2, div2, null);
    			append_dev(div4, t8);
    			append_dev(div4, div3);
    			append_dev(div3, h33);
    			append_dev(div3, t10);
    			mount_component(textarea3, div3, null);
    			append_dev(div7, t11);
    			append_dev(div7, div6);
    			append_dev(div6, span);
    			append_dev(span, t12);
    			append_dev(span, t13);
    			append_dev(div6, t14);
    			append_dev(div6, div5);
    			append_dev(div5, button0);
    			append_dev(div5, t16);
    			append_dev(div5, button1);
    			append_dev(div5, t18);
    			append_dev(div5, button2);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[7], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[8], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const textarea0_changes = {};
    			if (dirty & /*$notesStore*/ 1) textarea0_changes.value = /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.kills || "";
    			textarea0.$set(textarea0_changes);
    			const textarea1_changes = {};
    			if (dirty & /*$notesStore*/ 1) textarea1_changes.value = /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.checks || "";
    			textarea1.$set(textarea1_changes);
    			const textarea2_changes = {};
    			if (dirty & /*$notesStore*/ 1) textarea2_changes.value = /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.hills || "";
    			textarea2.$set(textarea2_changes);
    			const textarea3_changes = {};
    			if (dirty & /*$notesStore*/ 1) textarea3_changes.value = /*$notesStore*/ ctx[0].notesList[/*$notesStore*/ ctx[0].activeNight]?.other || "";
    			textarea3.$set(textarea3_changes);
    			if ((!current || dirty & /*$notesStore*/ 1) && t13_value !== (t13_value = /*$notesStore*/ ctx[0].activeNight + "")) set_data_dev(t13, t13_value);

    			if (dirty & /*$notesStore*/ 1) {
    				toggle_class(button0, "disabled", /*$notesStore*/ ctx[0].activeNight === 0);
    			}

    			if (dirty & /*$notesStore*/ 1) {
    				toggle_class(button2, "disabled", /*$notesStore*/ ctx[0].activeNight >= 100);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textarea0.$$.fragment, local);
    			transition_in(textarea1.$$.fragment, local);
    			transition_in(textarea2.$$.fragment, local);
    			transition_in(textarea3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textarea0.$$.fragment, local);
    			transition_out(textarea1.$$.fragment, local);
    			transition_out(textarea2.$$.fragment, local);
    			transition_out(textarea3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			destroy_component(textarea0);
    			destroy_component(textarea1);
    			destroy_component(textarea2);
    			destroy_component(textarea3);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(49:8) <Transition              {showFlag}              mountClass={\\\"noteMounted\\\"}              unmountClass={\\\"noteUnmounted\\\"}              unmountDuration={200}          >",
    		ctx
    	});

    	return block;
    }

    // (44:4) <Container>
    function create_default_slot_1(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let transition;
    	let current;

    	transition = new Transition({
    			props: {
    				showFlag: /*showFlag*/ ctx[2],
    				mountClass: "noteMounted",
    				unmountClass: "noteUnmounted",
    				unmountDuration: 200,
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Заметки";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			create_component(transition.$$.fragment);
    			add_location(h1, file, 45, 12, 1394);
    			add_location(hr, file, 46, 12, 1424);
    			add_location(div, file, 44, 8, 1375);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, hr);
    			insert_dev(target, t2, anchor);
    			mount_component(transition, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const transition_changes = {};
    			if (dirty & /*showFlag*/ 4) transition_changes.showFlag = /*showFlag*/ ctx[2];

    			if (dirty & /*$$scope, $notesStore, modalParams*/ 2051) {
    				transition_changes.$$scope = { dirty, ctx };
    			}

    			transition.$set(transition_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(transition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(transition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t2);
    			destroy_component(transition, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(44:4) <Container>",
    		ctx
    	});

    	return block;
    }

    // (43:0) <Layout>
    function create_default_slot(ctx) {
    	let container;
    	let current;

    	container = new Container({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(container.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(container, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const container_changes = {};

    			if (dirty & /*$$scope, showFlag, $notesStore, modalParams*/ 2055) {
    				container_changes.$$scope = { dirty, ctx };
    			}

    			container.$set(container_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(container.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(container.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(container, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(43:0) <Layout>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let layout;
    	let t;
    	let confirmactionmodal;
    	let current;

    	layout = new Layout({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const confirmactionmodal_spread_levels = [/*modalParams*/ ctx[1]];
    	let confirmactionmodal_props = {};

    	for (let i = 0; i < confirmactionmodal_spread_levels.length; i += 1) {
    		confirmactionmodal_props = assign(confirmactionmodal_props, confirmactionmodal_spread_levels[i]);
    	}

    	confirmactionmodal = new ConfirmActionModal({
    			props: confirmactionmodal_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(layout.$$.fragment);
    			t = space();
    			create_component(confirmactionmodal.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(layout, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(confirmactionmodal, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const layout_changes = {};

    			if (dirty & /*$$scope, showFlag, $notesStore, modalParams*/ 2055) {
    				layout_changes.$$scope = { dirty, ctx };
    			}

    			layout.$set(layout_changes);

    			const confirmactionmodal_changes = (dirty & /*modalParams*/ 2)
    			? get_spread_update(confirmactionmodal_spread_levels, [get_spread_object(/*modalParams*/ ctx[1])])
    			: {};

    			confirmactionmodal.$set(confirmactionmodal_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(layout.$$.fragment, local);
    			transition_in(confirmactionmodal.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(layout.$$.fragment, local);
    			transition_out(confirmactionmodal.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(layout, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(confirmactionmodal, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $notesStore;
    	validate_store(notesStore, 'notesStore');
    	component_subscribe($$self, notesStore, $$value => $$invalidate(0, $notesStore = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Notes', slots, []);

    	let modalParams = {
    		showFlag: false,
    		title: "Вы точно хотите очистить все поля?",
    		confirmBtnText: "Очистить",
    		confirmBtnEvent: onClearFields,
    		backBtnEvent: () => {
    			$$invalidate(1, modalParams.showFlag = false, modalParams);
    		}
    	};

    	function onClearFields() {
    		notesStore.clearAllNotes();
    		$$invalidate(1, modalParams.showFlag = false, modalParams);
    		notificationStore.createNotification("Оповещение", "Все текстовые поля успешно очищены");
    	}

    	//Флаг анимации перелистывания заметок
    	let showFlag = true;

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Notes> was created with unknown prop '${key}'`);
    	});

    	const func = e => notesStore.onChangeNote("kills", e.target.value);
    	const func_1 = e => notesStore.onChangeNote("checks", e.target.value);
    	const func_2 = e => notesStore.onChangeNote("hills", e.target.value);
    	const func_3 = e => notesStore.onChangeNote("other", e.target.value);
    	const click_handler = () => notesStore.changeActiveNight($notesStore.activeNight - 1);
    	const click_handler_1 = () => $$invalidate(1, modalParams.showFlag = true, modalParams);
    	const click_handler_2 = () => notesStore.changeActiveNight($notesStore.activeNight + 1);

    	$$self.$capture_state = () => ({
    		notesStore,
    		Layout,
    		Container,
    		Textarea,
    		notificationStore,
    		ConfirmActionModal,
    		Transition,
    		modalParams,
    		onClearFields,
    		showFlag,
    		$notesStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('modalParams' in $$props) $$invalidate(1, modalParams = $$props.modalParams);
    		if ('showFlag' in $$props) $$invalidate(2, showFlag = $$props.showFlag);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$notesStore*/ 1) {
    			{
    				if ($notesStore.activeNight + 1) {
    					$$invalidate(2, showFlag = false);

    					setTimeout(
    						() => {
    							$$invalidate(2, showFlag = true);
    						},
    						300
    					);
    				}
    			}
    		}
    	};

    	return [
    		$notesStore,
    		modalParams,
    		showFlag,
    		func,
    		func_1,
    		func_2,
    		func_3,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	];
    }

    class Notes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Notes",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    const routes = [
        {
            name: "/",
            component: MainPage,
        },
        {
            name: "home",
            component: HomePage,
        },
        {
            name: "404",
            path: "404",
            component: _404,
        },
        {
            name: "auto-distribution",
            component: AutoDistribution,
        },
        {
            name: "manual-distribution",
            component: ManualDistribution,
        },
        {
            name: "show-distribution",
            component: ShowDistribution,
        },
        {
            name: "preview-distribution",
            component: DistributionPreview,
        },
        {
            name: "history",
            component: HistoryDistribution,
        },
        {
            name: "settings",
            component: Settings,
        },
        {
            name: "help",
            component: Help,
        },
        {
            name: "rules",
            component: Rules,
        },
        {
            name: "presets",
            component: Presets,
        },
        {
            name: "notes",
            component: Notes,
        },
    ];

    /* src\App.svelte generated by Svelte v3.48.0 */

    function create_fragment(ctx) {
    	let router;
    	let t0;
    	let swipemenu;
    	let t1;
    	let notification;
    	let current;
    	router = new Router({ props: { routes }, $$inline: true });
    	swipemenu = new SwipeMenu({ $$inline: true });
    	notification = new Notification({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    			t0 = space();
    			create_component(swipemenu.$$.fragment);
    			t1 = space();
    			create_component(notification.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(swipemenu, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(notification, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			transition_in(swipemenu.$$.fragment, local);
    			transition_in(notification.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			transition_out(swipemenu.$$.fragment, local);
    			transition_out(notification.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(swipemenu, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(notification, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Router, Notification, SwipeMenu, routes });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
        intro: true,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
