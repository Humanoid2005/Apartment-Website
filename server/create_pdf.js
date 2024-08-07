import PDFDocument from 'pdfkit';
import fs from 'fs';
import PDFWatermark from "pdf-watermark";

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return year + "/" + month + "/" + day;
}

function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
}

function generateHeader(doc) {
	doc.image("../client/public/images/web-logo-bg.png", 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('Sowgandhika Apartments', 110, 57)
		.fontSize(10)
		.text('164,Sheshadripuram,1st main road', 200, 57, { align: 'right' })//65
		.text('Bengaluru-560020 , Karnataka', 200, 72, { align: 'right' })//80
		.moveDown();
}

function generateFooter(doc) {
	doc.fontSize(
		10,
	).text(
		'Payment confirmed.Thank you for paying the bill.',
		50,
		780,
		{ align: 'center', width: 500 },
	);
}

function generateCustomerInformation(doc, receiptData) {

    doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Bill", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Bill Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(receiptData.bill_number, 150, customerInformationTop)
    .font("Helvetica")
    .text("Date of Payment:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Bill Type: ", 50, customerInformationTop + 30)
    .text(receiptData.type,150,customerInformationTop + 30)
    .text("Amount Paid:", 50, customerInformationTop + 45)
    .text(`INR ${receiptData.amount}`,150,customerInformationTop + 45)


    .text("Transaction ID:", 300, customerInformationTop)
    .font("Helvetica-Bold")
    .text(receiptData.transaction_id, 380, customerInformationTop)
    .font("Helvetica-Bold")
    .text(receiptData.name, 300, customerInformationTop+15)
    .font("Helvetica")
    .text("House Number: "+receiptData.house_number, 300, customerInformationTop + 30)
    .font("Helvetica")
    .text("Mobile Number: "+receiptData.mobile_number, 300, customerInformationTop + 45)
    .moveDown();

  generateHr(doc, 267);
}

const addWatermark = async (path)=> {
    await PDFWatermark({
        pdf_path: path,
        text: "Sowgandhika Apartments",
        textOption:{
            diagonally:true,
            opacity:0.1,
            size:50,
            align:"center"
        }
      });
}

const generateReceipt = (receiptData,path,cb) => {
	let doc = new PDFDocument({ margin: 50 });
    generateHeader(doc);
    generateCustomerInformation(doc, receiptData);
	generateFooter(doc);

	doc.end();
	doc.pipe(fs.createWriteStream(path).on("finish",cb));
}

export default generateReceipt;
