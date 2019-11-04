const { load } = require('../index')

const exampleJSON = {
  'element': 'package',
  'name': 'my-package',
  'description': 'a package',
  'dictionary': {
    '0': 'MyModule',
    '1': 'RGBColor',
    '2': 'Box_Yeah',
    '3': 'NestedModule',
    '4': 'width',
    '5': 'height',
    '6': 'color',
    '7': 'HexColor',
    '8': 'myFunc',
    '9': 'color1',
    '10': 'color2',
    '11': 'myBox',
    '12': 'fromColor1',
    '13': 'fromColor2',
    '14': 'firstBoxRGB',
    '15': 'sum'
  },
  'contents': [
    {
      'element': 'module',
      'name': '0',
      'description': 'my module description',
      'contents': [
        {
          'element': 'tuple',
          'name': '1',
          'description': 'an RGB color',
          'members': [
            'Integer',
            'Integer',
            'Integer'
          ]
        },
        {
          'element': 'struct',
          'name': '2',
          'description': 'an abstract box',
          'properties': [
            { 'type': 'Integer', 'name': '4' },
            { 'type': 'Integer', 'name': '5' },
            { 'type': '1', 'name': '6' }
          ]
        },
        {
          'element': 'module',
          'name': '3',
          'description': 'a module within a module',
          'contents': [
            {
              'element': 'tuple',
              'name': '7',
              'description': 'a hex color',
              'members': [
                'String',
                'String',
                'String',
                'String',
                'String',
                'String'
              ]
            },
            {
              'element': 'function',
              'returnType': '1',
              'name': '8',
              'description': 'a nonsensical funky func',
              'params': [
                { 'type': '1', 'name': '9' },
                { 'type': '1', 'name': '10' },
                { 'type': '2', 'name': '11' }
              ],
              'variables': [
                {
                  'type': 'Integer',
                  'name': '12',
                  'value': {
                    'operation': 'core.0',
                    'args': {
                      'source': { 'variable': '9' },
                      'location': 0
                    }
                  }
                },
                {
                  'type': 'Integer',
                  'name': '13',
                  'value': {
                    'operation': 'core.0',
                    'args': {
                      'source': { 'variable': '10' },
                      'location': 0
                    }
                  }
                },
                {
                  'type': 'Integer',
                  'name': '14',
                  'value': {
                    'operation': 'core.0',
                    'args': {
                      'source': {
                        'operation': 'core.1',
                        'args': {
                          'source': { 'variable': '11' },
                          'property': '6'
                        }
                      },
                      'location': 0
                    }
                  }
                },
                {
                  'type': 'Integer',
                  'name': '15',
                  'value': {
                    'operation': 'core.2',
                    'args': {
                      'a': { 'variable': '12' },
                      'b': {
                        'operation': 'core.2',
                        'args': {
                          'a': { 'variable': '13' },
                          'b': { 'variable': '14' }
                        }
                      }
                    }
                  }
                }
              ],
              'returnValue': { 'variable': '15' }
            }
          ]
        }
      ]
    }
  ]
}

console.log('valid?', load(JSON.stringify(exampleJSON)))
