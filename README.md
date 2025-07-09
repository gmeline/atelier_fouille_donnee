# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

A rendre : 
- Dossier pour le 10 juillet (https://docs.google.com/document/d/1fXkXz8reKjFI1c4co8NKtq1il4uhj0E8UCoV7NL44GY/edit?usp=sharing)
- PowerPoint pour le 11 juillet (https://www.canva.com/design/DAGsqJXDxHY/h5stExTEo_DhFq11ZyMJoQ/edit?utm_content=DAGsqJXDxHY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

TRELLO :
https://trello.com/invite/b/686b72f619dd7fab2b3d60bd/ATTI1872ad35a659756ee5c2aac44746ebbb84680EE9/fouille-de-donneees

Diagramme de Gantt : 
https://lucid.app/lucidspark/0770d8f2-bdf9-40e2-9361-49f4e6b12056/edit?invitationId=inv_9ad517d6-33f9-4883-8e71-3f721dd1e777&page=uDe-dIt-NWfS#
