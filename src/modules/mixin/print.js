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
                ignoreElements: (ignoredElement) => ignoredElement.classList.contains("btn-blue"),
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
                    doc.addImage(canvas, "JPEG", 0, 0, width, height);
                    doc.save("report.pdf");
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
