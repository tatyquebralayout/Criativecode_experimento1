module.exports = {
  multipass: true,
  js2svg: {
    indent: 0,
    pretty: false,
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: true,
          removeUselessDefs: true,
          removeEmptyAttrs: true,
          removeEmptyText: true,
          removeEmptyContainers: true,
          removeUnusedNS: true,
          removeDesc: true,
          mergePaths: true,
          convertPathData: {
            noSpaceAfterFlags: true,
            leadingZero: false,
            negativeExtraSpace: true,
            convertToQ: true,
            lineShorthands: true,
          },
          convertColors: {
            names2hex: true,
            rgb2hex: true,
            shorthex: true,
            shortname: true,
          },
          cleanupNumericValues: {
            floatPrecision: 1,
            leadingZero: false,
          },
          convertTransform: {
            shorthand: true,
            floatPrecision: 1,
          },
          collapseGroups: true,
          convertShapeToPath: true,
          minifyStyles: true,
          removeStyleElement: true,
        }
      }
    }
  ]
};
