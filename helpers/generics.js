function base64Encode(str) {
    const buff = Buffer.from(str, 'utf-8');
    const base64 = buff.toString('base64');
    return base64;
}
function base64Decode(base64) {
    const buff = Buffer.from(base64, 'base64');
    const str = buff.toString('utf-8');
    return str;
}

module.exports = {base64Decode, base64Encode};