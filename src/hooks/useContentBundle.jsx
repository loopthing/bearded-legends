import isComponent from '@utils/isComponent';
import Logger from '@utils/Logger';
import noop from '@utils/noop';
import stringToTemplate from '@utils/stringToTemplate';
import merge from 'mout/object/merge';
import { renderToString } from 'react-dom/server';

/**
 * Usage)
 *
 *  My.jsx
 *  ------
 *  import appContent from '@content/Global.yaml';
 *  import myContent from './My.yaml';
 *
 *  export default function My(props) {
 *    const b = useContentBundle(appContent, myContent);
 *
 *    return (
 *      <b.Greeting name={"World"} />
 *    );
 *  }
 *
 *  Global.yaml
 *  --------
 *  en:
 *    Greeting: Hello, ${name}!
 *  es:
 *    Greeting: ¡Hola, ${name}!
 *
 *  My.yaml
 *  -------
 *  en:
 *    Greeting: Hi, ${name}!
 *
 * In above example, My.yaml will generally supersede Global.yaml while giving
 * localized content precedence.
 *
 * A user in 'en' locale (default) will see Hi, World!
 * A user in 'es' locale will see ¡Hola, World!
 * A user in 'de' locale will see Hi, World!
 *
 * This is because there is en specific content in My.yaml overriding Global.yaml,
 * but for es locale, My.yaml does not have any es specific content to override
 * the one provided by Global.yaml.
 *
 * @deprecated Replaced by @hooks/useContent
 */
export default function useContentBundle(...bundles) {
  const logger = new Logger('useContentBundle');
  const [lang] = navigator.language.split('-');

  const defaultBundle = bundles.reduce(
    (result, bundle) => merge(result, bundle.en),
    {},
  );

  const localeBundle = bundles.reduce(
    (result, bundle) => merge(result, bundle[lang]),
    {},
  );

  const bundle = merge(defaultBundle, localeBundle);

  return traverse(bundle);

  function traverse(object, callback, ...scope) {
    if (typeof object !== 'object' || object === null) {
      return object;
    }

    Object.entries(object).forEach(([key, value]) => {
      if (typeof value === 'string') {
        object[key] = (props) => renderContent(value, props);
      } else {
        object[key] = traverse(value, callback, ...scope, key);
      }
    });

    return new Proxy(object, {
      get: function (target, prop) {
        if (prop in target) {
          return target[prop];
        }

        logger.warn(
          `${scope.concat(prop).join('.')} not found. Computed bundle`,
          bundle,
        );
        return noop;
      },
    });
  }

  function renderContent(string, props) {
    const values =
      props &&
      Object.entries(props).reduce((results, [key, value]) => {
        if (isComponent(value)) {
          results[key] = renderToString(value);
        } else {
          results[key] = value;
        }
        return results;
      }, {});

    return stringToTemplate(string, values);
  }
}
