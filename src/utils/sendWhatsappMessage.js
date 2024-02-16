export function sendWhatsappMessage({phone, message}){
    window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodeURI(message)}&app_absent=0`)
}