import {classNames} from "./classNames";

describe('classNames', () => {
    test('classNames with class and object of mods', () => {
        expect(classNames("class", {active: true})).toBe('class active')
    });

    test('classNames with class and object of mods with value null', () => {
        expect(classNames("class", {active: null})).toBe('class')
    })
    test('classNames with class and object of mods with value false', () => {
        expect(classNames("class", {active: false})).toBe('class')
    })

    test('classNames with class and object of mods and array', () => {
        expect(classNames("class", {active: true, disabled: false}, ['extra-class', 'another-class']))
            .toBe('class extra-class another-class active')
    })
})
