import React, { Fragment, useEffect, useState, useRef } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ThemeSwitch = ({ preserveRasters = false, storeKey = 'ThemeSwitch' }) => {

const cssString = `
    html { filter: invert(75%); background: #fefefe; }
    * { background-color: inherit }
  `;
const rasterCss =
'img:not([src*=".svg"]), video, [style*="url("] { filter: invert(100%) }';

/**
 * This function check support attribute [ filter: invert(100%) ] in browser
 */
const isDeclarationSupported = (property, value) => {
    const prop = property + ':',
    el = document.createElement('test'),
    mStyle = el.style;
    el.style.cssText = prop + value;
    return mStyle[property];
};

const supported = useRef(!!isDeclarationSupported('filter', 'invert(100%)'));

const [css, setCss] = useState(cssString);
const [ active, setActive ] = useState(
    localStorage.getItem(storeKey) === 'true' || (!localStorage.getItem(storeKey)
        && matchMedia('(prefers-color-scheme: light)').matches));



useEffect(() => {
    if (preserveRasters) {
      setCss(`${cssString} ${rasterCss}`);
    }
    return () => {
      setCss(cssString);
    };
  }, [preserveRasters]);

/**
 * Setting localStorage
 */
useEffect(() => {
    localStorage.setItem(storeKey, active)
}, [active, storeKey]);

/**
 * Toggle state theme
 */
const toggle = () => {
    setActive(a => !a);
}

    return (
        supported.current && (
        <Fragment>
            {active
                ? <FontAwesomeIcon
                    icon={faSun}
                    onClick={toggle}
                />
                : <FontAwesomeIcon
                    icon={faMoon}
                    onClick={toggle}
                />
            }
            <style media={active ? 'screen' : 'none'}>
            {active ? css.trim() : css}
            </style>
        </Fragment>
    ));
};

export default ThemeSwitch;
