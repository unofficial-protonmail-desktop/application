module.exports = {
  extends: [
    "stylelint-config-standard",
  ],


  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "extend",
        ],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: [
          "global",
        ]
      }
    ]
  }
};
