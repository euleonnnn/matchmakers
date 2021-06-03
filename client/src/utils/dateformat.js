export default function dateformat(date) {
    var str = new Intl.DateTimeFormat('en-GB',{ dateStyle: 'full', timeStyle: 'long' }).format(new Date(date));
    str = str.substring(0, str.length-5);
    return str;
}   