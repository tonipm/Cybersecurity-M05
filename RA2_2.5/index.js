import QRCode from "qrcode-svg";

/**
 * Generate a QR code with a specific content. The QR code is saved in a SVG file, for the best image quality.
 * @param {String} filename Name of the file with the QR code.
 * @param {String} content QR content.
 */
const generateQR = async (filename = "qr", content = " ") => {
    try {
        // QR code options.
        let qrcode = new QRCode({
            content,
            padding: 5,
            width: 256,
            height: 256,
            color: "#000",
            background: "#fff",
            ecl: "M" // error correction level
        });

        // Save file.
        qrcode.save(filename + ".svg", (err) => {
            if (err) throw err;
            console.log("QR Generated!");
        });
    } catch (err) {
        console.error("Error generating QR code", err)
    }
}

generateQR("qr", "https://toni-pm.herokuapp.com");