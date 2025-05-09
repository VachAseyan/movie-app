import react from "@vitejs/plugin-react"
import * as path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  
  server: {
    open: true,
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"]
  }
})
