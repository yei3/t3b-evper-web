import printJS from "print-js";
import html2canvas from "html2canvas";

export default {
    methods: {
        $printHtml(el) {
            const element = document.getElementById(el);
            if (!element) {
                console.error(`Element "${el}" not found`);
                return;
            }

            html2canvas(element)
                .then((canvas) => {
                    printJS({
                        printable: canvas.toDataURL(),
                        type: "image",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
