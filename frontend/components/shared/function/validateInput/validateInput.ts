export function validateInput(inputValue: string) {
    const phoneNumberRegex = /^((\+?3)?8)?0\d{9}$/;
    if (phoneNumberRegex.test(inputValue)) {
        return true;
    } else {
        return false;
    }
}