import fs from 'fs';

function camelize(str){
  const arr = str.split('-');
  const capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
  return capital.join("");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const has = arr => Array.isArray(arr) && arr.length > 0;

const RESERVED_WORDS = ['children', 'localName', 'ref', 'style', 'className', 'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final', 'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import', 'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'];

/**
 * ATTRIBUTE/PROPERTY NAME CLASHES:
 * It could be the case that an attr/property are not correctly linked together (e.g.: the attr does not have a `fieldName` pointing
 * to the property). In that case, there will be two props passed to the React component function with the same name, which will break things
 * Make sure to document components correctly (in most cases, all you have to do is add an @attr jsdoc to the field)
 * 
 * Attrs and properties are distinguished by an attr's `fieldName`. If an attr has a `fieldName`, we ignore it as being an attribute, and
 * only use the property (which is whatever the `fieldName` points to). If an attr does not have a `fieldName`, we apply it as an attr
 * 
 * EVENTS:
 * `'selected-changed'` event expects a function passed as `onSelectedChanged` (we add the 'on', and we camelize and capitalize the event name)
 */

/** 
 * @TODO: `for` attr in skiplink, its a reserved keyword, maybe keep a list of reserved keywords and throw an error? 
 * 
 */
export default function reactify({exclude}) {
  return {
    name: 'reactify',
    packageLinkPhase({customElementsManifest}) {
      
      if(!fs.existsSync(`react`)) {
        fs.mkdirSync(`react`);
      }

      const components = [];
      customElementsManifest.modules.forEach(mod => {
        mod.declarations.forEach(dec => {
          if(!exclude.includes(dec.name) && (dec.customElement || dec.tagName)) {
            components.push(dec);
          }
        });
      });

      components.forEach(component => {
        let useEffect = false;
        const fields = component?.members?.filter(member => member.kind === 'field' && !member.static);
        const attributes = component?.attributes?.filter(attr => {
          if(RESERVED_WORDS.includes(attr.name)) {
            console.warn(`Attribute \`${attr.name}\` in custom element \`${component.name}\` is a reserved keyword and cannot be used. Skipping.`);
            return false;
          }
          return !attr.fieldName;
        });

        let params = [];
        component?.events?.forEach(event => {
          params.push(`on${capitalizeFirstLetter(camelize(event.name))}`)
        });

        fields?.forEach(member => {
          params.push(member.name);
        });

        attributes?.forEach(attr => {
          params.push(camelize(attr.name));
        });

        params = params?.join(', ');

        const events = component?.events?.map(event => `ref.current.addEventListener('${event.name}', on${capitalizeFirstLetter(camelize(event.name))});`);
        const attrs = attributes?.map(attr => `${attr.name}={${camelize(attr.name)}} `)
        const props = fields?.map(member => `if(${member.name}) ref.current.${member.name} = ${member.name};`);
        
        if(has(events) || has(props)) {
          useEffect = true;
        }

        const result = `
import React${useEffect ? ', {useEffect, useRef}' : ''} from "react";
import '@generic-components/components/${component.tagName.replace('generic-', '')}.js';

export function ${component.name}({children${params ? ',' : ''} ${params}}) {
  ${useEffect 
    ? `
  const ref = useRef(null);
  useEffect(() => {
    ${events?.join('\n    ')}
    ${props?.join('\n    ')}
  },[])
    `
    : ''
  }

  return (
    <${component.tagName} ${useEffect ? 'ref={ref}' : ''} ${attrs?.join(' ') || ''}>
      {children}
    </${component.tagName}>
  )
}
          `
        fs.writeFileSync(`react/${component.name}.jsx`, result);
      });

    }
  }
}