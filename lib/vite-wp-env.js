export default function viteWordPressEnv() {
    return {
        name: 'vite-plugin-wordpress-env-replace',
        enforce: 'pre',
        transform(code, id) {
            if (!/\.[jt]sx?$/.test(id)) return

            const reactImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]react['"]\s*;?/g

            return code.replace(reactImportRegex, (match, imports) => {
                const members = imports.split(',').map(s => s.trim())
                const validMembers = ['useRef', 'useEffect']
                const found = members.filter(m => validMembers.includes(m))
                if (found.length === 0) return match

                const destructure = `const { ${found.join(', ')} } = wp.element;`
                return destructure
            })
        }
    }
}
