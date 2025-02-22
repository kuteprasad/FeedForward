// This file is used to configure Vite. Vite is a build tool that is used to build the client-side code. It is similar to Webpack, but it is faster and easier to configure. In this file, we are using the @vitejs/plugin-react plugin to enable React support in Vite. We are also using the @tailwindcss/vite plugin to enable Tailwind CSS support in Vite.
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
