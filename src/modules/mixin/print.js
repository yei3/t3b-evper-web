export default {
    methods: {
        $printHtml(el, {
            name = '_blank',
            specs = [
                'fullscreen=yes',
                'titlebar=yes',
                'scrollbars=yes',
            ],
            replace = false,
        } = {}) {
            const element = document.getElementById(el);
            if (!element) {
                console.error(`Element "${el}" not found`);
                return;
            }

            const WinPrint = window.open('', name, !specs.length ? specs.join(',') : '', replace);

            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) { // eslint-disable-line
                stylesHtml += node.outerHTML;
            }

            WinPrint.document.write(`
                <html>
                    <head>
                        <title>${document.title}</title>
                        ${stylesHtml}
                    </head>
                    <body>
                        ${element.innerHTML}
                    </body>
                </html>
            `);

            setTimeout(() => {
                WinPrint.document.close();
                WinPrint.focus();
                WinPrint.print();
                WinPrint.close();
            }, 1000);
        },
    },
};
