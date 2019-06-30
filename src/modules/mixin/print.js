import html2canvas from "html2canvas";
import * as JSPdf from "jspdf";

export default {
    methods: {
        $printHtml(el) {
            const element = document.getElementById(el);
            if (!element) {
                console.error(`Element "${el}" not found`);
                return;
            }

            html2canvas(element, {
                useCORS: true,
                logging: false,
                ignoreElements: this.ignoreElements,
                onclone: this.onCloned,
                windowWidth: 1920,
                windowHeight: 1080,
            })
                .then((canvas) => {
                    const canvasWidth = canvas.width;
                    const canvasHeight = canvas.height;
                    const doc = new JSPdf({
                        unit: "px",
                        format: [canvasHeight, canvasWidth],
                    });
                    const width = doc.internal.pageSize.getWidth();
                    const height = doc.internal.pageSize.getHeight();
                    doc.addImage(canvas, "JPEG", 0, 0, width, height, "", "NONE");
                    doc.save("report.pdf");
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        $printEvaluation(
            el,
            { name = "_blank", replace = false, specs = ["fullscreen=yes", "titlebar=no", "scrollbars=yes"] } = {},
        ) {
            const element = document.getElementById(el);
            if (!element) {
                console.error(`Element "${el}" not found`);
                return;
            }

            const WinPrint = window.open("", name, !specs.length ? specs.join(",") : "", replace);

            let stylesHtml = "";
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
                // eslint-disable-line
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
        ignoreElements(element) {
            return (
                element.classList.contains("btn-blue") ||
                element.classList.contains("ant-layout-sider") ||
                element.classList.contains("custom-footer")
            );
        },
        onCloned(cloned) {
            /**
             ** Here is where the magic happens
             ** Here we modify the resulting HTML document styles from `html2canvas`
             ** https://github.com/niklasvh/html2canvas/issues/1661
             */
            const modified = cloned;
            if (modified.querySelector("#printEvaluation")) {
                modified.querySelector("#printEvaluation").style =
                    "font-family: 'Quicksand', sans-serif; font-variant: normal;";
            } else if (modified.querySelector("#printReport")) {
                modified.querySelector("#printReport").style =
                    "font-family: 'Quicksand', sans-serif; font-variant: normal;";
            }
            return modified;
        },
    },
};
