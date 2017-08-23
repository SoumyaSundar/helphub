/* Imports postcss */
var postcss = require('postcss');

/* This custom PostCSS code walks over every CSS class and:
   1. Searches for CSS variables (ie: .themeRed { --myVariable: red } .themeBlue { --myVariable: blue })
   2. Searches for CSS classes that uses those variables (ie: .myButton { background-color: var(--myVariable)} )
   3. Transforms classes that uses thoses variables so:

   :root { --myVariable: gray }
   .themeRed { --myVariable: red }
   .themeBlue { --myVariable: blue }
   .myButton { background-color: var(--myVariable); border: none }

   becomes:

   .myButton { background-color: gray; border: none }
   .themeRed .myButton { background-color: red; border: none }
   .themeBlue .myButton { background-color: blue; border: none }

   Optionally set cssModules as true in this module configuration in webpack config
   for it to support CSS Modules (so after transformation it becomes
   :global(themeRed) .myButton { ... })
*/

//var root = postcss.parse(':root { --myVariable: gray; } .themeRed { --myVariable: red } .themeBlue { --myVariable: blue } .myButton.yeahyeah,       .myButton.ohno { background-color: var(--myVariable); border: none }');

/* Replace all ocurrances of a text inside a string */
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

/* Plugin code */
module.exports = postcss.plugin('postcss-variables', function (opts) {
  opts = opts || {};

  return function (root) {
    //First step is to store the custom variables values
    const variables = {};
    root.each(function(node) {
      if (!node.each) { return }

      //Stores the node name and iterates over its properties
      const nodeName = node.selector;
      let hasVariable = false;
      node.each(function(prop) {
        //Stores the property name and value
        const propName = prop.prop;
        const propValue = prop.value;
        if (!propName || !propValue) { return; }

        //Found a custom variable declaration
        if (propName.substr(0, 2) === '--') {
          variables[nodeName] = variables[nodeName] || {};
          variables[nodeName][propName] = propValue;
          //Remove the property
          hasVariable = true;
          prop.remove();
        }
      });
      //If its now empty remove
      if (node.nodes.length === 0 && hasVariable) { node.remove(); }
    });

    //Pre-process the variables and do replacements when there are variables inside variables
    Object.keys(variables).forEach(function(className) {
      Object.keys(variables[className]).forEach(function(variableName) {
        Object.keys(variables[className]).forEach(function(variableName2) {
          variables[className][variableName] =
            variables[className][variableName].replaceAll('var(' + variableName2 + ')',
              variables[className][variableName2])
        });
      });
    });

    //Second step is to do the transformation
    //Iterate over all the nodes and its properties
    root.each(function(node) {
      if (!node.each) { return }

      const clones = {};
      node.each(function(prop) {
        if (!prop.prop || !prop.value) { return }

        //In case the property contains a custom variable
        if (prop.value.indexOf('var(') !== -1) {
          //Iterates over the node with variables and its variables
          Object.keys(variables).forEach(function(nodeName) {
            Object.keys(variables[nodeName]).forEach(function(propName) {
              //In the case it matches the current property being analysed
              if (prop.value.indexOf('var(' + propName + ')') !== -1) {
                clones[nodeName] = clones[nodeName] || node.clone();
              }
            });
          });
        }
      });

      //Process the clones
      Object.keys(clones).forEach(function(nodeName) {
        //Clone the current node and add the prefix
        const isRoot = nodeName === ':root';
        const processNode = isRoot ? node : clones[nodeName];
        if (!isRoot) {
          const prefix = opts.cssModules ? (':global(' + nodeName + ')') : nodeName;
          processNode.selector = processNode.selector.split(',').map(function(className) {
            return prefix + ' ' + className.trim()
          }).join(', ');
          root.insertAfter(node, clones[nodeName]);
        }

        //Replaces all the variables
        Object.keys(variables[nodeName]).forEach(function(variableName) {
          processNode.each(function(prop) {
            if (!prop.value || !prop.value.replaceAll) { return; }
            prop.value = prop.value.replaceAll('var(' + variableName + ')', variables[nodeName][variableName]);
          })
        });
      })
    });
  } // return
}) //module.exports;

//console.log(root.toString());  //eslint-disable-line no-console
