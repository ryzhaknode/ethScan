import {validateInput} from "./validateInput";


describe("validateInput", () => {

        test('validateInput returns true for valid phone number', () => {
            expect(validateInput('+380987778844')).toBe(true)
        });

        test('validateInput returns false for number with 11 numbers', () => {
            expect(validateInput('+38098777884')).toBe(false)
        });

        test('validateInput returns false for invalid phone number', () => {
            expect(validateInput('phoneNumberInText')).toBe(false);
        });

    }
)
