import js from "@eslint/js"
import vitestPlugin from "@vitest/eslint-plugin"
import prettierConfig from "eslint-config-prettier/flat"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import globals from "globals"

export default [
  {
    ignores: [
      "**/*.snap",
      "**/dist/",
      "**/.yalc/",
      "**/build/",
      "**/temp/",
      "**/.temp/",
      "**/.tmp/",
      "**/.yarn/",
      "**/coverage/",
    ],
  },
  js.configs.recommended,
  vitestPlugin.configs.recommended,
  reactPlugin.configs["recommended"],
  reactHooksPlugin.configs["recommended"],
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser
      },
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn"
    }
  },
  prettierConfig
]
